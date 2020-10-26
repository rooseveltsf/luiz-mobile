import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import CreateAccount from '../pages/CreateAccount';

const Auth = createStackNavigator();

function AuthRoutes() {
  return (
    <Auth.Navigator headerMode="none">
      <Auth.Screen name="Login" component={Login} />
      <Auth.Screen name="CreateAccount" component={CreateAccount} />
    </Auth.Navigator>
  );
}

export default AuthRoutes;
