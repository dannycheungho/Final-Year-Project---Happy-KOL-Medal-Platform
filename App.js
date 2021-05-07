// Import React Navigation
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import tabBarIcon from './utils/tabBarIcon';
import { StackActions,NavigationActions } from 'react-navigation';
// Import the screens
import SearchScreen from './screens/SearchScreen'
import ChatScreen from './screens/ChatScreen'
import LoadingScreen from './screens/LoadingScreen'
import FeedScreen from './screens/FeedScreen';
import NewPostScreen from './screens/NewPostScreen';
import SelectPhotoScreen from './screens/SelectPhotoScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HeaderButtons from 'react-navigation-header-buttons';
import CItem from './components/Item';
import SearchResult from './screens/SearchResult'
import profile from './screens/Settings'
//database
import firebase from "firebase";

// Create our main tab navigator for moving between the Feed and Photo screens


const navigator = createBottomTabNavigator(
  {
    // The name `Feed` is used later for accessing screens
    Feed: {
      // Define the component we will use for the Feed screen.
      screen: FeedScreen,
      navigationOptions: {
        // Add a cool Material Icon for this screen
        tabBarIcon: tabBarIcon('home'),
      },
    },
    SearchScreen: {
      screen: SearchScreen,
      navigationOptions: {
        tabBarIcon: tabBarIcon('search'),
      },
    },
    Chat: {
      screen: ChatScreen,
      navigationOptions: {
        tabBarIcon: tabBarIcon('chat'),
      },
    },
    // All the same stuff but for the Photo screen
    Photo: {
      screen: SelectPhotoScreen,
      navigationOptions: {
        tabBarIcon: tabBarIcon('add-circle'),
      },
    },
    Setting: {
      screen: profile,
      navigationOptions: {
        tabBarIcon: tabBarIcon('book'),
      },
    },
  },
  {
    // We want to hide the labels and set a nice 2-tone tint system for our tabs
    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
    },
  },
);

// Create the navigator that pushes high-level screens like the `NewPost` screen.
const stackNavigator = createStackNavigator(
  {
    Main: {
      screen: navigator,
      // Set the title for our app when the tab bar screen is present
      navigationOptions: {
          title:"KOL",
          
            
            headerRight: (
              <HeaderButtons IconComponent={Ionicons} iconSize={23} color="black">
                <HeaderButtons.Item
                  title="Logout"
                  onPress={() => {
                      //logout
                      firebase.auth().signOut();
                  }}
                />
              </HeaderButtons>
            ),
        
      }

          
    },
    // This screen will not have a tab bar
    NewPost: NewPostScreen,
    SignUp: RegisterScreen,
    Login: LoginScreen,
    Feed: FeedScreen,
    SearchResult : SearchResult,
    Setting: profile
  },
  {
    cardStyle: { backgroundColor: 'white' },
  },
);

// Export it as the root component
//export default stackNavigator;
const AuthStack = createStackNavigator({
   Login: LoginScreen,
   SIGNUP: RegisterScreen,
   SearchScreen: SearchScreen,
   Chat : ChatScreen,
   SearchResult : SearchResult,
   Feed: FeedScreen
  });

export default createSwitchNavigator(
  {
    Feed: FeedScreen,
    LoadingScreen: LoadingScreen,
    App: stackNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'LoadingScreen'
  }
);
/*
photo, tag for searching, emoji, gif are must do function said from Jeff
other functions can be optional as no time left
*/