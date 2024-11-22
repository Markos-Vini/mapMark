import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container: {
        width: '100%',
        maxWidth: 250
    },
    input: {
       borderWidth: 1,
       borderColor: '#ccc',
       marginTop: 10,
       width: '100%',
       borderRadius: 5,
       paddingTop: 5,
       paddingBottom: 5,
       paddingLeft: 8,
       paddingRight: 8,
    },
    errorMessage: {
        color: 'red',
        fontSize: 12,
    }
});