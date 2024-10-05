import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FeedbackItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  background-color: white;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const FeedbackItemText = styled.span`
  flex: 1;
  text-align: left;
`;

const FeedbackListItem = ({ roomName, subject, studyRoomId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('Navigating to study room ID:', studyRoomId);
    navigate(`/myinfo/statistics/evaluation/feedBack/${studyRoomId}`);
  };

  return (
    <FeedbackItemContainer onClick={handleClick}>
      <FeedbackItemText>{roomName}</FeedbackItemText>
      <FeedbackItemText>{subject}</FeedbackItemText>
    </FeedbackItemContainer>
  );
};

export default FeedbackListItem;
