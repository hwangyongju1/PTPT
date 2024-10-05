import React from 'react';
import styled from 'styled-components';
import googleSymbolImage from '../../assets/images/google-symbol.svg';

const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: #000000;
  padding: 10px 20px;
  border-radius: 12px;
  font-size: 16px;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  width: 215px;
  height: 44px;
`;

const Symbol = styled.img`
  width: ${(props) => props.$symbolSize || '24px'};
  height: ${(props) => props.$symbolSize || '24px'};
  margin-right: ${(props) => props.$symbolMargin || '8px'};
`;

const Label = styled.span`
  color: #000000;
  font-size: 16px;
`;

const GoogleButton = ({
  onClick,
  children,
  symbolSize,
  symbolMargin,
  ...styleProps
}) => {
  return (
    <ButtonContainer onClick={onClick} {...styleProps}>
      <Symbol
        src={googleSymbolImage}
        alt='Google Symbol'
        $symbolSize={symbolSize}
        $symbolMargin={symbolMargin}
      />
      <Label>{children}</Label>
    </ButtonContainer>
  );
};

export default GoogleButton;
