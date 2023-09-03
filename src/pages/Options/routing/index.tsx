import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout';

import { RequireAuth } from './auth';
import { AVAILABLE_OPTIONS_ROUTES } from './types';
import Login from '../pages/login';
import Splash from '../pages/splash';
import Dashboard from '../pages/dashboard';
import Register from '../pages/register';
import Intro from '../pages/intro';
import Experience from '../pages/intro/experience';
import Account from '../pages/account';
import Help from '../pages/help';

export const OptionsRouting = () => {
  return (
    <Layout>
      <Routes>
        <Route path={AVAILABLE_OPTIONS_ROUTES.LOADING} element={<></>} />
        <Route path={AVAILABLE_OPTIONS_ROUTES.INTRO} element={<Intro />} />
        <Route
          path={AVAILABLE_OPTIONS_ROUTES.EXPERIENCE}
          element={<Experience />}
        />
        <Route path={AVAILABLE_OPTIONS_ROUTES.LOGIN} element={<Login />} />
        <Route
          path={AVAILABLE_OPTIONS_ROUTES.REGISTER}
          element={<Register />}
        />
        <Route path={AVAILABLE_OPTIONS_ROUTES.SPLASH} element={<Splash />} />

        <Route
          path={AVAILABLE_OPTIONS_ROUTES.DASHBOARD}
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path={AVAILABLE_OPTIONS_ROUTES.ACCOUNT}
          element={
            <RequireAuth>
              <Account />
            </RequireAuth>
          }
        />
        <Route
          path={AVAILABLE_OPTIONS_ROUTES.HELP}
          element={
            <RequireAuth>
              <Help />
            </RequireAuth>
          }
        />
      </Routes>
    </Layout>
  );
};
