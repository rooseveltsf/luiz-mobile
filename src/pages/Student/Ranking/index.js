import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import api from '../../../services/api';

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

const Ranking = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    api.get('score').then((response) => setScores(response.data));
  }, []);

  const refreshRanking = useCallback(() => {
    api.get('score').then((response) => setScores(response.data));
  }, []);

  return (
    <View style={styles.Container}>
      <View style={styles.Header}>
        <Text style={styles.TextHeader}>Ranking</Text>

        <TouchableOpacity onPress={refreshRanking}>
          <Icon name="refresh" color="#fff" size={30} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={scores}
        style={{
          padding: 20,
        }}
        keyExtractor={({ _id }) => _id}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 30 }}>
            <Text
              style={{ fontWeight: 'bold', color: 'rgba(255, 120, 0, .8)' }}
            >
              {item.score}
            </Text>{' '}
            - {item.name}
          </Text>
        )}
      />
    </View>
  );
};

export default Ranking;
