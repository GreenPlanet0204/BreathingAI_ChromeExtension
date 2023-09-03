import React from 'react';
import { render } from 'react-dom';
import '../../lib/config/i18n';
import Options from './Options';
import '../../lib/config/globals.css'

render(
  <Options title={'Settings'} />,
  window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
