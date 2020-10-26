import React, { useState, useCallback, useContext } from 'react';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';

import api from '../../../services/api';
import { AuthContext } from '../../../context/Auth';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    // backgroundColor: '#6FCF97',
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
  FormContainer: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 20,
    padding: 10,
    color: '#6FCF97',
    fontWeight: 'bold',
  },
  Input: {
    // borderWidth: 1,
    paddingLeft: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(196, 196, 196, .55)',
    height: 44,
  },
  TextArea: {
    // borderWidth: 1,
    paddingLeft: 20,
    paddingTop: 12,
    backgroundColor: 'rgba(196, 196, 196, .55)',
    borderRadius: 15,
  },
  ButtonPublication: {
    backgroundColor: 'rgba(255, 120, 0, .8)',
    height: 50,

    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginTop: 20,
  },
  TextButtonPublication: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

const CreateQuestion = () => {
  const [content, setContent] = useState('');
  const [response, setResponse] = useState('');
  const [alternative, setAlternative] = useState('');

  const [loading, setLoading] = useState(false);

  const { signOut } = useContext(AuthContext);

  const handleCreateQuestion = useCallback(async () => {
    if (content === '' || response === '' || alternative === '') {
      return;
    }
    setLoading(true);
    const data = {
      content,
      response,
      alternative,
    };

    try {
      await api.post('questions', data);

      setContent('');
      setResponse('');
      setAlternative('');
      setLoading(false);

      Alert.alert('Aviso', 'Pergunta criada com sucesso!');
    } catch (err) {
      Alert.alert('Aviso', err);
      setLoading(false);
    }
  }, [content, response, alternative]);

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.Header}>
        <Text style={styles.TextHeader}>Criar nova pergunta</Text>

        <TouchableOpacity onPress={signOut}>
          <Icon name="power" color="#fff" size={30} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingVertical: 15,
        }}
        style={styles.FormContainer}
      >
        <View>
          <Text style={styles.label}>Pergunta</Text>
          <TextInput
            value={content}
            onChangeText={setContent}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            style={styles.TextArea}
            placeholder="Digite sua pergunta"
          />
        </View>
        <View>
          <Text style={styles.label}>Resposta correta</Text>
          <TextInput
            value={response}
            onChangeText={setResponse}
            style={styles.Input}
            placeholder="Digite a resposta correta"
          />
        </View>
        <View>
          <Text style={styles.label}>Resposta errada</Text>
          <TextInput
            value={alternative}
            onChangeText={setAlternative}
            style={styles.Input}
            placeholder="Digite a resposta incorreta"
          />
        </View>

        <TouchableOpacity
          onPress={handleCreateQuestion}
          style={styles.ButtonPublication}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.TextButtonPublication}>Publicar pergunta</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateQuestion;
