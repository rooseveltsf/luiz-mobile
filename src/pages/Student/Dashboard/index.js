import React, { useContext, useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import Item from '../../../components/Item';

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
});

const DashboardStudent = () => {
  const [questions, setQuestions] = useState([]);
  const { signOut, questionsList } = useContext(AuthContext);

  useEffect(() => {
    api.get('dashboard').then((response) => setQuestions(response.data));
  }, []);

  const filterQuestions = useCallback(
    (subject) => {
      api
        .get(`/dashboard/${subject}`)
        .then((response) => setQuestions(response.data));
    },
    [api]
  );

  return (
    <View style={styles.Container}>
      <View style={styles.Header}>
        <Text style={styles.TextHeader}>Tela inicial</Text>

        <TouchableOpacity onPress={signOut}>
          <Icon name="power" color="#fff" size={30} />
        </TouchableOpacity>
      </View>

      <View style={styles.FilterContainer}>
        <TouchableOpacity
          onPress={() => filterQuestions('português')}
          style={styles.ButtonFilter}
        >
          <Text style={styles.TextButtonFilter}>Português</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => filterQuestions('Matemática')}
          style={styles.ButtonFilter}
        >
          <Text style={styles.TextButtonFilter}>Matemática</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => filterQuestions('Programação')}
          style={styles.ButtonFilter}
        >
          <Text style={styles.TextButtonFilter}>Programação</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={{ paddingHorizontal: 20 }}
        data={questions}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <Item questions={questionsList} data={item} />
        )}
      />
    </View>
  );
};

export default DashboardStudent;
