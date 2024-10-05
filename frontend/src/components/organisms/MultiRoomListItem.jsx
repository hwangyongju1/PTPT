import React from 'react';
import styled from 'styled-components';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { useState, useEffect } from 'react';

// 스타일 정의
export const Card = styled.div`
  position: relative;
  width: calc(
    33.333% - 20px
  ); // 카드가 3개씩 배치되도록 설정, 각 카드 간에 20px 간격 유지
  max-width: 300px; // 최대 너비 설정
  min-width: 250px; // 최소 너비 설정
  height: 240px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 10px; // 각 카드 간에 10px 간격 유지
`;

export const CardImage = styled.div`
  position: relative;
  height: 45%;
  background-color: #f0f0f0;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`}; // 배경 이미지 설정
  background-size: cover; // 이미지 크기 조정
  background-position: center; // 이미지 위치 조정
`;

export const CardContent = styled.div`
  padding: 16px;
`;

export const RoomTitle = styled.h3`
  font-size: 17px;
  margin: 0 0 8px 0;
`;

export const RoomSubject = styled.p`
  font-size: 14px;
  margin: 0px;
  padding: 2px 0px;
`;

export const Tag = styled.p`
  font-size: 14px;
  margin: 0;
  border: 1px solid #97c5b1; /* 테두리 색상 */
  background-color: #e4f1ec; /* 배경색 */
  border-radius: 10px;
  padding: 8px;
  margin: 5px 0px;
  display: inline-block;
`;

// 컴포넌트 정의
const MultiRoomListItem = ({ item, onClick }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // 1부터 5까지의 숫자 중 랜덤 선택
    const randomNum = Math.floor(Math.random() * 4) + 1;
    setImageUrl(`/img_thumbnail${randomNum}.jpg`);
  }, []);

  return (
    <Card onClick={onClick}>
      <CardImage imageUrl={imageUrl} />
      <CardContent>
        {!item.isPublic ? (
          <LockOpenIcon style={{ position: 'absolute', top: 118, right: 8 }} />
        ) : (
          <LockIcon style={{ position: 'absolute', top: 118, right: 8 }} />
        )}
        <RoomTitle>{item.studyRoomTitle}</RoomTitle>
        <RoomSubject>{item.description}</RoomSubject>
        <RoomSubject style={{ color: '#757575' }}>
          {item.presentationTime.replace('T', ' ')}
        </RoomSubject>
        <Tag>{item.subject}</Tag>
      </CardContent>
    </Card>
  );
};

export default MultiRoomListItem;
