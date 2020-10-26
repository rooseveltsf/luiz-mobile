import React, { useEffect, useState, useCallback, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { AirbnbRating } from 'react-native-ratings';

import { useNavigation, useRoute } from '@react-navigation/native';

import shuffle from '../../../util/shuffleArray';
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
    marginLeft: 15,
  },
  ButtonRatings: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  TextButtonRatings: {
    color: '#fff',
    fontSize: 20,
  },
  QuestionContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-around',
    // backgroundColor: 'red',
  },
  TextQuestion: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#6FCF97',
  },
  ButtonContainer: {
    alignItems: 'center',
  },
  ButtonResponse: {
    height: 50,
    backgroundColor: 'rgba(255, 120, 0, .8)',
    alignSelf: 'stretch',

    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 15,
  },
  TextButtonResponse: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    marginTop: 20,
    backgroundColor: 'rgba(255, 120, 0, .8)',
    borderRadius: 20,
    paddingVertical: 10,
    elevation: 2,
    alignSelf: 'stretch',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

const Question = () => {
  const [data, setData] = useState({});
  const [question, setQuestion] = useState('');
  const [alternatives, setAlternatives] = useState([]);

  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState(3);

  const [loading, setLoading] = useState(false);

  const { goBack, navigate } = useNavigation();
  const { params } = useRoute();
  const { user, setQuestions } = useContext(AuthContext);

  useEffect(() => {
    if (params) {
      const { response, alternative } = params.data;

      setData(params.data);
      setQuestion(params.data.content);

      const arrayAlternatives = shuffle([response, alternative]);

      setAlternatives(arrayAlternatives);
    }
  }, [user]);

  const verifyResponse = useCallback(
    async (response) => {
      if (data.response === response) {
        await api.put(`/score/${user.score_id}`, {
          isAccerted: true,
        });
        Alert.alert('Parabéns', 'Muito bem, você acertou');
      } else {
        await api.put(`/score/${user.score_id}`, {
          isAccerted: false,
        });
        Alert.alert('Que pena', 'Você errou, não desista!');
      }
      setQuestions(data);
      navigate('StudentRoute');
    },
    [data, goBack]
  );

  const sendRating = useCallback(async () => {
    setLoading(true);
    await api.put(`/rating/${data.teacher.id}`, {
      nota: rating,
    });

    setLoading(false);
    setVisible(false);
  }, [data, rating]);

  return (
    <View style={styles.Container}>
      <View style={styles.Header}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={goBack}>
            <Icon name="arrow-left" color="#fff" size={30} />
          </TouchableOpacity>
          <Text style={styles.TextHeader}>Pergunta</Text>
        </View>

        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={styles.ButtonRatings}
        >
          <Text style={styles.TextButtonRatings}>Avaliar Prof</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.QuestionContainer}>
        <Text style={styles.TextQuestion}>{question}</Text>

        <View style={styles.ButtonContainer}>
          {alternatives.map((alternative) => (
            <TouchableOpacity
              onPress={() => verifyResponse(alternative)}
              key={alternative}
              style={styles.ButtonResponse}
            >
              <Text style={styles.TextButtonResponse}>{alternative}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Modal
        visible={visible}
        animationType="slide"
        transparent
        statusBarTranslucent
        onDismiss={() => setVisible(false)}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>Avalie o Professor</Text> */}
            <AirbnbRating
              count={5}
              reviews={['Muito ruim', 'Ruim', 'Ok', 'Boa', 'Muito boa']}
              defaultRating={3}
              onFinishRating={(value) => setRating(value)}
              size={20}
            />
            <TouchableOpacity onPress={sendRating} style={styles.openButton}>
              {loading ? (
                <ActivityIndicator color="#fff" size={20} />
              ) : (
                <Text style={styles.textStyle}>Enviar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Question;
