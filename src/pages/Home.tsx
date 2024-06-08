import React from 'react';
import SplitLayout from 'layouts/split-layout/SplitLayout';
import StyledLink from 'components/link/StyledLink';

type Page = () => JSX.Element;

const Home: Page = () => {

  return (
    <SplitLayout>
      <StyledLink href="/tecaj">
        Tečajevi
      </StyledLink>
      <StyledLink href="povijest/USD">
        Povijest USD
      </StyledLink>
    </SplitLayout>
  );
}

export default Home;
