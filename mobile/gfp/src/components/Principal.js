import { Text, View, Button, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Estilos, { corFundo } from '../styles/Estilos';
import React, { useState, useEffect } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Principal({ navigation }) {
    const [usuario, setUsuario] = useState();

    useEffect(() => {
        const buscarUsuarioLogado = async () => {
            const usuarioLogado = await AsyncStorage.getItem('UsuarioLogado');
            if (usuarioLogado) {
                setUsuario(JSON.parse(usuarioLogado));
            } else {
                navigation.navigate('Login');
            }
        }

        buscarUsuarioLogado();
    }, [])

    const botaoLogout = () => {
        AsyncStorage.removeItem('UsuarioLogado');
        navigation.navigate('Login')
    }

    return (
        <View> 
            <View style={{ flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}> 
            <View style={{display: 'flex', flexDirection: 'row'}}> 
                <Image source={require('../assets/user.png')} style={{ width: 100, height: 100 }} />
                <View> 
                    <Text style={{fontSize: 50, color: '#ac0003' }}> Principal </Text>
                    <Text style={{fontSize: 20, marginLeft: 10 }}> Olá, <Text style={{fontWeight: 'bold'}}>{usuario?.nome}</Text> </Text>
                </View>
                
                
            </View>
                <View style={{marginRight: 20}}> 
                <TouchableOpacity
                        style={{width: 55, height: 55, borderRadius: 12, backgroundColor: '#ac0003', color: '#fff', justifyContent: 'center', alignItems: 'center'}}
                        activeOpacity={0.8}
                        onPress={botaoLogout}
                    >
                        <MaterialIcons name="logout" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
    )
}