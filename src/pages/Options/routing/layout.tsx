import React, { useEffect } from 'react';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../assets/icons/logo/option_logo.svg';
import { useAppContext } from '../../../lib/context/App';
import { useAuthContext } from '../../../lib/context/Auth';
import Navigation from '../components/navigation';

const Layout: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { routerSettings } = useAppContext();
  const { authSettings } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (routerSettings) navigate(routerSettings?.currentOptionsTab);
  }, [routerSettings?.currentOptionsTab]);

  return (
    <>
      <div className="flex items-center px-10 h-20 bg-gradient-to-r from-tifany_blue-300 to-tifany_blue-200 fixed left-0 w-full">
        <img src={Logo} alt="logo" />
      </div>

      <div className="w-full min-w-fit min-h-fit flex pt-20">
        {authSettings?.authenticated && <Navigation />}
        <div className={`w-full min-h-fit ${authSettings?.authenticated ? 'ml-60' : ''}`}>{children}</div>
      </div>
    </>
  );
};

export default Layout;
