
import { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { style } from '../components/styles/loginStyle';
import { router } from 'expo-router'
import Input from '@/components/input/Input';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(false);

    const register = () => {
        console.log('register');
        router.replace('../(private)');
    }

    useEffect(() => {
        const valid = username.length > 4 && password.length > 4;
        setIsValid(valid)
    }, [username, password])

    return (
        <View style={style.container}>
            <Text style={style.title}>Login</Text>
            <Input
                placeholder={"Usuário"}
                value={username}
                setValue={setUsername} 
            />
            <Input
                placeholder={"Senha"}
                value={password}
                setValue={setPassword} 
            /> 
            <TouchableOpacity 
                onPress={register} 
                disabled={!isValid} 
                style={style.button}
            >
              <Text style={style.buttonText}>Logar</Text>
            </TouchableOpacity>
        </View>
    );
}


