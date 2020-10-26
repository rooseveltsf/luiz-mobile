import React, { useContext } from 'react';

import AuthRoutes from './routes/Auth.routes';

import MainStudent from './routes/MainStudent.routes';
import TeacherRoutes from './routes/Teacher.routes';

import { AuthContext } from './context/Auth';

function Routes() {
  const { isTeacher, user } = useContext(AuthContext);

  if (!user) {
    return <AuthRoutes />;
  }

  return !!user && isTeacher ? <TeacherRoutes /> : <MainStudent />;
}

export default Routes;
