import React from 'react';
import SplitLayout from 'layouts/SplitLayout';
import StyledLink from 'components/StyledLink';

function Home() {

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
