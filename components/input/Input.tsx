import { useEffect, useState } from "react";
import { TextInput, Text, View } from "react-native";
import { style } from './style';

interface InputProps {
    placeholder: string;
    value: string;
    setValue: (text: string) => void;
}

export default function Input({ placeholder, value, setValue }: InputProps) {
    const [isValid, setIsValid] = useState(false);
    useEffect(() => {
        const valid = value.length > 4;
        setIsValid(valid)
    })
    return (
        <View style={style.container}>
            <TextInput 
                placeholder={placeholder}
                value={value}
                onChangeText={setValue}
                style={style.input}
            />
            {
                !isValid && (
                    <Text style={style.errorMessage}>Campo inválido</Text>
                )
            }
        </View>
    );
}
