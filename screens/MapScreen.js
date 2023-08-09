import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useSelector} from 'react-redux';
import * as Location from 'expo-location';

export default function MapScreen() {
	const user = useSelector((state) => state.user.value);
	const [addedPlaces, setAddedPlaces] = useState([]);
	const [pos, setPos] = useState();
	const [isLoadingLocation, setIsLoadingLocation] = useState(true);
	const [isLocationReady, setIsLocationReady] = useState(false);
	const [errorMsg, setErrorMsg] = useState(null);
	
	
	useEffect(() => {
		(async () => {
			const {status} = await Location.requestForegroundPermissionsAsync();
			
			if (status === 'granted') {
				Location.watchPositionAsync({distanceInterval: 10}, (location) => {
					console.log(location);
					setPos(location);
					setIsLocationReady(true);
					setAddedPlaces(user.places);
				});
			}
			setIsLoadingLocation(false);
			
		})();
	}, [user.places]);
	
	if (isLoadingLocation) {
		return (
			<View style={styles.loadingContainer}>
				<Text>Chargement...</Text>
			</View>
		);
	}
	
	if (!pos) {
		return (
			<View style={styles.errorContainer}>
				<Text>{errorMsg || 'Location introuvable'}</Text>
			</View>
		);
	}
	
	const addedMarkers = addedPlaces.map((place, index) => (
		<Marker
			key={index}
			coordinate={{latitude: parseFloat(place.latitude), longitude: parseFloat(place.longitude)}}
			title={place.name}
			description={`LAT: ${place.latitude}, LON: ${place.longitude}`}
		/>
	));
	
	return (
		<View style={styles.container}>
			<MapView style={styles.map}
			         mapType={"hybrid"}
			         initialRegion={{
				         latitude: pos.coords.latitude,
				         longitude: pos.coords.longitude,
				         latitudeDelta: 0.0500,
				         longitudeDelta: 0.0300,
			         }}
			>
				{addedMarkers}
			</MapView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	map: {
		width: '100%',
		height: '100%',
	},
});
