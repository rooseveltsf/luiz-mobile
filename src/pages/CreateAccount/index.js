import React, { useState, useCallback, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/Auth';

import logoImage from '../../assets/images/logo.png';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#6FCF97',
  },
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  Title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  InputContainer: {
    alignSelf: 'stretch',
  },
  Input: {
    // borderWidth: 1,
    // borderColor: '#999',
    backgroundColor: 'rgba(196, 196, 196, .55)',
    borderRadius: 15,
    height: 44,
    paddingLeft: 20,
    marginVertical: 12,
  },
  IsTeacher: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginVertical: 15,
  },
  TeacherText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    marginRight: 8,
  },
  Button: {
    alignSelf: 'stretch',
    height: 50,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 120, 0, .8)',

    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  ButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const CreateAccount = () => {
  const [isTeacher, setIsTeacher] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subject, setSubject] = useState('');

  const { createAccount, errorBack } = useContext(AuthContext);

  const { goBack } = useNavigation();

  useEffect(() => {
    if (errorBack) {
      setLoading(false);
    }
  }, [errorBack]);

  const activeTeacher = useCallback(() => {
    setIsTeacher((old) => !old);
  }, []);

  const handleCreateAccount = useCallback(async () => {
    setLoading(true);
    if (name === '' || email === '' || password === '') {
      setLoading(false);
      return;
    }
    const data = {
      name,
      email,
      password,
    };

    if (isTeacher) {
      data.subject = subject;
    }

    createAccount(data, isTeacher);
    setLoading(false);
  }, [name, email, password, subject, isTeacher]);

  return (
    <View style={styles.Container}>
      <View style={styles.Header}>
        <TouchableOpacity onPress={goBack}>
          <Icon color="#fff" name="arrow-left" size={30} />
        </TouchableOpacity>
        <Image style={{ width: 130, height: 110 }} source={logoImage} />
      </View>

      <View style={styles.InputContainer}>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.Input}
          placeholder="Digite seu nome"
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.Input}
          placeholder="Digite seu email"
          autoCapitalize="none"
          keyboardType="email-address"
          autoCompleteType="email"
          autoCorrect={false}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.Input}
          placeholder="Digite sua senha"
          secureTextEntry
        />

        <View style={styles.IsTeacher}>
          <Text style={styles.TeacherText}>Você é professor?</Text>
          <Switch value={isTeacher} onValueChange={activeTeacher} />
        </View>
        <View style={{ borderWidth: 1, borderColor: '#fff', borderRadius: 15 }}>
          <Picker
            selectedValue={subject}
            onValueChange={(item) => setSubject(item)}
            enabled={isTeacher}
          >
            <Picker.Item label="Selecione uma materia" value={null} />
            <Picker.Item label="Matemática" value="matematica" />
            <Picker.Item label="Português" value="portugues" />
            <Picker.Item label="Programação" value="programacao" />
          </Picker>
        </View>

        <TouchableOpacity onPress={handleCreateAccount} style={styles.Button}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.ButtonText}>Criar conta</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateAccount;
