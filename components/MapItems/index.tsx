import React from "react";
import { FlatList, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ItemList from "../ItemList";

// Define o tipo Localization
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

export default function MapItems({
    localizations,
    setLocalizations,
}: {
    localizations: Localization[];
    setLocalizations: (data: Localization[]) => void;
}) {
    if (!localizations || localizations.length === 0) {
        return <Text style={styles.noLocations}>Não há localizações salvas.</Text>;
    }

    const handleItemClick = (item: Localization) => {
        console.log("Marcador clicado:", item);
        // Ações ao clicar no item
    };

    const handleDelete = async (id: number) => {
        const updatedLocalizations = localizations.filter((item) => item.id !== id);
        await AsyncStorage.setItem("markers", JSON.stringify(updatedLocalizations));
        setLocalizations(updatedLocalizations);
    };

    return (
        <FlatList
            data={localizations}
            renderItem={({ item }) => (
                <ItemList
                    item={item}
                    handleItemClick={handleItemClick}
                    handleDelete={handleDelete}
                />
            )}
            keyExtractor={(item) => String(item.id)}
        />
    );
}

const styles = StyleSheet.create({
    noLocations: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
        color: "#555",
    },
});
