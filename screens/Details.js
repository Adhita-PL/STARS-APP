import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { Card, Icon } from "react-native-elements";
import axios from "axios";

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      url: `http://1a26-136-185-62-91.ngrok.io/star?name=${this.props.navigation.getParam(
        "star_name"
      )}`
    };
  }

  componentDidMount() {
    this.getDetails();
  }
  getDetails = () => {
    const { url } = this.state;
    axios
      .get(url)
      .then(response => {
        return this.setState({
            details : response.data.data
        })
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };
  render() {
    const { details,} = this.state; 
      return (
        <View style={styles.container}>
          <Card>
            <Card.Title style = {styles.head}>{details.name}</Card.Title>
            <Card.Image source = {require('../assets/image/stars.jpg')}></Card.Image> 
            <View>
            <Text
                style={styles.cardItem}
              >{`Name of the star: ${details.name}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Distance: ${details.distance}`}</Text> 
              <Text
                style={styles.cardItem}
              >{`Gravity: ${details.gravity}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Planet Mass : ${details.planet_mass}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Planet Radius : ${details.planet_radius}`}</Text>
            </View>
            </Card>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardItem: {
    marginTop: 20,
  },
  head: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
