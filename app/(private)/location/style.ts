import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    locationMapView: {
        width: '100%',
        height: '100%',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    saveButton: {
        backgroundColor: '#085dcc',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 6,
        flex: 1,
        marginRight: 5,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#f44336',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 6,
        flex: 1,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    coordinatesContainer: {
        alignItems: 'flex-start',
        marginTop: 10,
        marginBottom: 10,
    },
    coordinatesText: {
        fontSize: 14,
        color: 'black',
        marginBottom: 5,
    },
    deleteButton: {
        backgroundColor: '#ff4d4d', // Cor vermelha para exclusão
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
});