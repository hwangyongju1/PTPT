import React from 'react';
import styled from 'styled-components';
import { Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/InfoOutlined';

// 텍스트와 툴팁 제목을 인수로 받아서 스타일링하는 컴포넌트
const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  font-weight: bold;
  font-size: 17px;
`;

const CustomTooltip = ({ text, tooltipTitle }) => (
  <InfoWrapper>
    {text}
    <Tooltip title={tooltipTitle}>
      <InfoIcon
        sx={{
          fontSize: '18px', // 아이콘 크기
          color: '#838383', // 아이콘 색상
          marginLeft: '5px', // 텍스트와 아이콘 간격
        }}
      />
    </Tooltip>
  </InfoWrapper>
);

export default CustomTooltip;
