import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import OnboardingEN from '../../assets/locales/en/Onboarding.json';
import OnboardingES from '../../assets/locales/es/Onboarding.json';
import LoginEN from '../../assets/locales/en/Login.json';
import LoginES from '../../assets/locales/es/Login.json';
import SignupEN from '../../assets/locales/en/Signup.json';
import SignupES from '../../assets/locales/es/Signup.json';
import VerificationEN from '../../assets/locales/en/Verification.json';
import VerificationES from '../../assets/locales/es/Verification.json';
import BreaksLibraryEN from '../../assets/locales/en/BreaksLibrary.json';
import BreaksLibraryES from '../../assets/locales/es/BreaksLibrary.json';
import AccountEN from '../../assets/locales/en/Account.json';
import AccountES from '../../assets/locales/es/Account.json';
import AnalyticsEN from '../../assets/locales/en/Analytics.json';
import AnalyticsES from '../../assets/locales/es/Analytics.json';
import SoundsEN from '../../assets/locales/en/Sounds.json';
import SoundsES from '../../assets/locales/es/Sounds.json';
import ColorsEN from '../../assets/locales/en/Colors.json';
import ColorsES from '../../assets/locales/es/Colors.json';
import BreaksEN from '../../assets/locales/en/Breaks.json';
import BreaksES from '../../assets/locales/es/Breaks.json';
import DashboardMenuEN from '../../assets/locales/en/DashboardMenu.json';
import DashboardMenuES from '../../assets/locales/es/DashboardMenu.json';
import PauseEN from '../../assets/locales/en/Pause.json';
import PauseES from '../../assets/locales/es/Pause.json';
import DashboardAccountEN from '../../assets/locales/en/DashboardAccount.json';
import DashboardAccountES from '../../assets/locales/es/DashboardAccount.json';
import HelpEN from '../../assets/locales/en/Help.json';
import HelpES from '../../assets/locales/es/Help.json';
import ForgotPasswordEN from '../../assets/locales/en/ForgotPassword.json';
import ForgotPasswordES from '../../assets/locales/es/ForgotPassword.json';
import SplashEN from '../../assets/locales/en/Splash.json';
import SplashES from '../../assets/locales/es/Splash.json';
import WelcomeEN from '../../assets/locales/en/Welcome.json';
import WelcomeES from '../../assets/locales/es/Welcome.json';
import CommonEN from '../../assets/locales/en/Common.json';
import CommonES from '../../assets/locales/es/Common.json';
import TutorialPopupEN from '../../assets/locales/en/TutorialPopup.json';
import TutorialPopupES from '../../assets/locales/es/TutorialPopup.json';

// import NotificationES from '../../assets/locales/es/Notification.json';
const resources = {
  en: {
    onboarding: OnboardingEN,
    login: LoginEN,
    signup: SignupEN,
    verification: VerificationEN,
    breaksLibrary: BreaksLibraryEN,
    account: AccountEN,
    analytics: AnalyticsEN,
    sounds: SoundsEN,
    colors: ColorsEN,
    breaks: BreaksEN,
    pause: PauseEN,
    dashboardMenu: DashboardMenuEN,
    dashboardAccount: DashboardAccountEN,
    help: HelpEN,
    forgotPassword: ForgotPasswordEN,
    splash: SplashEN,
    welcome: WelcomeEN,
    common: CommonEN,
    tutorialPopup: TutorialPopupEN,
  },
  es: {
    onboarding: OnboardingES,
    login: LoginES,
    signup: SignupES,
    verification: VerificationES,
    breaksLibrary: BreaksLibraryES,
    account: AccountES,
    analytics: AnalyticsES,
    sounds: SoundsES,
    colors: ColorsES,
    breaks: BreaksES,
    pause: PauseES,
    dashboardMenu: DashboardMenuES,
    dashboardAccount: DashboardAccountES,
    help: HelpES,
    forgotPassword: ForgotPasswordES,
    welcome: WelcomeES,
    common: CommonES,
    splash: SplashES,
    tutorialPopup: TutorialPopupES,
  },
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    supportedLngs: ['en', 'es'],
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    ns: [
      'onboarding',
      'login',
      'signup',
      'verification',
      'breaksLibrary',
      'account',
      'analytics',
      'sounds',
      'colors',
      'breaks',
      'pause',
      'dashboardMenu',
      'dashboardAccount',
      'help',
      'welcome',
      'common',
      'notification',
      'tutorialPopup',
    ],
    resources,
  });

export default i18n;
