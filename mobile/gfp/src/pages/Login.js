import {View, Text, Button, Image } from 'react-native';
import Estilos, { corPrincipal } from "../styles/Estilos";


export default function Login({navigation}) {
    return (
        <View style={Estilos.conteudo}> 
            <Image source={require('../assets/logo.png')} style={{ width: 200, height: 200, borderRadius: 20}}/>
            <Text style={Estilos.titulo}> Tela de Login </Text>
            <Text style={Estilos.estBotao} onPress={() => navigation.navigate("MenuDrawer")}> Entrada </Text>

        </View>
    )
}