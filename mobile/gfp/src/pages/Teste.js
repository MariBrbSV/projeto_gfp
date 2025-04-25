import React, {useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Button, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import * as Animar from 'react-native-animatable'
import { enderecoServidor } from '../utils'; // Importando o endereço do servidor


//Recebemos como props o navigation, para podermos navegar entre as telas
const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const botaoEntrar = async () => {
        
                navigation.navigate('MenuPrincipal')
       
    };
    
    return (
        <View style={styles.conteudoHeader}>
            <Animar.View animation='fadeInLeft' delay={500} style={styles.header} >
                <Image source={require('../../assets/icon.png')}
                        style={styles.logo}
                        resizeMode="contain" />
                <Text style={styles.headerText}>Bem-vindo(a) </Text>
            </Animar.View>
            <Animar.View animation={'fadeInUp'} style={styles.conteudoCorpo}>

                <Text style={styles.label}> Email:</Text>
                <TextInput 
                    placeholder="Digite um email..." 
                    style={styles.inputLogin} 
                    onChangeText={setEmail}
                    value={email}
                    />
                <Text style={styles.label}> Senha:</Text>
                <TextInput 
                    placeholder="Digite sua senha" 
                    style={styles.inputLogin} 
                    secureTextEntry={true} 
                    onChangeText={setSenha}
                    value={senha}
                    />
                <TouchableOpacity style={styles.botao}
                    onPress={botaoEntrar}>
                    <Text style={styles.textoBotao}> Acessar </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botao}
                    onPress={() => navigation.navigate('MenuTopTab')}>
                    <Text style={styles.textoBotao}> Top Tabs </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botao}
                    onPress={() => navigation.navigate('MenuBottomTab')}>
                    <Text style={styles.textoBotao}> Bottom Tabs </Text>
                </TouchableOpacity>
            </Animar.View>
        </View>
    )
}

export default Login


const corPrincipal = '#0055ff'
const corBranco = '#fff'


const styles = StyleSheet.create({
    conteudoHeader: {
        flex: 1,
        backgroundColor: corPrincipal
    },
    header: {
        flex: 1,
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
        flexDirection: 'row'
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: corBranco
    },
    conteudoCorpo: {
        flex: 2,
        backgroundColor: corBranco,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: '5%',
        paddingTop: '2%',
    },
    logo : {
        width: 30, 
        height: 30, 
        marginRight: 20
    },
    label: {
        fontSize: 20,
        marginTop: 28
    },
    inputLogin: {
        borderBottomWidth: 1,
        height: 40,
        fontSize: 16
    },
    botao: {
        backgroundColor: corPrincipal,
        borderRadius: 4,
        paddingVertical: 8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        borderColor: corBranco,
        borderWidth: 2
    },
    textoBotao: {
        fontSize: 18,
        color: corBranco,
        fontWeight: 'bold'
    },
})



// import {View, Text, Button} from 'react-native';

// //Recebemos como props o navigation para navegar entre as telas
// const Login = ({navigation}) => {
//     return (
//         <View style={{flex:1, backgroundColor:'#d5edb9', justifyContent:'center', alignItems:'center'}}>
//             <Button title="Entrar Drawer" onPress={() => navigation.navigate('MenuPrincipal')}/>
//             <Button title="Entrar Top Tab" onPress={() => navigation.navigate('MenuTopTab')}/>
//             <Button title="Entrar Bottom Tab" onPress={() => navigation.navigate('MenuBottomTab')}/>
//         </View>
//     )
// }

// export default Login;