import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import List from "../components/List";
import Fire from "../Fire";
import { LayoutAnimation, RefreshControl } from "react-native";
export default class SearchScreen extends React.Component {
    state = {
      Result: ""

    }

    componentDidMount() {
      // Check if we are signed in...
      Fire.shared.getQuery();
      if (Fire.shared.uid) {
        // If we are, then we can get the first 5 posts
         this.search();
        //console.log(data);

      } else {
        // If we aren't then we should just start observing changes. This will be called when the user signs in
        this.props.navigation.navigate('Auth');
      }
    }
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

    search = async () => {
      // If we are currently getting posts, then bail out..
  
      // The data prop will be an array of posts, the cursor will be used for pagination.
      const query = await Fire.shared.getQuery();

      console.log('whgy'+query);
      for ( let i = 0; i<query.length ; i++){
        this.setState({
          name : query[i].user.deviceName,
          text : query[i].text
        });
      }

    };
    
    

    continue = () => {
      //Fire.shared.getMarker();
        this.props.navigation.navigate("SearchResult", { name: this.state.Result });
    };

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.logo}> Search </Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="..." 
            placeholderTextColor="#003f5c"
            onChangeText={Result =>{
                this.setState({ Result });
              }}
              value={this.state.Result}
            />
        
            
        </View>

              
        <TouchableOpacity style={styles.continue} onPress={this.continue}>
          
            <Ionicons name="md-arrow-round-forward" size={24} color="#FFF" />
        </TouchableOpacity>

  
        <Text>{this.state.name}</Text>
        

  
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
  },
  continue:{
      width: 70,
      height: 70,
      borderRadius: 70/2,
      backgroundColor: "#9075E3",
      alignItems: "center",
      justifyContent: "center"
  }
});