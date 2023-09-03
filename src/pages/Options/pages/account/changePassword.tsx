import { useFormik, FormikErrors } from 'formik';
import { useState } from 'react';
import { useAuthContext } from '../../../../lib/context/Auth';
import services from '../../../../lib/utils/services';

import React from 'react';

type FormValues = {
  oldPassword: string;
  newPassword: string;
};
const ChangePasswordModal: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const { api } = services;
  const [apiError, setApiError] = useState<string | undefined>();

  const { handleSubmit, handleChange, handleBlur, touched, values, errors } =
    useFormik({
      initialValues: {
        oldPassword: '',
        newPassword: '',
      },
      validate: (values) => {
        let errors: FormikErrors<FormValues> = {};

        if (!values.oldPassword) {
          errors.oldPassword = 'Required';
        }
        if (!values.newPassword) {
          errors.newPassword = 'Required';
        } else if (
          !/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(values.newPassword)
        ) {
          errors.newPassword =
            'Minimum eight characters, at least one letter and one number';
        }
        return errors;
      },
      onSubmit: async (values) => {
        try {
          await api.Security.changePassword({
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
          });
          onClose();
        } catch (error) {
          setApiError(`Password change failed`);
        }
      },
    });
  return (
    <div className="max-w-lg mx-auto my-5 bg-white p-4 rounded-xl shadow shadow-slate-300">
      <form onSubmit={handleSubmit} className="my-5">
        <div className="flex flex-col space-y-3">
          <label htmlFor="oldPassword">
            <p className="font-medium text-slate-700 pb-2">Old Password</p>
            <input
              id="oldPassword"
              name="oldPassword"
              type="password"
              required
              value={values.oldPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter old Password"
            />
          </label>
          {errors.oldPassword && touched.oldPassword && errors.oldPassword}
          <label htmlFor="newPassword">
            <p className="font-medium text-slate-700 pb-2">New Password</p>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.newPassword}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter your new password"
            />
          </label>
          {errors.newPassword && touched.newPassword && errors.newPassword}
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
            <span>Change Password</span>
          </button>
        </div>
      </form>
      <button
        className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
        onClick={() => onClose()}
      >
        Close
      </button>
    </div>
  );
};

export default ChangePasswordModal;
