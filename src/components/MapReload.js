import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import MapView, { Marker, Polyline } from 'react-native-maps';

// http://maps.googleapis.com/maps/api/directions/json?origin=-23.0247076,-43.4755497&destination=-22.981896,-43.488103

class GeolocationExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          },
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

  onRegionChange(region) {
    //   alert(region)
    // this.setState({ region });
  }

  decode(t,e) {
    for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})
  }

  render() {
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}

        { 1 == 1 ?
        <MapView
            style={styles.map}
            // initialRegion={{
            // latitude: this.state.latitude,
            // longitude: this.state.longitude,
            // latitudeDelta: 0.0922,
            // longitudeDelta: 0.0421,
            // }}
            region={this.state.region}
            //onRegionChange={this.onRegionChange}
        >

            <Marker
                coordinate={{latitude: this.state.region.latitude, longitude: this.state.region.longitude}}
                title={'title'}
                description={'description'}
                pinColor={'red'}
            />
            <Marker
                coordinate={{latitude: -23.010203, longitude: -43.442488}}
                title={'title'}
                description={'description'}
                pinColor={'red'}
            />

            <Polyline
                // coordinates={[
                //     // { latitude: this.state.region.latitude, longitude: this.state.region.longitude },
                //     // { latitude: -23.010203, longitude: -43.442488 },
                //     { latitude: -23.0310853, longitude: -43.4716144 },
                //     { latitude: -23.0250421, longitude: -43.4752879 },
                //     { latitude: -23.0251162, longitude: -43.4572519 },
                //     { latitude: -23.0310853, longitude: -43.4716144 },
                //     { latitude: -23.0170147, longitude: -43.4602027 },
                //     { latitude: -23.0251162, longitude: -43.4572519 },
                // ]}
                coordinates={this.decode("f_pkCvhjhGZM@H@T?pF_ABO}DG[Ka@gKjEgCdAk@PYBKASBMRCJ?D?Bg@VcAf@eDdBgIlEg@Jw@aFOUKOUMUCUFKLGLERANBLxA~I`@dCrCfQhBjLp@jElAvI~A`Kb@rDj@tE@ZGJGFSHUHO?k@Ge@EcDFcHJwW^gDJQBi@\\[V_ILoGLgGJ_W`@gOVeFJ}BLu@FiAPu@PiObEg@HgABW?q@Mw@W{MuG_@OWG}ImE{LaGy@o@cAeAaBaBiBeBPMbA{@l@m@RUGIKMIE_CbCw@v@i@\\m@Ls@FcAC}AMu@KeAUiBW_AF}@VWoBb@Y`@c@VSDMCM_A_BIGQ?k@`@OBKCyAgA")}
                strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                strokeColors={[
                    '#7F0000',
                    '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                    '#B24112',
                    '#E5845C',
                    '#238C23',
                    '#7F0000'
                ]}
                strokeWidth={6}
            />

            

        </MapView> 
        
        : <Text />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
});

export default GeolocationExample;