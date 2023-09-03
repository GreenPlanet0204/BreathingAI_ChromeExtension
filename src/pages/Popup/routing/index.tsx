import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout';

import Account from '../../../pages/Popup/pages/account';
import Breaks from '../../../pages/Popup/pages/breaks';
import Colors from '../../../pages/Popup/pages/colors/colors';
import Dashboard from '../../../pages/Popup/pages/dashboard';
import Sounds from '../../../pages/Popup/pages/sound';
import Splash from '../pages/splash';
import Welcome from '../pages/welcome';
import { RequireAuth } from './auth';
import { AVAILABLE_POPUP_ROUTES } from './types';

export const PopUpRouting = () => {
  return (
    <Layout>
      <Routes>
        <Route path={AVAILABLE_POPUP_ROUTES.LOADING} element={<></>} />
        <Route path={AVAILABLE_POPUP_ROUTES.SPLASH} element={<Splash />} />
        <Route
          path={AVAILABLE_POPUP_ROUTES.BREAKS}
          element={
            <RequireAuth>
              <Breaks />
            </RequireAuth>
          }
        />
        <Route
          path={AVAILABLE_POPUP_ROUTES.SOUNDS}
          element={
            <RequireAuth>
              <Sounds />
            </RequireAuth>
          }
        />
        <Route
          path={AVAILABLE_POPUP_ROUTES.COLORS}
          element={
            <RequireAuth>
              <Colors />
            </RequireAuth>
          }
        />
        <Route
          path={AVAILABLE_POPUP_ROUTES.ANALYTICS}
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path={AVAILABLE_POPUP_ROUTES.ACCOUNT}
          element={
            <RequireAuth>
              <Account />
            </RequireAuth>
          }
        />
        <Route
          path={AVAILABLE_POPUP_ROUTES.WELCOME}
          element={
            <RequireAuth>
              <Welcome />
            </RequireAuth>
          }
        />
      </Routes>
    </Layout>
  );
};
