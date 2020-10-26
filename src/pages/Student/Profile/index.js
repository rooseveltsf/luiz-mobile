import React, { useContext, useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import api from '../../../services/api';
import { AuthContext } from '../../../context/Auth';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Header: {
    backgroundColor: '#6FCF97',
    height: 64,

    paddingHorizontal: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  TextHeader: {
    color: '#fff',
    fontSize: 24,
  },
  FilterContainer: {
    paddingHorizontal: 20,
    // backgroundColor: '#999',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  ButtonFilter: {
    backgroundColor: 'rgba(255, 120, 0, .8)',
    padding: 10,
    borderRadius: 10,
  },
  TextButtonFilter: {
    color: '#fff',
  },
  InfoContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  NameText: {
    fontSize: 25,
    color: 'rgba(255, 120, 0, .8)',
    fontWeight: 'bold',
  },
});

const Profile = () => {
  const [image, setImage] = useState(null);
  // const [dataImage, setDataImage] = useState(null);

  const { user, addAvatar } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Aviso',
            'Sorry, we need camera roll permissions to make this work!'
          );
        }
      }
    })();
  }, []);

  // const addAvatar = useCallback(
  //   async (name, type) => {

  //     const response = await api.put('add-avatar', data);

  //     setDataImage(response.data.avatar.url);
  //   },
  //   [image]
  // );

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);

      const filename = result.uri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      const data = new FormData();

      data.append('file', {
        name: filename,
        type,
        uri: result.uri,
      });

      addAvatar(data);
    }
  };

  return (
    <View>
      <View style={styles.Header}>
        <Text style={styles.TextHeader}>Perfil</Text>

        <TouchableOpacity>
          <Icon name="power" color="#fff" size={30} />
        </TouchableOpacity>
      </View>

      <View style={styles.InfoContainer}>
        <View
          style={{
            width: 160,
            height: 160,
          }}
        >
          {user.avatar ? (
            <TouchableOpacity onPress={pickImage}>
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 80,
                }}
                source={{ uri: user.avatar.url }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                height: '100%',
                width: '100%',
                justifyContent: 'center',
                backgroundColor: '#ddd',
                borderRadius: 80,
              }}
              onPress={pickImage}
            >
              <Icon name="camera" color="rgba(255, 120, 0, .8)" size={35} />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.NameText}>{user.name}</Text>
      </View>
    </View>
  );
};

export default Profile;
