import services from '../../../lib/utils/services';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LOGIN_METHODS } from '../../../lib/api/security';
import { useAuthContext } from '../../../lib/context/Auth';
import { UserProfile } from '../../../lib/api/user/types';
import { AVAILABLE_OPTIONS_ROUTES } from '../routing/types';
import { useAppContext } from '../../../lib/context/App';
import { AVAILABLE_POPUP_ROUTES } from '../../Popup/routing/types';
import { FormikErrors, useFormik } from 'formik';

type FormValues = {
  email: string;
  password: string;
};
const LoginForm = () => {
  const { api } = services;

  const { actions, setAuthSettings } = useAuthContext();
  const {
    setRouterSettings,
    actions: appActions,
    state: appState,
  } = useAppContext();
  const [apiError, setApiError] = useState<string | undefined>();

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
  const setAuthenticated = (user: UserProfile) => {
    if (user && setAuthSettings && setRouterSettings) {
      actions?.updateUserAction(user);
      setAuthSettings((prevState) => ({
        ...prevState,
        authenticated: true,
        userId: user.id,
      }));
      setRouterSettings((prevState) => ({
        ...prevState,
        currentOptionsTab: AVAILABLE_OPTIONS_ROUTES.DASHBOARD,
        currentPopupTab: AVAILABLE_POPUP_ROUTES.BREAKS,
      }));
    }
  };
  const { handleSubmit, handleChange, handleBlur, touched, values, errors } =
    useFormik({
      initialValues: {
        email: '',
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
        if (!values.password) {
          errors.password = 'Required';
        }
        // else if (
        //   !/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(values.password)
        // ) {
        //   errors.password =
        //     'Minimum eight characters, at least one letter and one number';
        // }
        return errors;
      },
      onSubmit: async (values) => {
        try {
          await api.Security.login(values);
          const user = await api.User.getProfile();
          setAuthenticated(user);
        } catch (error) {
          setApiError(`${error}`);
        }
      },
    });
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
      <h1 className="text-2xl text-center font-medium">Login</h1>
      {apiError && (
        <h4 className="text-red-700 text-center text-lg">{apiError}</h4>
      )}
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
      <form onSubmit={handleSubmit} className="my-5">
        <div className="flex flex-col space-y-3">
          <label htmlFor="email">
            <p className="font-medium text-slate-700 pb-2">Email address</p>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter email address"
            />
          </label>
          {errors.email && touched.email && errors.email}
          <label htmlFor="password">
            <p className="font-medium text-slate-700 pb-2">Password</p>
            <input
              id="password"
              name="password"
              type="password"
              required
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter your password"
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
            type="submit"
            className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            <span>Login</span>
          </button>
          <p className="text-center">
            Not registered yet?{' '}
            <Link
              to={AVAILABLE_OPTIONS_ROUTES.REGISTER}
              className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
            >
              <span>Register now </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
