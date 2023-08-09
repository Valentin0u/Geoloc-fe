import {
	KeyboardAvoidingView,
	Text,
	StyleSheet,
	View,
	Image,
	TextInput,
	TouchableOpacity, Platform,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addNickname} from '../reducers/user';
import {useFonts, Pacifico_400Regular} from '@expo-google-fonts/pacifico';

export default function HomeScreen({navigation}) {
	const dispatch = useDispatch(); //dispatch est une fonction qui permet de déclencher une action
	const [nickname, setNickname] = useState(''); //nickname est une string qui contient le nickname
	
	let [fontsLoaded] = useFonts({
		//on charge la police d'écriture Pacifico
		Pacifico_400Regular,
	});
	if (!fontsLoaded) {
		return null;
	}
	
	const handleNickname = () => {
		//handleNickname est une fonction qui permet d'ajouter un nickname
		if (!nickname) {
			//si nickname est vide, on ne fait rien
			return;
		}
		
		dispatch(addNickname(nickname)); //on dispatch l'action addNickname avec le nouveau nickname
		navigation.navigate('TabNavigator'); //on navigue vers le TabNavigator
	};
	
	return (
		
		<KeyboardAvoidingView style={styles.container}
		                      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			
			<Image source={require('../assets/bg.png')} style={styles.image}/>
			<Text style={styles.title}>GéoLoc</Text>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder="Pseudo"
					placeholderTextColor='#888888FF'
					onChangeText={(value) => setNickname(value)}
					value={nickname}
				/>
				<TouchableOpacity
					style={styles.button}
					onPress={() => handleNickname()}>
					
					<Text style={styles.textButton}>Allez sur la carte</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		
		
	},
	image: {
		width: '100%',
		height: '100%',
	},
	title: {
		position: 'absolute',
		top: '15%',
		color: '#fff',
		fontSize: 60,
		fontWeight: 'bold',
		textShadowColor: '#027907',
		textShadowOffset: {
			width: 4,
			height: 3,
		},
		textShadowRadius: 10,
	},
	inputContainer: {
		position: 'absolute',
		backgroundColor: 'rgba(0,0,0,0.58)',
		width: '80%',
		top: '69%',
		padding: 20,
		borderRadius: 10,
		
	},
	input: {
		borderBottomWidth: 1,
		paddingBottom: 6,
		fontSize: 17,
		color: 'rgb(255,255,255)',
		textAlign: 'center',
		
	},
	button: {
		backgroundColor: '#027907',
		marginTop: 50,
	},
	textButton: {
		color: '#fff',
		textAlign: 'center',
		padding: 5,
		fontSize: 20,
		fontWeight: 'bold',
	}
});
