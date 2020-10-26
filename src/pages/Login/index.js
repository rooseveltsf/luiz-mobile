import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  Image,
} from 'react-native';

import { AuthContext } from '../../context/Auth';

import logoImage from '../../assets/images/logo.png';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6FCF97',
    paddingHorizontal: 20,
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
    marginBottom: 12,
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
  },
  ButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ButtonSignUp: {
    marginVertical: 14,
  },
  ButtonTextSignUp: {
    color: 'rgba(255, 120, 0, .8)',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

const Login = () => {
  const [isTeacher, setIsTeacher] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, errorBack } = useContext(AuthContext);

  const { navigate } = useNavigation();

  useEffect(() => {
    if (errorBack) {
      setLoading(false);
    }
  }, [errorBack]);

  const activeTeacher = useCallback(() => {
    setIsTeacher((old) => !old);
  }, []);

  const handleLogin = useCallback(async () => {
    setLoading(true);
    if (email === '' || password === '') {
      setLoading(false);
      return;
    }
    if (!email.includes('@')) {
      setLoading(false);
      return;
    }

    try {
      signIn(email, password, isTeacher);
    } catch (err) {
      setLoading(false);
    }
  }, [email, password, isTeacher]);

  return (
    <View style={styles.Container}>
      <View>
        <Image style={{ width: 230, height: 210 }} source={logoImage} />
      </View>

      <View style={styles.InputContainer}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.Input}
          autoCapitalize="none"
          keyboardType="email-address"
          autoCompleteType="email"
          autoCorrect={false}
          placeholder="E-mail"
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.Input}
          secureTextEntry
          placeholder="Senha"
        />
      </View>

      <View style={styles.IsTeacher}>
        <Text style={styles.TeacherText}>Você é Professor ?</Text>
        <Switch
          trackColor={{
            false: '#ddd',
            true: '#999',
          }}
          thumbColor={isTeacher ? 'rgba(255, 120, 0, .8)' : '#999'}
          value={isTeacher}
          onValueChange={activeTeacher}
        />
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.Button}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.ButtonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigate('CreateAccount')}
        style={styles.ButtonSignUp}
      >
        <Text style={styles.ButtonTextSignUp}>Criar nova conta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
