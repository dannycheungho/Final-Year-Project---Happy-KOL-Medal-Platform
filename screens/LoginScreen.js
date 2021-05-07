import React, { Component } from "react";
import { StyleSheet,  ActivityIndicator, ImageBackground,  Image, TextInput, TouchableOpacity,KeyboardAvoidingView,Keyboard } from 'react-native';
import { StackActions,NavigationActions } from 'react-navigation';
import { HeaderBackButton } from 'react-navigation';
import firebase from "firebase";
import Button from "../components/Button";
import Block from "../components/Block";
import Input from "../components/Input";
import Text from "../components/Text";
import { theme } from "../constants";



export default class LoginScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email:"",
        password:"",
        loading: false,
        errors: []
      }
    }

    handleLogin() {
      const { navigation } = this.props;
      const { email, password } = this.state;
      const errors = [];
      Keyboard.dismiss();
      this.setState({ loading: true });
   
      this.setState({ errors, loading: false });
  
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((returnedUser) => {
        
       })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        errors.push(errorCode);
        errors.push(errorMessage);
        alert("Please submit a correct id password");
      //  navigation.navigate("APP");
    });
      if (!errors.length) {
        this.props.navigation.navigate('App');   
      }
      //navigation.navigate("FeedScreen");
    }

  onLoginPress = () => {
   const { email,password} = this.state
   /*
   firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Please submit a correct id password");
        
    });
    this.props.navigation.navigate('App'); */
  }
  onCreateAccountPress = () => {
    const navigateAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "SIGNUP" })],
    });

    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);
  

    return (
     
      
      <KeyboardAvoidingView style={styles.login} behavior="padding">
                <Image
          resizeMode={'stretch'} // or cover
          style={{flex: 1}} // must be passed from the parent, the number may vary depending upon your screen size
          source={require("../assets/background/app.jpg")}
        ></Image>
        <Block padding={[0, theme.sizes.base * 2]}>

 

          <Text padding={[0, theme.sizes.base * 2]} h1 bold center>
            Happy KOL Platporm
          </Text>
          <Block middle>
            <Input
              label="Email"
              error={hasErrors("email")}
              style={[styles.input, hasErrors("email")]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              secure
              label="Password"
              error={hasErrors("password")}
              style={[styles.input, hasErrors("password")]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
            <Button gradient onPress={() => this.handleLogin()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Login
                </Text>
              )}
            </Button>

            <Button onPress={() => navigation.navigate("SIGNUP")}>
              <Text
                gray
                caption
                center
              >
                Register
              </Text>
            </Button>
          </Block>
        </Block>
        
      </KeyboardAvoidingView>
      
    );
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: "center"
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  }
});