import React from 'react';
import Title from './title';
import Setting from './setting';
import Contact from './contact';
import ShareSection from './share';
import Logout from './logout';

const Account = () => {
  return (
    <>
      <Title />
      <Setting />
      <Contact />
      <ShareSection />
      <Logout />
    </>
  );
};

export default Account;
