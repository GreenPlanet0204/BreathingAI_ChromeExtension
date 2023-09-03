import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../../lib/context/Auth';
import { AVAILABLE_OPTIONS_ROUTES } from './types';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { authSettings } = useAuthContext();

  if (!authSettings?.authenticated) {
    return <Navigate to={AVAILABLE_OPTIONS_ROUTES.INTRO} replace />;
  }
  return children;
}
