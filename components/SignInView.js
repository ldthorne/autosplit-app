import React, {
	Component,
} from 'react';

import {
	View,
	StyleSheet,
	Text,
	Image,
	TouchableHighlight,
	AppRegistry,
	ScrollView,
	DatePickerIOS,
	TextInput
} from 'react-native';

import MaterialButton from './MaterialButton.js';
import CreatePaymentView from './CreatePaymentView.js'
import HomeNavigation from './HomeNavigation.js';


export default class SignInView extends Component {
	signInUser() {
		this.props.firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
		.then((res) => {
			return this.props.firebase.database().ref(`users`).once('value')
	  })
	  .then(res => {
	  	const currentUserId = this.props.firebase.auth().currentUser.uid;
			const user = res.val()[currentUserId];
			if(user.hasOwnProperty('bankAccountToken')) {
				this.props.navigator.push({name: 'HomeNavigation', component: HomeNavigation});
			} else {
				console.log('not')
				this.props.navigator.push({name: 'CreatePaymentView', component: CreatePaymentView});
			}
		})
		.catch((err) => {
			console.error('ruh roh...', err);
		});
	}
	render() {
    return (
    	<ScrollView keyboardShouldPersistTaps={true} style={{flex: 1, backgroundColor: '#72d4f8', paddingTop: 60}} >
	        <BetterTextInput 
	        	ref='email'
	        	onSubmitEditing={ () => this.refs.password.focus() }
	        	onChangeText={(email) => this.setState({email})} 
	        	placeholder='Email' 
	        	keyboardType="email-address"
	        	autoCapitalize='none'
	        />
          <BetterTextInput
          	ref='password'
          	onChangeText={(password) => this.setState({password})}
          	placeholder='Password'
          	secureTextEntry={true}
          />
	        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 40}}>
	        	<MaterialButton width={150} height={50} buttonText="Sign In" onPressFn={this.signInUser.bind(this)} buttonFontSize={14}/>
	        </View>
      </ScrollView>
    );
  }
}

class BetterTextInput extends TextInput {
	render() {
		return(
			<TextInput 
				style={styles.input}
				placeholder={this.props.placeholder}
				placeholderTextColor='#608492'
				ref={this.props.ref}
				returnKeyType={this.props.returnKeyType || 'next'}
				onChangeText={this.props.onChangeText}
				autoCorrect={this.props.autocorrect || false}
				secureTextEntry={this.props.secureTextEntry || false}
				onSubmitEditing={this.props.onSubmitEditing}
				autoCapitalize={this.props.autoCapitalize || 'words'}
				keyboardType={this.props.keyboardType || 'default'}
			/>
		);
	}
}

const styles = {
	input: {
		backgroundColor: '#9FE2FC', 
		height: 40,
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
		paddingRight: 10,
		paddingLeft: 10
	}
};