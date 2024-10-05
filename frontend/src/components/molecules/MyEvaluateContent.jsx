import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { takeMyEvaluate } from '../../apis/room';
import MultiRadarChart from '../organisms/myInfo/MultiRadarChart';
import { Box, Typography, Paper, Divider } from '@mui/material';
import { setEvaluations } from '../../store/actions/evaluationActions';
import FeedbackIcon from '@mui/icons-material/Feedback';

const MyEvaluateContent = () => {
  const [myEvaluate, setMyEvaluate] = useState({
    delivery: 0,
    expression: 0,
    preparation: 0,
    logic: 0,
    suitability: 0,
  });
  const [myComment, setMyComment] = useState([]);
  const studyRoomId = useSelector((state) => state.room.roomId);
  const userId = useSelector((state) => state.auth.user.oauthId);
  const [isEval, setIsEval] = useState(false);
  const anonymity = useSelector((state) => state.room.isAnonymous); // 익명 여부
  // oauth_id로 내 평가 호출해오기
  const getMyEval = async () => {
    try {
      const response = await takeMyEvaluate(studyRoomId, userId);
      console.log(response);
      if (response && response.length > 0) {
        setIsEval(false);
        // 익명 여부와 평가 길이
        const totalEvaluate = response.reduce(
          (acc, curr) => ({
            delivery: acc.delivery + curr.delivery,
            expression: acc.expression + curr.expression,
            preparation: acc.preparation + curr.preparation,
            logic: acc.logic + curr.logic,
            suitability: acc.suitability + curr.suitability,
          }),
          {
            delivery: 0,
            expression: 0,
            preparation: 0,
            logic: 0,
            suitability: 0,
          }
        );
        const averageEvaluate = {
          delivery: totalEvaluate.delivery / response.length,
          expression: totalEvaluate.expression / response.length,
          preparation: totalEvaluate.preparation / response.length,
          logic: totalEvaluate.logic / response.length,
          suitability: totalEvaluate.suitability / response.length,
        };

        const comments = response.map(({ nickname, commentContent }) => ({
          nickname,
          commentContent,
        }));

        setMyEvaluate(averageEvaluate);
        console.log(myEvaluate);
        setMyComment(comments);
      } else {
        setIsEval(true);
      }
    } catch (error) {
      console.log('get my evaluate error : ' + error);
    }
  };

  useEffect(() => {
    getMyEval();
  }, []);

  return (
    <div>
      {!isEval ? (
        <Box sx={{ width: '100%' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>평가 점수</div>
          <Box sx={{ marginBottom: 5, width: '100%', height: '200px' }}>
            <MultiRadarChart data={myEvaluate} />
          </Box>
          <Box>
            <div
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '10px',
              }}
            >
              코멘트
            </div>

            {myComment.map((comment, index) => (
              <Paper
                key={index}
                elevation={4}
                sx={{ padding: 2, marginBottom: 2 }}
              >
                {anonymity == 1 ? ( // 1이 공개이므로, 이 때만 표시
                  <Typography variant='subtitle1' gutterBottom>
                    {comment.nickname}
                  </Typography>
                ) : (
                  <Typography variant='subtitle1' gutterBottom>
                    익명
                  </Typography>
                )}

                <Divider />
                <Typography variant='body1'>
                  {comment.commentContent}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            marginBottom: '10px',
            flexDirection: 'column',
          }}
        >
          <FeedbackIcon
            style={{
              fontSize: '60px', // 아이콘 크기 키우기
              marginBottom: '10px',
              color: '#B0B0B0', // 진한 회색 색상
            }}
          />
          아직 평가가 없습니다
        </div>
      )}
    </div>
  );
};

export default MyEvaluateContent;
