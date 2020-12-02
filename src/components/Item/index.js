import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#6FCF97',
    height: 135,

    marginVertical: 10,
    borderRadius: 15,

    padding: 10,
  },
  Label: {
    color: 'rgba(255, 120, 0, .8)',
    fontSize: 24,
    fontWeight: 'bold',
  },
  LabelProf: {
    color: '#fff',
    fontSize: 18,
  },
  ButtonQuestion: {
    height: 44,
    backgroundColor: 'rgba(255, 120, 0, .8)',
    borderRadius: 10,

    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 12,
  },
  TextButtonQuestion: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

const Item = ({ data, questions }) => {
  const [isAnswered, setIsAnswered] = useState(false);
  const [mediaTeacher, setMediaTeacher] = useState(0);

  const { navigate } = useNavigation();

  useEffect(() => {
    const answered = questions.find((i) => i.id === data.id);
    setIsAnswered(!!answered);
  }, [questions]);

  useEffect(() => {
    api.get(`/rating/${data.teacher_id}`).then((response) => {
      if (!response.data.media) {
        setMediaTeacher(0);
      } else {
        setMediaTeacher(response.data.media);
      }
    });
  }, [data]);

  return (
    <View style={styles.Container}>
      <Text style={styles.Label}>Pergunta de {data.teacher.subject}</Text>

      <Text style={styles.LabelProf}>
        Professor: {data.teacher.name} / {mediaTeacher}
      </Text>

      <TouchableOpacity
        style={[
          styles.ButtonQuestion,
          { backgroundColor: isAnswered ? '#999' : 'rgba(255, 120, 0, .8)' },
        ]}
        disabled={isAnswered}
        onPress={() =>
          navigate('Question', {
            data,
          })
        }
      >
        <Text style={styles.TextButtonQuestion}>Responder Questão</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Item;
