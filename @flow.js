// @flow
import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import firebase from "firebase";
import Fire from '../Fire';
import { Platform, KeyboardAvoidingView, SafeAreaView } from 'react-native';


export default class ChatScreen extends React.Component {
  state = {
    messages: [],
  };

  get user() {
    return {
      _id: Fire.shared.uid,
      name: this.props.navigation.state.params.name
    };
  }

  componentDidMount() {
    Fire.shared.get(message => 
        this.setState(previous => ({
            message: GiftedChat.append(previous.message,message)
        }))
  );
  }
  componentWillUnmount() {
    Fire.shared.off();
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={this.user}
      />
    );
  }

}


