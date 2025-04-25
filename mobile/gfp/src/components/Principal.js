import { Text } from 'react-native';
import { View } from 'react-native-web';
import Estilos, { corFundo } from '../styles/Estilos';

export default function Principal({ navigation }) {
    return (
        <View style={Estilos.conteudo}> 
            <Text style={{fontSize: 20 }}> Principal </Text>
        </View>
    )
}