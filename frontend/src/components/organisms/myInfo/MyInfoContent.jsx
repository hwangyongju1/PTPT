import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

const MyInfoContent = () => {
  return (
    <Content>
      <h1>통계</h1>
      <p>여기에 통계 정보를 표시합니다.</p>
    </Content>
  );
};

export default MyInfoContent;
