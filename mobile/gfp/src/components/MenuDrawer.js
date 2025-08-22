import { createDrawerNavigator } from "@react-navigation/drawer";
import Principal from './Principal'
import { corSecundaria, corTextos } from "../styles/Estilos";
import Contas from "../pages/Contas.js";
import Categorias from "../pages/Categorias.js";

const Drawer = createDrawerNavigator();

export default function MenuDrawer() {
    return (
        <Drawer.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: corSecundaria,
                elevation: 0,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20
            },
            headerTintColor: '#fff'
        }}
        >

            <Drawer.Screen name="Principal" component={Principal} />
            <Drawer.Screen name="Contas" component={Contas} />
            <Drawer.Screen name="Categorias" component={Categorias} />
        </Drawer.Navigator>
    )
}