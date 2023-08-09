import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
	ScrollView, Platform, ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addPlace, removePlace} from '../reducers/user';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function PlacesScreen() {
	const dispatch = useDispatch(); //dispatch est une fonction qui permet de déclencher une action
	const user = useSelector((state) => state.user.value); //user est un objet qui contient nickname et places
	
	const [city, setCity] = useState(''); //city est une string qui contient le nom de la ville
	
	const handleSubmit = () => {
		//handleSubmit est une fonction qui permet d'ajouter une ville à la liste des villes
		if (!city) {
			//si city est vide, on ne fait rien
			return;
		}
		
		fetch(`https://api-adresse.data.gouv.fr/search/?q=${city}`) //on fait une requête à l'API adresse avec la ville en paramètre
			.then((res) => res.json()) //on récupère la réponse en JSON
			.then((data) => {
				//data est un objet qui contient les données de la ville
				const firstCity = data.features[0];
				
				const lat = firstCity.geometry.coordinates[1].toFixed(2);
				const lon = firstCity.geometry.coordinates[0].toFixed(2);
				const name = firstCity.properties.city;
				const newPlace = {name: name, latitude: lat, longitude: lon};
				
				dispatch(addPlace(newPlace)); //on dispatch l'action addPlace avec la nouvelle ville
				setCity(''); //on vide le champ de saisie
			});
	};
	
	const handleDelete = (value) => {
		//handleDelete est une fonction qui permet de supprimer une ville de la liste des villes
		dispatch(removePlace(value));
	};
	
	const places = user.places.map((data, i) => {
		//places est un tableau qui contient les villes de la liste
		return (
			<View style={styles.card} key={i}>
				<View>
					<Text style={styles.name}>{data.name}</Text>
					<Text>
						LAT : {data.latitude} LON : {data.longitude}
					</Text>
				</View>
				<FontAwesome
					name="trash-o"
					size={25}
					color="#027907"
					onPress={() => handleDelete(data.name)}
				/>
			</View>
		);
	});
	
	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground source={require('../assets/bg-places.png')}>
				<View style={styles.container2}>
					
					
					<Text style={styles.title}>Les lieux de {user.nickname}</Text>
					
					<View style={styles.inputContainer}>
						<TextInput
							placeholder="Nouvelle Ville"
							style={styles.input}
							onChangeText={(value) => setCity(value)}
							value={city}
						/>
						<TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
							<Text style={styles.textButton}>Add</Text>
						</TouchableOpacity>
					</View>
					
					<ScrollView contentContainerStyle={styles.scrollView}>
						{places}
					</ScrollView>
				</View>
			</ImageBackground>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	container2: {
		flex: 1,
		alignItems: 'center',
		marginTop: '8%',
	},
	title: {
		textAlign: 'center',
		fontSize: 30,
		fontFamily: 'Pacifico_400Regular',
		color: '#21bb00',
	},
	inputContainer: {
		width: '90%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#fff',
		padding: 20,
		marginTop: 20,
		borderRadius: 10,
	},
	input: {
		width: '65%',
		borderBottomColor: '#027907',
		borderBottomWidth: 1,
		fontSize: 18,
	},
	button: {
		alignItems: 'center',
		backgroundColor: '#027907',
		borderRadius: 10,
		paddingVertical: 6,
		paddingHorizontal: 10,
	},
	textButton: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 15,
	},
	card: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '80%',
		backgroundColor: 'rgba(255,255,255,0.80)',
		padding: 20,
		marginTop: 20,
		borderRadius: 10,
	},
	scrollView: {
		maxWidth: '100%',
		alignItems: 'center',
	},
	name: {
		fontSize: 18,
		fontWeight: '600',
	}
	
});
