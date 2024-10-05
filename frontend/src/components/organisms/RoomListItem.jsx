import { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { Modal, Box, Button } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  setRoomSession,
  setAnonymous,
  setHost,
  setPresentationTime,
} from '../../store/actions/room';
import { saveMultiPreset } from '../../store/actions/multiAction';
import { checkStudyRoomPW } from '../../apis/room';
import {
  Card,
  CardImage,
  CardContent,
  RoomTitle,
  RoomSubject,
  Tag,
} from './MultiRoomListItem';

const RoomListItem = ({
  studyRoomTitle,
  subject,
  studyRoomId,
  isPublic,
  description,
  presentationTime,
  anonymity,
  studyRoomPw,
  hostNickname,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [roomInfo, setRoomInfo] = useState(0);
  const [isJoinDisabled, setIsJoinDisabled] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // 1부터 5까지의 숫자 중 랜덤 선택
    const randomNum = Math.floor(Math.random() * 4) + 1;
    setImageUrl(`/img_thumbnail${randomNum}.jpg`);
  }, []);

  const handleJoin = async () => {
    if (studyRoomPw === '') {
      dispatch(setHost(hostNickname));
      dispatch(setPresentationTime(presentationTime));
      dispatch(setAnonymous(anonymity));
      saveMultiPresetState();
      setRoomInfo(studyRoomId);
      return;
    } else {
      console.log('id : ' + studyRoomId + ' pw : ' + password);
      const response = await checkStudyRoomPW(studyRoomId, password);
      console.log(response);
      if (response.status == '200') {
        dispatch(setHost(hostNickname));
        dispatch(setPresentationTime(presentationTime));
        dispatch(setAnonymous(anonymity));
        saveMultiPresetState();
        setRoomInfo(studyRoomId);
      } else {
        alert('비밀번호 오류');
        return;
      }
    }
  };

  const saveMultiPresetState = () => {
    const preset = {
      roomname: studyRoomTitle,
      roomtopic: subject,
      roomcomment: description,
      roompw: studyRoomPw,
      roomopen: isPublic,
      roomtime: presentationTime,
      roomhidden: anonymity,
    };
    dispatch(saveMultiPreset(preset));
  };

  useEffect(() => {
    if (roomInfo) {
      const sessionData = {
        sessionName: `Session${roomInfo}`,
        roomId: roomInfo,
      };
      console.log('roominfo : ', roomInfo);
      dispatch(setRoomSession(sessionData));
      navigate(`/multi/${roomInfo}`);
    }
  }, [roomInfo]);

  // 현재 시간이 생성 시간을 초과하면 참가 버튼 비활성화
  useEffect(() => {
    const currentTime = new Date();
    const presentationDateTime = new Date(presentationTime);
    if (currentTime > presentationDateTime) {
      setIsJoinDisabled(true);
    }
  }, [presentationTime]);

  return (
    <>
      <Card onClick={handleOpen}>
        <CardImage imageUrl={imageUrl} />
        <CardContent>
          {!isPublic ? (
            <LockOpenIcon
              style={{ position: 'absolute', top: 118, right: 8 }}
            />
          ) : (
            <LockIcon style={{ position: 'absolute', top: 118, right: 8 }} />
          )}
          <RoomTitle>{studyRoomTitle}</RoomTitle>
          <RoomSubject>{description}</RoomSubject>
          <RoomSubject style={{ color: '#757575' }}>
            {presentationTime.replace('T', ' ')}
          </RoomSubject>
          <Tag>{subject}</Tag>
        </CardContent>
      </Card>
      <Modal open={showModal} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            padding: '10px 20px',
            borderRadius: '10px',
          }}
        >
          <h2>제목 | {studyRoomTitle}</h2>
          <p>방 설명 | {description}</p>
          <p>방 주제 | {subject}</p>
          <p>🕒 {presentationTime.replace('T', ' ')}</p>
          {isPublic === 1 && (
            <div>
              <input
                type='password'
                placeholder='비밀번호 입력'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px', // 버튼과 내용 사이 간격 추가
            }}
          >
            <Button
              variant='contained'
              onClick={handleJoin}
              disabled={isJoinDisabled}
              color='secondary'
              sx={{ marginRight: '20px' }} // 버튼 사이 간격 설정
            >
              참가
            </Button>
            <Button color='neutral' variant='contained' onClick={handleClose}>
              닫기
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default RoomListItem;
