import React from 'react';
import './Options.css';

import { AppContextProvider } from '../../lib/context/App';
import { BreaksContextProvider } from '../../lib/context/Breaks';
import { AuthContextProvider } from '../../lib/context/Auth';
import { OptionsRouting } from './routing';
import { MemoryRouter } from 'react-router-dom';
import { UserContextProvider } from '../../lib/context/User';

const Options: React.FC = () => {
  return (
    <MemoryRouter>
      <AppContextProvider>
        <AuthContextProvider>
          <BreaksContextProvider>
            <UserContextProvider>
              <OptionsRouting />
            </UserContextProvider>
          </BreaksContextProvider>
        </AuthContextProvider>
      </AppContextProvider>
    </MemoryRouter>
  );
};

export default Options;
