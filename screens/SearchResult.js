import firebase from "firebase";
import React, { Component } from "react";
import { LayoutAnimation, RefreshControl } from "react-native";
import { Image,StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import List from "../components/List";
import Fire from "../Fire";
import { Ionicons } from "@expo/vector-icons";

// Create our main tab navigator for moving between the Feed and Photo screens

const profileImageSize = 36;
const padding = 12;

// Set the default number of images to load for each pagination.
const PAGE_SIZE = 5;
console.disableYellowBox = true;



export default class SearchResult extends Component {
  state = {
    loading: false,
    posts: [],
    data: {},
    query: ''
    
  };


  componentDidMount() {
    // Check if we are signed in...
    if (Fire.shared.uid) {
      // If we are, then we can get the first 5 posts
      this.search();
    } else {
      // If we aren't then we should just start observing changes. This will be called when the user signs in
      this.props.navigation.navigate('Auth');
    }
  }

  // Append the item to our states `data` prop
  addPosts = posts => {
    this.setState(previousState => {
      let data = {
        ...previousState.data,
        ...posts
      };
      return {
        data,
        // Sort the data by timestamp
        posts: Object.values(data).sort((a, b) => a.timestamp < b.timestamp)
      };
    });
  };

  // Call our database and ask for a subset of the user posts
  search = async () => {
    // If we are currently getting posts, then bail out..
    const type = this.props.navigation.state.params.name;
    // The data prop will be an array of posts, the cursor will be used for pagination.
    const query = await Fire.shared.getQuery(type);

    console.log('whgy'+query);
    for ( let i = 0; i<query.length ; i++){
      this.setState({
        image : query[i].image,
        name : query[i].user.deviceName, 
        time : query[i].timestamp,
        text : query[i].text,
        height : query[i].imageHeight,
        width : query[i].imageWidth
      });
    }

  };

  // Because we want to get the most recent items, don't pass the cursor back.
  // This will make the data base pull the most recent items.


  // If we press the "Load More..." footer then get the next page of posts
 // onPressFooter = () => this.makeRemoteRequest();

  render() {
    const { text, name, imageWidth, imageHeight, uid, image, navigation } = this.props;
    

    // Reduce the name to something
    const imgW = imageWidth || this.state.width;
    const imgH = imageHeight || this.state.height;
    const aspect = imgW / imgH || 1;
    // Let's make everything purrty by calling this method which animates layout changes.
    LayoutAnimation.easeInEaseOut();
    return (
        <View>
          <Header image={{ uri: this.state.image}} name={this.state.name} />
          <Image
            resizeMode="contain"
            style={{
              backgroundColor: "#D8D8D8",
              width: "100%",
              aspectRatio: aspect
            }}
            source={{ uri: this.state.image }}
          />
          <Metadata name={this.state.name} description={this.state.text} />
        </View>
      );
    }
  }
  
  const Metadata = ({ name, description }) => (
    <View style={styles.padding}>
      <IconBar />
      <Text style={styles.text}>{name}</Text>
      <TouchableOpacity>
      <Text style={styles.subtitle}>{description}</Text>
          </TouchableOpacity>
      
    </View>
  );
  const Header = ({ name, image }) => (
    <View style={[styles.row, styles.padding]}>
      <View style={styles.row}>
        <Image style={styles.avatar} source={image} />
        <Text style={styles.text}>{name}</Text>
      </View>
      <Icon name="ios-more" />
    </View>
  );
  
const IconBar = () => (

  
    <View style={styles.row} >
      <View style={styles.row} >
      <TouchableOpacity >
        <Icon name="ios-heart-empty"  />
        </TouchableOpacity>
        <Icon name="ios-chatbubbles" />
        <Icon name="ios-send"/>
      </View>
      <Icon name="ios-bookmark" />
    </View>
  );
  const Icon = ({ name }) => (
    <Ionicons style={{ marginRight: 8 }} name={name} size={26} color="black" />
  );

  const styles = StyleSheet.create({
    text: { fontWeight: "600" },
    subtitle: {
      opacity: 0.8
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    padding: {
      padding
    },
    avatar: {
      aspectRatio: 1,
      backgroundColor: "#D8D8D8",
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: "#979797",
      borderRadius: profileImageSize / 2,
      width: profileImageSize,
      height: profileImageSize,
      resizeMode: "cover",
      marginRight: padding
    }
  });
  

