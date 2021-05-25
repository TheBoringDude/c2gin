import React from 'react';

import ContainerWrapper from './container/wrapper';
import ContainerBody from './container/body';
import ContainerHeader from './container/header';

const Container = () => {
  return (
    <ContainerWrapper>
      <ContainerHeader />

      <ContainerBody />
    </ContainerWrapper>
  );
};

export default Container;
