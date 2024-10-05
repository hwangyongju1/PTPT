import React from 'react';
import styled from 'styled-components';
import SoloOptionButton from '../molecules/SoloOptionButton';
import MultiOptionButton from '../molecules/MultiOptionButton';

const OptionContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: white;
`;

const PracticeOption = () => {
  return (
    <OptionContainer>
      <SoloOptionButton />
      <MultiOptionButton />
    </OptionContainer>
  );
};

export default PracticeOption;
