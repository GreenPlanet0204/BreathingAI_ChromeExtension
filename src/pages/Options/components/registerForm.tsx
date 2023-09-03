import services from '../../../lib/utils/services';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { AVAILABLE_OPTIONS_ROUTES } from '../routing/types';
import { FormikErrors, useFormik } from 'formik';
import { useAppContext } from '../../../lib/context/App';

const RegisterForm = () => {
  const { api } = services;
  const { t } = useTranslation('welcome');
  const {
    setRouterSettings,
    actions: appActions,
    state: appState,
  } = useAppContext();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | undefined>();
  interface FormValues {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }

  const { handleSubmit, handleChange, handleBlur, touched, values, errors } =
    useFormik({
      initialValues: {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
      },
      validate: (values) => {
        let errors: FormikErrors<FormValues> = {};

        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }

        if (!values.firstName) {
          errors.firstName = 'Required';
        }

        if (!values.lastName) {
          errors.lastName = 'Required';
        }
        if (!values.password) {
          errors.password = 'Required';
        } else if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/i.test(
            values.password
          )
        ) {
          errors.password =
            'Minimum eight characters, at least one letter and one number';
        }
        return errors;
      },
      onSubmit: async (values) => {
        try {
          await services.api.Security.register(values);
          setRouterSettings &&
            setRouterSettings((prevState) => ({
              ...prevState,
              currentOptionsTab: AVAILABLE_OPTIONS_ROUTES.LOGIN,
            }));
          navigate(AVAILABLE_OPTIONS_ROUTES.LOGIN);
        } catch (error) {
          setApiError('User already exists');
        }
      },
    });

  const handleThirdPartyLogin = async () => {
    chrome.windows.create({
      url: 'https://app.breathing.ai/oauth',
      type: 'popup',
      width: 400,
      height: 600,
    });
    appActions?.updateIsLoading(true);
    setRouterSettings &&
      setRouterSettings((prevState) => ({
        ...prevState,
        currentOptionsTab: AVAILABLE_OPTIONS_ROUTES.SPLASH,
      }));
  };

  return appState?.isLoading ? (
    <div
      className={'w-full h-[500px] flex justify-center align-middle py-[25%]'}
    >
      <div role="status">
        <svg
          aria-hidden="true"
          className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    <div className="max-w-lg mx-auto my-5 bg-white p-4 rounded-xl shadow shadow-slate-300">
      <div className="my-3">
        <button
          onClick={() => handleThirdPartyLogin()}
          className="w-full text-center py-2 my-2 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google Logo"
            width={30}
            height={30}
          />
          <span>Login with Google</span>
        </button>
      </div>

      {apiError && (
        <h4 className="text-red-700 text-center text-lg">{apiError}</h4>
      )}
      <form onSubmit={handleSubmit} className="my-5">
        <div className="flex flex-col space-y-3 w-[340px] mx-auto">
          <label htmlFor="email">
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full text-grey-600 font-medium text-base py-2 border border-grey-400 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder={t('email') || 'Email'}
            />
          </label>
          {errors.email && touched.email && errors.email}
          <label htmlFor="firstName">
            <input
              id="firstName"
              name="firstName"
              type="firstName"
              value={values.firstName}
              required
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full text-grey-600 font-medium text-base py-2 border border-grey-400 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder={t('first_name') || 'First Name'}
            />
          </label>
          {errors.firstName && touched.firstName && errors.firstName}
          <label htmlFor="lastName">
            <input
              id="lastName"
              name="lastName"
              type="lastName"
              value={values.lastName}
              required
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full text-grey-600 font-medium text-base py-2 border border-grey-400 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder={t('last_name') || 'Last Name'}
            />
          </label>
          {errors.lastName && touched.lastName && errors.lastName}
          <label htmlFor="password">
            <input
              id="password"
              name="password"
              type="password"
              required
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full text-grey-600 font-medium text-base py-2 border border-grey-400 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder={t('password') || 'Password'}
            />
          </label>
          {errors.password && touched.password && errors.password}

          {/* <div className="flex flex-row justify-between">
            <div>
              <a href="#" className="font-medium text-indigo-600">
                Forgot Password?
              </a>
            </div>
          </div> */}

          <button
            className="bg-pinky-400 text-grey-600 p-2 rounded-xl w-full font-bold text-xl mt-6 mb-10"
            type="submit"
          >
            {t('continue')}
          </button>
          <p className="text-center text-sm text-grey-600 font-medium">
            {t('already_have_an_account')}{' '}
            <Link
              to={AVAILABLE_OPTIONS_ROUTES.LOGIN}
              className="text-pinky-300 font-bold underline"
            >
              {t('login')}
            </Link>
          </p>
        </div>{' '}
      </form>
    </div>
  );
};

export default RegisterForm;
