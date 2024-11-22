import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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