import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import StudentRoute from './Student.routes';
import Question from '../pages/Student/Question';

const MainSudent = createStackNavigator();

function MainSudentRoutes() {
  return (
    <MainSudent.Navigator headerMode="none">
      <MainSudent.Screen name="StudentRoute" component={StudentRoute} />
      <MainSudent.Screen name="Question" component={Question} />
    </MainSudent.Navigator>
  );
}

export default MainSudentRoutes;
