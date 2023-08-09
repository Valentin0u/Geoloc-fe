import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import user from './reducers/user';

import MapScreen from './screens/MapScreen';
import PlacesScreen from './screens/PlacesScreen';
import HomeScreen from './screens/HomeScreen';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as PropTypes from "prop-types";

const store = configureStore({
	reducer: {user},
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LinearGradient(props) {
	return null;
}

LinearGradient.propTypes = {
	start: PropTypes.shape({x: PropTypes.number, y: PropTypes.number}),
	end: PropTypes.shape({x: PropTypes.number, y: PropTypes.number}),
	style: PropTypes.shape({
		borderTopRightRadius: PropTypes.number,
		height: PropTypes.number,
		borderTopLeftRadius: PropTypes.number
	}),
	colors: PropTypes.arrayOf(PropTypes.string)
};
const TabNavigator = () => {
	//Configuration du menu avec les icônes
	return (
		<Tab.Navigator
			screenOptions={({route}) => ({
				tabBarStyle: {
					height: 60,
					backgroundColor: '#000000',
					borderTopWidth: 1,
					borderTopColor: '#000000',
					
				},
				tabBarIcon: ({color, size}) => {
					let iconName = '';
					
					if (route.name === 'Map') {
						//Mise en place d'une icône selon le composant
						iconName = 'location-arrow';
					} else if (route.name === 'Mes lieux') {
						//Mise en place d'une icône selon le composant
						iconName = 'map-pin';
					}
					
					return <FontAwesome name={iconName} color={color} size={size}/>;
				},
				
				tabBarActiveTintColor: '#027907', //couleur si l'icône est active
				tabBarInactiveTintColor: '#335561', //couleur si l'icône est inactive
				headerShown: false,
			})}
		>
			<Tab.Screen name="Map" component={MapScreen}/>
			<Tab.Screen name="Mes lieux" component={PlacesScreen}/>
		</Tab.Navigator>
	);
};

export default function App() {
	//On return la navigation de l'app, avec une nested navigation (un mix entre stack nav et le tab nav)
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{headerShown: false}}>
					<Stack.Screen name="Home" component={HomeScreen}/>
					<Stack.Screen name="TabNavigator" component={TabNavigator}/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
