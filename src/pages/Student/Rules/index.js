import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

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
  RulesContainer: {
    padding: 20,
  },
  RulesText: {
    fontSize: 20,
    marginBottom: 20,
  },
});

const Rules = () => {
  return (
    <View>
      <View style={styles.Header}>
        <Text style={styles.TextHeader}>Lista de regras</Text>
      </View>

      <View style={styles.RulesContainer}>
        <Text style={styles.RulesText}>
          <Text style={{ fontWeight: 'bold' }}>1 -</Text> O aluno precisa
          responder pelo menos uma pergunta e acetar para participar do ranking
        </Text>

        <Text style={styles.RulesText}>
          <Text style={{ fontWeight: 'bold' }}>2 -</Text> O aluno pode avaliar o
          professor
        </Text>
      </View>
    </View>
  );
};

export default Rules;
