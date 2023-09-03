import React from 'react';
import { useTranslation } from 'react-i18next';
import RegisterForm from '../components/registerForm';

const Register = () => {
  const { t } = useTranslation('welcome');

  return (
    <>
      <h1 className="text-4xl text-center font-semibold text-grey-600 mt-20 mb-6">
        {t('welcome_breathing_ai')}
      </h1>
      <div className="text-base text-center text-grey-600 mb-6 mx-auto">
        {t('signup_to_start')}
      </div>
      <RegisterForm />
    </>
  );
};

export default Register;
