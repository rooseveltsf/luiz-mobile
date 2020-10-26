import { Alert } from 'react-native';
import React, { createContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

const AuthContext = createContext({
  user: null,
  isSigned: false,
  isTeacher: false,
  errorBack: false,
  questionsList: [],
  signIn: () => {},
  signOut: () => {},
  createAccount: () => {},
  addAvatar: () => {},
  setQuestions: () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSigned] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [loading, setLoading] = useState(false);

  const [questionsList, setQuestionsList] = useState([]);

  const [errorBack, setErrorBack] = useState(false);

  useEffect(() => {
    async function loadStorage() {
      const [isToken, isUser, answered] = await AsyncStorage.multiGet([
        '@token',
        '@user',
        '@AprenderBrincando:answered',
      ]);

      if (isToken[1] && isUser[1]) {
        api.defaults.headers.authorization = `Bearer ${isToken[1]}`;

        const userIs = JSON.parse(isUser[1]);

        setQuestionsList(JSON.parse(answered[1]));

        setIsTeacher(!!userIs.subject);

        setUser(JSON.parse(isUser[1]));
      }
    }

    loadStorage();
  }, [loading]);

  const signIn = useCallback(async (email, password, Teacher) => {
    setErrorBack(false);
    try {
      const END_POINT = Teacher ? 'teacher' : 'student';

      setIsTeacher(Teacher);

      const response = await api.post(`/session/${END_POINT}`, {
        email,
        password,
      });

      api.defaults.headers.authorization = `Bearer ${response.data.token}`;

      await AsyncStorage.multiSet([
        ['@token', response.data.token],
        ['@user', JSON.stringify(response.data.user)],
      ]);

      setUser(response.data.user);
    } catch (err) {
      Alert.alert('Aviso', err.error);
      setErrorBack(true);
    }
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@token', '@user']);

    setUser(null);
  }, []);

  const createAccount = useCallback(async (data, Teacher) => {
    setErrorBack(false);
    try {
      const END_POINT = Teacher ? 'teacher' : 'student';

      await api.post(`/register/${END_POINT}`, data);

      Alert.alert('Aviso', 'Usuário criado com sucesso!');
    } catch (err) {
      Alert.alert('Aviso', err.error);
      setErrorBack(true);
    }
  }, []);

  const addAvatar = useCallback(async (data) => {
    const response = await api.put('add-avatar', data);

    const { avatar } = response.data;

    setUser((oldData) => {
      return {
        ...oldData,
        avatar,
      };
    });

    await AsyncStorage.setItem('@user', user);
  }, []);

  async function setQuestions(data) {
    setLoading(true);
    const dataQuestion = questionsList;

    dataQuestion.push(data);

    setQuestionsList(dataQuestion);

    await AsyncStorage.setItem(
      '@AprenderBrincando:answered',
      JSON.stringify(dataQuestion)
    );
    setLoading(false);
  }
  // const setQuestions = useCallback(
  //   async (data) => {
  //     const dataQuestion = questionsList;

  //     dataQuestion.push(data);

  //     setQuestionsList(dataQuestion);

  //     await AsyncStorage.setItem(
  //       '@AprenderBrincando:answered',
  //       JSON.stringify(dataQuestion)
  //     );
  //   },
  //   [questionsList]
  // );

  return (
    <AuthContext.Provider
      value={{
        isSigned,
        user,
        isTeacher,
        signIn,
        errorBack,
        createAccount,
        signOut,
        addAvatar,
        setQuestions,
        questionsList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
