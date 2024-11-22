import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity } from "react-native";
import * as Location from 'expo-location';
import MapView, { MapPressEvent, Marker, LatLng } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { style } from './style';

export default function LocationScreen() {

    const [message, setMessage] = useState<String | null>(null);
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [markers, setMarkers] = useState<Array<{ coordinate: LatLng, title: string, description: string }>>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentMarker, setCurrentMarker] = useState<{ coordinate: LatLng, title: string, description: string } | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        (async () => {
            let locationPermission = await Location.requestForegroundPermissionsAsync();
            let { status } = locationPermission;
            if (status !== 'granted') {
                setMessage('A permissão foi negada!');
            } else {
                let location = await Location.getCurrentPositionAsync();
                setLocation(location);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const markersStorage = await AsyncStorage.getItem('markers');
            let markersList: Array<{ coordinate: LatLng, title: string, description: string }> = [];
            if (markersStorage) {
                markersList = JSON.parse(markersStorage);
                setMarkers(markersList);
            }
        })();
    }, []);

    const handleMapPress = async (mapPress: MapPressEvent) => {
        const { coordinate } = mapPress.nativeEvent;
        setCurrentMarker({ coordinate, title: '', description: '' });
        setTitle('');
        setDescription('');
        setModalVisible(true);
    };

    const handleSaveMarker = async () => {
        if (!title || !description || !currentMarker) {
            console.warn("Título, descrição ou marcador ausentes ao salvar.");
            return;
        }
    
        const isEditing = markers.some(
            (marker) =>
                marker.coordinate.latitude === currentMarker.coordinate.latitude &&
                marker.coordinate.longitude === currentMarker.coordinate.longitude
        );
    
        let updatedMarkers;
    
        if (isEditing) {
            // Atualiza o marcador existente
            updatedMarkers = markers.map((marker) =>
                marker.coordinate.latitude === currentMarker.coordinate.latitude &&
                marker.coordinate.longitude === currentMarker.coordinate.longitude
                    ? { ...marker, title, description } // Atualiza título e descrição
                    : marker
            );
        } else {
            // Adiciona um novo marcador
            const newMarker = {
                ...currentMarker,
                title,
                description,
            };
            updatedMarkers = [...markers, newMarker];
        }
    
        // Atualiza os marcadores no estado e no AsyncStorage
        await AsyncStorage.setItem("markers", JSON.stringify(updatedMarkers));
        setMarkers(updatedMarkers);
        setModalVisible(false);
    };
    
    
    

    const handleEditMarker = (markerIndex: number) => {
        const marker = markers[markerIndex];
        setCurrentMarker(marker);
        setTitle(marker.title);
        setDescription(marker.description);
        setModalVisible(true);
    };

    const handleDragEnd = (index: number, newCoordinate: LatLng) => {
        const updatedMarkers = [...markers];
        updatedMarkers[index].coordinate = newCoordinate; // Atualiza a coordenada do marcador
        setMarkers(updatedMarkers);
    
        // Atualiza o AsyncStorage com as novas coordenadas
        AsyncStorage.setItem('markers', JSON.stringify(updatedMarkers));
    };

    const handleDeleteMarker = async (markerIndex: number) => {
        const updatedMarkers = markers.filter((_, index) => index !== markerIndex);
        await AsyncStorage.setItem('markers', JSON.stringify(updatedMarkers));
        setMarkers(updatedMarkers);
    };

    return (
        <View>
            <Text>Marcadores: {markers.length}</Text>

            <MapView
                style={style.locationMapView}
                initialRegion={{
                    latitude: location?.coords.latitude ?? 0,
                    longitude: location?.coords.longitude ?? 0,
                    latitudeDelta: 0,
                    longitudeDelta: 0,
                }}
                zoomEnabled={true}
                scrollEnabled={true}
                showsUserLocation
                onPress={handleMapPress}
            >
                {markers.map((marker, index) =>
                    marker.coordinate && marker.coordinate.latitude && marker.coordinate.longitude ? (
                        <Marker
                            key={index}
                            coordinate={marker.coordinate}
                            title={marker.title}
                            description={marker.description}
                            draggable
                            onCalloutPress={() => handleEditMarker(index)}
                            onDragEnd={(e) => handleDragEnd(index, e.nativeEvent.coordinate)}
                        />
                    ) : null
                )}
            </MapView>


            {/* Modal for Adding/Editing Marker */}
            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={style.modalOverlay}>
                    <View style={style.modalContainer}>
                        <TextInput
                            placeholder="Título"
                            value={title}
                            onChangeText={setTitle}
                            style={style.input}
                        />
                        <TextInput
                            placeholder="Descrição"
                            value={description}
                            onChangeText={setDescription}
                            style={style.input}
                        />
                        {/* Exibe a latitude e longitude do marcador */}
                        {currentMarker && (
                            <View style={style.coordinatesContainer}>
                                <Text style={style.coordinatesText}>Latitude: {currentMarker.coordinate.latitude}</Text>
                                <Text style={style.coordinatesText}>Longitude: {currentMarker.coordinate.longitude}</Text>
                            </View>
                        )}
                        <View style={style.buttonContainer}>
                            <TouchableOpacity style={style.saveButton} onPress={handleSaveMarker}>
                                <Text style={style.buttonText}>Salvar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.cancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={style.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}


