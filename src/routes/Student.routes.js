import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import DashboardStudent from '../pages/Student/Dashboard';
import RankingStudent from '../pages/Student/Ranking';
import ProfileStudent from '../pages/Student/Profile';
import RulesStudent from '../pages/Student/Rules';

const Student = createBottomTabNavigator();

function StudentRoutes() {
  return (
    <Student.Navigator
      tabBarOptions={{
        inactiveTintColor: '#fff',
        activeTintColor: 'rgba(255, 120, 0, .8)',
        style: {
          backgroundColor: '#6FCF97',
        },
      }}
      headerMode="none"
    >
      <Student.Screen
        options={{
          tabBarLabel: 'Tela inicial',
          tabBarIcon: ({ size, color }) => (
            <Icon color={color} name="home" size={size} />
          ),
        }}
        name="DashboardStudent"
        component={DashboardStudent}
      />
      <Student.Screen
        options={{
          tabBarLabel: 'Ranking',
          tabBarIcon: ({ size, color }) => (
            <Icon color={color} name="podium-gold" size={size} />
          ),
        }}
        name="RankingStudent"
        component={RankingStudent}
      />

      <Student.Screen
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ size, color }) => (
            <Icon color={color} name="account" size={size} />
          ),
        }}
        name="ProfileStudent"
        component={ProfileStudent}
      />

      <Student.Screen
        options={{
          tabBarLabel: 'Regras',
          tabBarIcon: ({ size, color }) => (
            <Icon color={color} name="alert" size={size} />
          ),
        }}
        name="RulesStudent"
        component={RulesStudent}
      />
    </Student.Navigator>
  );
}

export default StudentRoutes;
