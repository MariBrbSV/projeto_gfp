import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import * as Animar from 'react-native-animatable';
import { enderecoServidor } from '../utils';
import { LinearGradient } from 'expo-linear-gradient';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function botaoEntrar() {
        try {
            if (email === '' || senha === '') {
                throw new Error('Preencha todos os campos');
            }
            const resposta = await fetch(`${enderecoServidor}/usuarios/login`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ email, senha }),
            });
            if (resposta.ok) {
                const dados = await resposta.json();
                AsyncStorage.setItem('UsuarioLogado', JSON.stringify(dados));
                navigation.navigate('MenuDrawer');
            } else {
                throw new Error('Login ou senha incorretos ❌');
            }
        } catch (error) {
            alert(error.message);
        }
    }

    return ( 
         <View style={styles.container} >

            <LinearGradient 
            colors={['#060073', '#0560F2']}
            style={styles.gradientBackground}
            > 

            <View> 
                <Image source={require('../assets/logo.png')} style={styles.logo}
                                        resizeMode="contain"/>
            </View>
            <Animar.View animation="fadeInUp" style={styles.formContainer}>
                <Text style={styles.title}> Seja Bem Vindo(a)! </Text>
                <View style={styles.inputAndIcon}> 
                <Fontisto name="email" size={24} color="black" />
                <TextInput
                    placeholder="Digite seu e-mail"
                    style={styles.input}
                    placeholderTextColor="#aaa"
                    onChangeText={setEmail}
                    value={email}
                />
                </View>
                <View style={styles.inputAndIcon}> 
                <AntDesign name="unlock" size={24} color="black" />
                <TextInput
                    placeholder="Digite sua senha"
                    style={styles.input}
                    placeholderTextColor="#aaa"
                    onChangeText={setSenha}
                    value={senha}
                />
                </View>
                <TouchableOpacity style={styles.button} onPress={botaoEntrar}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.secondaryButton]}
                    onPress={() => navigation.navigate('Cadastro')}
                >
                    <Text style={[styles.buttonText, styles.secondaryButtonText]}>Cadastro</Text>
                </TouchableOpacity>
            </Animar.View>
            </LinearGradient>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
        paddingHorizontal: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#344b9b',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputAndIcon: {
        borderWidth: 1,
        borderColor: '#344b9b',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        height: 50,
        marginBottom: 15,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#344b9b',
        marginLeft: 10,
    },
    button: {
        backgroundColor: '#344b9b',
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    secondaryButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#344b9b',
    },
    secondaryButtonText: {
        color: '#344b9b',
    },
    logo: {
        width: 300,
        height: 300,
    },
});