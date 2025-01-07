/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {Marker} from 'react-native-maps';

function App(): React.JSX.Element {
  const [location, setLocation] = useState(undefined);

  const getUsersCurrentLocation = () => {
    Geolocation.getCurrentPosition(position => {
      console.log(position);
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    });
  };
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('granted');
          getUsersCurrentLocation();
        } else {
          Alert.alert('Permission Denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  useEffect(() => {
    requestLocationPermission();
  });
  return (
    <View style={styles.mapContainer}>
      <MapView style={styles.map} region={location} showsUserLocation={true}>
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title={'My marker'}
          //description={marker.description}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
    width: 200,
  },
});

export default App;
