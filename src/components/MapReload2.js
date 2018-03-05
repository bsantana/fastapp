import React, { Component } from 'react';
import { View, Text, Button, CameraRoll, ScrollView, Image } from 'react-native';

import MapView from 'react-native-maps';
import CameraRollPicker from 'react-native-camera-roll-picker';

class GeolocationExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      photos: null,
      num: 0,
      selected: [],
      current: null
    };
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
          console.log('position =======')
          console.log(position)
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 1 },
    );

  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  _handleButtonPress = () => {
    CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos',
      })
      .then(r => {
          console.log('photos =====')
          console.log(r)
        this.setState({ photos: r.edges });
      })
      .catch((err) => {
         //Error Loading Images
      });
    };

    getSelectedImages(images, current) {
        var num = images.length;
    
        this.setState({
          num: num,
          selected: images,
          current: current.uri
        });
    
        console.log(current.uri);
        console.log(this.state.current);
        //console.log(this.state.selected[0].uri);
      }

    _goSave = () => {
        var form_data = new FormData();
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8000/api/services/');
        var t = '[1]'
        form_data.append('service', 39);
        //form_data.append('images', file)
        form_data.append('images', {type: 'image/jpeg', name: 'anything.jpg', uri: this.state.current})
        form_data.append('title', 'teste');
        form_data.append('content', 'teste');
        form_data.append('address', '[1]');
        form_data.append('price', '200.00');
        // form_data.append('address', 1);
        form_data.append('category', t);
        //form_data.append('lol', '{type: "teste", scale: '+file+'}')
        //console.log('====')
        //console.log(input.files)
        //console.log(form_data.get('lol'))
        //xhr.send(form_data);


        fetch('http://192.168.0.56:8000/api/services/', { // Your POST endpoint
            method: 'POST',
            headers: {
            // "Accept": "application/json",
            // "Content-Type": "application/json",
            // 'Accept': 'application/json',
            // 'Content-Type': 'multipart/form-data',
            "Authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImJydW5vX3NoZW5uQGhvdG1haWwuY29tIiwiZXhwIjoxNTIwODA4ODkzLCJlbWFpbCI6ImJydW5vX3NoZW5uQGhvdG1haWwuY29tIn0.IrbLsrBmKJM78iI1PSvSl4jx-JMEyVFIyhZml-3v31Y"
            },
            body: form_data
            //body: JSON.stringify({'service': 39, 'image': 'content://media/external/images/media/142'})
        })
        .then(
            response => response.json() // if the response is a JSON object
        )
        .then(
            success => {
            console.log(success)
            console.log('foi')
            } // Handle the success response object
        )
        .catch(
            error => {
                console.log('entrou no error')
                console.log(error)} // Handle the error response object
        )
    }
    

  render() {
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        <Button title="Load Images" onPress={this._goSave} />
        <CameraRollPicker
          scrollRenderAheadDistance={500}
          initialListSize={1}
          pageSize={3}
          removeClippedSubviews={false}
          groupTypes='SavedPhotos'
          batchSize={5}
          maximum={3}
          selected={this.state.selected}
          assetType='All'
          imagesPerRow={3}
          imageMargin={5}
          callback={this.getSelectedImages.bind(this)} />
        {/* <ScrollView>
       {this.state.photos && this.state.photos.map((p, i) => {
       return (
         <Image
           key={i}
           style={{
             width: 300,
             height: 100,
           }}
           source={{ uri: p.node.image.uri }}
         />
       );
     })}
     </ScrollView> */}
      </View>
    );
  }
}

export default GeolocationExample;