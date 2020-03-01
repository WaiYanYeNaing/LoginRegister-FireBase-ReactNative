import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as firebase from "firebase";
import * as Expo from "expo";
import * as Facebook from "expo-facebook";
import { Container, Form, Item, Label, Input, Button } from "native-base";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBMlffvsWGmEJ5RD0IuifHD4tUs5GqpQ1k",
  authDomain: "fir-registerlogin-3d315.firebaseapp.com",
  databaseURL: "https://fir-registerlogin-3d315.firebaseio.com",
  projectId: "fir-registerlogin-3d315",
  storageBucket: "fir-registerlogin-3d315.appspot.com"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        console.log(user);
      }
    });
  }

  signUpUser = (email, password) => {
    try {
      if (this.state.password.length < 6) {
        alert("Please enter atleast 6 characters");
      } else {
        firebase.auth().createUserWithEmailAndPassword(email, password);
      }
    } catch (error) {
      console.log(error.toString());
    }
  };

  loginUser = (email, password) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => console.log(user));
    } catch (error) {
      console.log(error.toString());
    }
  };

  async loginWithFacebook() {
    Facebook.initializeAsync(
      "1541396369345021",
      "react-firebase-login-register"
    );
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      "1541396369345021",
      {
        permissions: ["public_profile"]
      }
    );
    if (type == "success") {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase
        .auth()
        .signInWithCredential(credential)
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={password => this.setState({ password })}
            />
          </Item>
          <Button
            style={{ marginTop: 40 }}
            full
            rounded
            success
            onPress={() =>
              this.loginUser(this.state.email, this.state.password)
            }
          >
            <Text style={{ color: "white" }}>Login</Text>
          </Button>
          <Button
            style={{ marginTop: 40 }}
            full
            rounded
            primary
            onPress={() =>
              this.signUpUser(this.state.email, this.state.password)
            }
          >
            <Text style={{ color: "white" }}>Sign Up</Text>
          </Button>
          <Button
            style={{ marginTop: 40 }}
            full
            rounded
            primary
            onPress={() => this.loginWithFacebook()}
          >
            <Text style={{ color: "white" }}>Login With Facebook</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: "#000"
  }
});
