import React from 'react';
import SplitLayout from 'layouts/SplitLayout';
import StyledLink from 'components/StyledLink';


const Home = () => {

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
