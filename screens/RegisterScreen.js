import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import HeaderButtons from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import firebase from "firebase";

export default class RegisterScreen extends React.Component {





  constructor(props) {
    super(props);
    this.state = {
      email:"",
      password:"",
      passwordConfirm: "",
    }
  }

  onRegister = () => {
    const { email,password} = this.state
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorCode)
      // ...
    });
    alert("Register Success")
  }
  onCreateAccountPress = () => {

  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Sign up</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="id..." 
            placeholderTextColor="#003f5c"
            value={this.state.email}
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            value={this.state.password}
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn}>
          <Text onPress={this.onRegister} style={styles.loginText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text onPress={this.onCreateAccountPress} style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.push("Login")}>
          <Text>Back</Text>
        </TouchableOpacity>

  
      </View>
    );
  }
}

//code





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#F5F5F5",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"#424242"
  },
  forgot:{
    color:"black",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});