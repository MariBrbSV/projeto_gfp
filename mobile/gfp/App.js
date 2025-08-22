import Login from '../gfp/src/pages/Login.js'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MenuDrawer from "./src/components/MenuDrawer.js"
import CadContas from '../gfp/src/pages/CadContas.js';
import Categorias from './src/pages/Categorias.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer> 
        <Stack.Navigator> 
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          <Stack.Screen name='MenuDrawer' component={MenuDrawer} options={{headerShown: false}} />
          <Stack.Screen name='Categorias' component={Categorias} options={{headerShown: false}} />
          <Stack.Screen name="CadContas" component={CadContas} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}