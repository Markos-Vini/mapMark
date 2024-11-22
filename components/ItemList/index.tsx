import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

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

interface ItemListProps {
    item: Localization;
    handleItemClick: (item: Localization) => void;
    handleDelete: (id: number) => void;
}

export default function ItemList({ item, handleItemClick, handleDelete }: ItemListProps) {
    return (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => handleItemClick(item)} style={styles.infoContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.coordinates}>
                    Latitude: {item.coordinate.latitude.toFixed(6)}
                </Text>
                <Text style={styles.coordinates}>
                    Longitude: {item.coordinate.longitude.toFixed(6)}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                <MaterialIcons name="delete" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "#f9f9f9",
        marginBottom: 8,
    },
    infoContainer: {
        flex: 1,
        marginRight: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: "#555",
        marginBottom: 8,
    },
    coordinates: {
        fontSize: 12,
        color: "#777",
    },
    deleteButton: {
        backgroundColor: "#ff4d4d",
        borderRadius: 8,
        padding: 8,
    },
});
