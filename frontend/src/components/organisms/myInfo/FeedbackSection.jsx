import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchFeedback } from '../../../store/actions/feedbackActions';
import FeedbackListItem from './FeedbackListItem';

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 20px 0;
`;

const FeedbackListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; /* 항목 간격을 조금 더 넓힘 */
`;

const FeedbackSectionContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Label = styled.span`
  flex: 1;
  text-align: left;
`;

const FeedbackSection = () => {
  const dispatch = useDispatch();
  const oauthId = useSelector((state) => state.auth.user.oauthId);
  const feedbackData = useSelector((state) => state.feedback.feedbackList);
  const loading = useSelector((state) => state.feedback.loading);
  const error = useSelector((state) => state.feedback.error);

  useEffect(() => {
    if (oauthId) {
      dispatch(fetchFeedback(oauthId, 1));
    }
  }, [dispatch, oauthId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // 스터디룸별로 피드백을 그룹화
  const groupedFeedback = feedbackData.reduce((acc, feedback) => {
    if (!acc[feedback.studyRoomId]) {
      acc[feedback.studyRoomId] = {
        studyRoomTitle: feedback.studyRoomTitle,
        subject: feedback.subject,
        studyRoomId: feedback.studyRoomId,
      };
    }
    return acc;
  }, {});

  return (
    <FeedbackSectionContainer>
      <h2>피드백 모아보기</h2>
      <Divider />
      <LabelContainer>
        <Label>스터디룸 제목</Label>
        <Label>주제</Label>
      </LabelContainer>
      <FeedbackListContainer>
        {Object.values(groupedFeedback).map((room, index) => (
          <FeedbackListItem
            key={`${room.studyRoomId}-${index}`}
            roomName={room.studyRoomTitle}
            subject={room.subject}
            studyRoomId={room.studyRoomId}
          />
        ))}
      </FeedbackListContainer>
    </FeedbackSectionContainer>
  );
};

export default FeedbackSection;
