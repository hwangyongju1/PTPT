import React from 'react';
import styled from 'styled-components';
import kakaoSymbolImage from '../../assets/images/kakao-symbol.svg';

const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.bgColor || '#FEE500'};
  color: ${(props) => props.color || '#000000'};
  padding: ${(props) => props.padding || '10px 20px'};
  border-radius: ${(props) => props.borderRadius || '12px'};
  font-size: ${(props) => props.fontSize || '16px'};
  border: none;
  cursor: pointer;
`;

const Symbol = styled.img`
  width: ${(props) => props.$symbolSize || '24px'};
  height: ${(props) => props.$symbolSize || '24px'};
  margin-right: ${(props) => props.$symbolMargin || '8px'};
`;

const Label = styled.span`
  color: ${(props) => props.labelColor || '#000000'};
  opacity: ${(props) => props.labelOpacity || '0.85'};
  font-size: ${(props) => props.fontSize || '16px'};
`;

const KakaoButton = ({
  onClick,
  children,
  symbolSize,
  symbolMargin,
  ...styleProps
}) => {
  return (
    <ButtonContainer onClick={onClick} {...styleProps}>
      <Symbol
        src={kakaoSymbolImage}
        alt='Kakao Symbol'
        $symbolSize={symbolSize}
        $symbolMargin={symbolMargin}
      />
      <Label>{children}</Label>
    </ButtonContainer>
  );
};

export default KakaoButton;
