import { createDrawerNavigator } from "@react-navigation/drawer";
import Principal from './Principal'

const Drawer = createDrawerNavigator();

export default function ManuDrawer() {
    return (
        <Drawer.Navigator> 
            <Drawer.Screen name="Principal" component={Principal} />
        </Drawer.Navigator>
    )
}