import { Text, View, Button, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Estilos, { corFundo } from '../styles/Estilos';
import React, { useState, useEffect } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

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

    const botaoContas = () => {
        navigation.navigate('Contas')
    }

    const botaoCategorias = () => {
        navigation.navigate('Categorias')
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

            <View style={{alignItems: 'center', flexDirection: 'row', gap: 5, justifyContent: 'center'}}> 

            {/* Contas */}
            <View style={{alignItems: 'center', marginTop: 20, fontFamily: 'Arial', gap: 5}}> 
               
                    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.44)', width: 100, height: 80, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}> 
                    <TouchableOpacity onPress={botaoContas} style={{color: 'white'}}> 
                        <FontAwesome5 name="money-check-alt" size={24} color="white" /> 
                        Contas 
                    </TouchableOpacity>
                     </View>
            </View>

            {/* Categorias */}
            <View style={{alignItems: 'center', marginTop: 20, fontFamily: 'Arial', gap: 5}}> 
               
                    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.44)', width: 100, height: 80, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}> 
                    <TouchableOpacity onPress={botaoCategorias} style={{color: 'white'}}> 
                        <MaterialIcons name="category" size={24} color="white" />
                        Categorias
                    </TouchableOpacity>
                     </View>
            </View>

            </View>
        </View>
    )
}