import React from 'react';
import '../../lib/config/i18n';
import './Popup.css';
import { AppContextProvider } from '../../lib/context/App';
import { BreaksContextProvider } from '../../lib/context/Breaks';
import { AuthContextProvider } from '../../lib/context/Auth';
import { PopUpRouting } from './routing';
import { MemoryRouter } from 'react-router-dom';
import { ColorsContextProvider } from '../../lib/context/Colors';
import { SoundsContextProvider } from '../../lib/context/Sounds';
import { AnalyticsContextProvider } from '../../lib/context/Analytics';
import { UserContextProvider } from '../../lib/context/User';

const Popup: React.FC = () => {
  return (
    <MemoryRouter>
      <AppContextProvider>
        <AuthContextProvider>
          <UserContextProvider>
            <BreaksContextProvider>
              <ColorsContextProvider>
                <SoundsContextProvider>
                  <AnalyticsContextProvider>
                    <PopUpRouting />
                  </AnalyticsContextProvider>
                </SoundsContextProvider>
              </ColorsContextProvider>
            </BreaksContextProvider>
          </UserContextProvider>
        </AuthContextProvider>
      </AppContextProvider>
    </MemoryRouter>
  );
};

export default Popup;
