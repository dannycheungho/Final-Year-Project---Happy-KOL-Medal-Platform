import uuid from 'uuid';

import getUserInfo from './utils/getUserInfo';
import shrinkImageAsync from './utils/shrinkImageAsync';
import uploadPhoto from './utils/uploadPhoto';

const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

const collectionName = 'snack-SJucFknGX';

class Fire {
  constructor() {
    firebase.initializeApp({
      apiKey: "AIzaSyDgeiLZdaovMsIEBat_Rn9QbV5BpFMnS7Y",
      authDomain: "social-app-e4338.firebaseapp.com",
      databaseURL: "https://social-app-e4338.firebaseio.com",
      projectId: "social-app-e4338",
      storageBucket: "social-app-e4338.appspot.com",
      messagingSenderId: "40297969416",
      appId: "1:40297969416:web:49234abcf7bb5f82755ebd",
    });
    // Some nonsense...
    firebase.firestore().settings({ timestampsInSnapshots: true });
    
    // Listen for auth
    firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        this.props.navigation.navigate('Auth');
      }
    });
  }

  onCreateAccountPress = () => {
    this.props.navigation.push("Login")
  }

  //start chat
  get ref() {
    return firebase.database().ref('messages');
  }

  info = () => {
    const userdata = {};
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        console.log(user.email);
        userdata.push(user.email)
      }
    });
    return userdata.email;
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));


  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  append = message => this.ref.push(message);

  // close the connection to the Backend
  off() {
    this.ref.off();
  }





  //end chat

  // Download Data
  getPaged = async ({ size, start }) => {
    let ref = this.collection.orderBy('timestamp', 'desc').limit(size);
    try {
      if (start) {
        ref = ref.startAfter(start);
      }

      const querySnapshot = await ref.get();
      const data = [];
      querySnapshot.forEach(function(doc) {
        if (doc.exists) {
          const post = doc.data() || {};

          // Reduce the name
          const user = post.user || {};

          const name = user.deviceName;
          const reduced = {
            key: doc.id,
            name: (name || 'Secret Duck').trim(),
            ...post,
          };
          data.push(reduced);
        }
      });

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      return { data, cursor: lastVisible };
    } catch ({ message }) {
      alert(message);
    }
  };

  // Upload Data
  uploadPhotoAsync = async uri => {
    const path = `${collectionName}/${this.uid}/${uuid.v4()}.jpg`;
    return uploadPhoto(uri, path);
  };

  post = async ({ text, image: localUri }) => {
    try {
      const { uri: reducedImage, width, height } = await shrinkImageAsync(
        localUri,
      );

      const remoteUri = await this.uploadPhotoAsync(reducedImage);
      this.collection.add({
        text,
        uid: this.uid,
        timestamp: this.timestamp,
        imageWidth: width,
        imageHeight: height,
        image: remoteUri,
        user: getUserInfo(),
        tag: 'photo'                //tag()
      });
    } catch ({ message }) {
      alert(message);
    }
  };

  // Helpers
  get collection() {
    return firebase.firestore().collection(collectionName);
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  get Umail() {
    return (firebase.auth().currentUser || {}).email;
  }
  get timestamp() {
    return Date.now();
  }

//

async getQuery(type) {
  
  const snapshot = await firebase.firestore().collection('snack-SJucFknGX').where('tag', '==',type).get()
  const snapshot2 = await firebase.firestore().collection('snack-SJucFknGX').where('text', '==',type).get()
  


  if ( snapshot.docs.map(doc => doc.data()).length > 0 ){
    console.log(snapshot.docs.map(doc => doc.data()).length > 0);
    return snapshot.docs.map(doc => doc.data());
  }
  else if ( snapshot2.docs.map(doc => doc.data()).length > 0 ){
    return snapshot2.docs.map(doc => doc.data());
  }
  else{
    console.log(snapshot2.docs.map(doc => doc.data()).length > 0);
    console.log(snapshot.docs.map(doc => doc.data()).length > 0);
  }
}


}

Fire.shared = new Fire();
export default Fire;
