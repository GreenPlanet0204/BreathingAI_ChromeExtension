import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../../../lib/context/Auth';

const Splash: React.FC = () => {
  const { t } = useTranslation('splash');
  const { authSettings, setAuthSettings } = useAuthContext();
  // Check if extension is pinned

  useEffect(() => {
    async function checkIsPinned() {
      let userSettings = await chrome.action.getUserSettings();
      if (userSettings.isOnToolbar === true) {
        if (setAuthSettings) {
          setAuthSettings((prevState) => ({
            ...prevState,
            introComplete: true,
          }));
        }
      }
    }
    checkIsPinned();
  }, [authSettings]);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: '100px',
          width: '258px',
          height: '140px',
          background: '#ffffff',
          zIndex: 10010,
          borderRadius: '0px 0px 10px 10px',
          filter: 'drop-shadow(10px 10px 20px rgba(0, 0, 0, 0.2))',
        }}
      >
        <p
          style={{
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '150%',
            color: '#AE4BB1',
            padding: '68px 22px 22px 22px',
            margin: 0,
            verticalAlign: 'middle',
            position: 'relative',
          }}
        >
          <img
            src={'/src/assets/images/onboarding/arrow.svg'}
            alt="arrow"
            style={{
              position: 'absolute',
              top: '10px',
              right: '20px',
              width: '18px',
              height: 'auto',
            }}
          />
          <img
            src={'/src/assets/images/onboarding/ion_extension-puzzle.svg'}
            alt=""
            style={{
              verticalAlign: 'middle',
              marginRight: '10px',
              width: '24px',
              height: 'auto',
            }}
          />
          {t('welcome.pin')}
        </p>
      </div>
      <div
        style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          width: '100%',
          height: '100%',
          background: '#ffffff',
          zIndex: 10000,
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '218px',
            height: '218px',
            margin: '0 auto',
            marginTop: '185px',
          }}
        >
          <img
            src={'/src/assets/images/onboarding/Mask group.png'}
            alt=""
            style={{
              position: 'absolute',
              top: '-105%',
              left: '75%',
              width: '460px',
              height: 'auto',
            }}
          />
          <img
            src={'/src/assets/images/onboarding/Breaks.svg'}
            alt=""
            style={{
              width: '218px',
              height: 'auto',
            }}
          />
        </div>
        <p
          style={{
            fontWeight: 600,
            fontSize: '40px',
            lineHeight: '50px',
            color: '#092447',
            margin: '0 auto',
            textAlign: 'center',
            maxWidth: '780px',
            width: '100%',
            marginTop: '28px',
          }}
        >
          {t('welcome.getStarted')}
        </p>
      </div>
    </>
  );
};

export default Splash;
