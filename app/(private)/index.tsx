import { useFocusEffect } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapItems from '@/components/MapItems';

// Define o tipo Localization para tipagem consistente
interface Localization {
    id: number;
    name?: string;
    coordinate: {
        latitude: number;
        longitude: number;
    };
    description: string;
    title: string;
}

export default function Home() {
    const screenWidth = Dimensions.get('window').width;
    const [isPressed, setIsPressed] = useState(false);

    // Define o estado localizations com o tipo correto
    const [localizations, setLocalizations] = useState<Localization[]>([]);

    // Função para carregar os marcadores do AsyncStorage
    const loadLocalizations = async () => {
        try {
            const storedLocalizations = await AsyncStorage.getItem('markers');
            if (storedLocalizations) {
                const parsedLocalizations: Localization[] = JSON.parse(storedLocalizations);

                // Validações nos marcadores carregados
                const validLocalizations = parsedLocalizations.filter((item) => {
                    const isValid = item && item.coordinate && item.title && item.description;
                    if (!isValid) console.warn('Marcador inválido encontrado:', item);
                    return isValid;
                });
                setLocalizations(validLocalizations);
            } else {
                setLocalizations([]);
            }
        } catch (error) {
            console.error('Erro ao carregar os marcadores:', error);
            setLocalizations([]);
        }
    };

    // Recarrega os marcadores toda vez que a tela é focada
    useFocusEffect(
        React.useCallback(() => {
            loadLocalizations();
        }, [])
    );

    // Carrega os marcadores na montagem do componente
    useEffect(() => {
        loadLocalizations();
    }, []);

    return (
        <View style={styles.container}>

            <Appbar.Header style={styles.appBar}>
                <Appbar.Content title="Home" titleStyle={styles.appBarTitle} />
                <Appbar.Action
                    icon="logout"
                    color="#fff"
                    onPress={() => router.push('/login')}
                />
            </Appbar.Header>


            {/* Conteúdo principal */}
            <View style={styles.content}>
                <MapItems
                    localizations={localizations}
                    setLocalizations={setLocalizations} // Passa a função de atualização para o MapItems
                />
                {/* Botão flutuante */}
                <Pressable
                    onPress={() => router.push('/(private)/location/location')}
                    onPressIn={() => setIsPressed(true)}
                    onPressOut={() => setIsPressed(false)}
                    style={[styles.floatingButton, isPressed && styles.floatingButtonPressed]}
                >
                    <Text style={styles.buttonText}>+</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    appBar: {
        backgroundColor: '#085dcc',
    },
    appBarTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: '#085dcc',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
    },
    floatingButtonPressed: {
        transform: [{ scale: 1.05 }],
        shadowOpacity: 0.5,
        elevation: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
});
