import React from 'react';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CreateQuestion from '../pages/Teacher/CreateQuestion';

const Teacher = createBottomTabNavigator();

function TeacherRoutes() {
  return (
    <Teacher.Navigator
      tabBarOptions={{
        inactiveTintColor: '#fff',
        activeTintColor: 'rgba(255, 120, 0, .8)',
        style: {
          backgroundColor: '#6FCF97',
        },
      }}
    >
      <Teacher.Screen
        name="CreateQuestion"
        options={{
          tabBarLabel: 'Criar nova pergunta',
          tabBarIcon: ({ size, color }) => (
            <Icon color={color} name="frequently-asked-questions" size={size} />
          ),
        }}
        component={CreateQuestion}
      />
    </Teacher.Navigator>
  );
}

export default TeacherRoutes;
