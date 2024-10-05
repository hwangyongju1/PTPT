import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setRoomSession } from '../../store/actions/room';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { createStudyRoom } from '../../apis/room';
import {
  setPresentationTime,
  setHost,
  setAnonymous,
} from '../../store/actions/room';
import { saveMultiPreset } from '../../store/actions/multiAction';
import {
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
} from '@mui/material';
import { savePreset } from '../../apis/preset';

const CreateRoom = ({ onSave, onClose, item }) => {
  // user정보 불러와야함
  // const user = useSelector((state) => state.user.data.oauth_id);
  const nickname = useSelector((state) => state.auth.user.nickname);
  const userId = useSelector((state) => state.auth.user.oauthId);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const minDateTime = new Date();
  minDateTime.setHours(17);
  const maxDateTime = new Date();
  maxDateTime.setHours(20);

  // 방에 입장하기 위한 세션 정보
  const onHandleEnterRoom = (roomId) => {
    const sessionData = {
      sessionName: `Session${roomId}`,
      roomId,
    };
    dispatch(setRoomSession(sessionData));
    dispatch(setHost(nickname));
    dispatch(setPresentationTime(roomInfo.roomtime));
    dispatch(setAnonymous(roomInfo.roomhidden));
    navigate(`/multi/${roomId}`);
  };

  // 방 생성 시 설정할 요소들
  const [roomInfo, setRoomInfo] = useState({
    roomname: '',
    roomtopic: '',
    roomcomment: '',
    roompw: '',
    roomopen: 0, // 0: public, 1: private
    roomtime: '', // 시간으로 변경 필요
    roomhidden: 0, // 익명 공개 0이면 공개?
  });
  const [showPassword, setShowPassword] = useState(false);

  // 저장한 스터니룸에서 모달 띄우는 경우 초기값 설정
  useEffect(() => {
    if (item) {
      setRoomInfo({
        roomname: item.studyRoomTitle || '',
        roomtopic: item.subject || '',
        roomcomment: item.description || '',
        roompw: item.studyRoomPw || '',
        roomopen: item.isPublic ? '0' : '1',
        roomtime: item.presentationTime || '',
        roomhidden: item.anonymity || 0,
      });
    }
  }, [item]);

  const onRoomInfoInput = (e) => {
    setRoomInfo({ ...roomInfo, [e.target.name]: e.target.value });
    console.log(roomInfo);
  };

  const onRoomInfoSubmit = async (e) => {
    // e.preventDefault();
    // 방 이름 유효성 검사
    if (roomInfo.roomname.length === 0) {
      alert('방 제목을 설정해주세요 ');
      return;
    } else if(roomInfo.roomtopic.length === 0) {
      alert("방 주제를 설정해주세요")
      return;
    } else if(roomInfo.roomtime.length === 0) {
      alert("시작 시간을 알려주세요")
      return;
    }
    // axios -> 방 생성 api 실행
    // const user = 789;
    const response = await createStudyRoom(userId, roomInfo);
    dispatch(saveMultiPreset(roomInfo));
    onHandleEnterRoom(response); // roomId를 props
  };

  const handleSave = () => {
    // onSave(roomInfo);
    onClose();
    onRoomInfoSubmit();
  };

  // roomopen을 의존성으로 대입하여, roomopen이 변할 때마다 호출
  useEffect(() => {
    if (roomInfo.roomopen === '1') {
      setShowPassword(true);
    } else {
      setShowPassword(false);
    }
  }, [roomInfo.roomopen]);

  const onBlur = () => {
    setRoomInfo((prev) => ({
      ...prev,
      presentationTime: roomInfo.roomtime,
    }));
  };
  return (
    <>
      <TextField
        name='roomname'
        label='방 제목을 입력하세요'
        fullWidth
        margin='normal'
        onChange={onRoomInfoInput}
        value={roomInfo.roomname}
        autoFocus
      />
      <TextField
        name='roomtopic'
        label='방 주제를 입력하세요'
        fullWidth
        margin='normal'
        onChange={onRoomInfoInput}
        value={roomInfo.roomtopic}
      />
      <TextField
        name='roomcomment'
        label='방 설명을 입력해주세요'
        fullWidth
        margin='normal'
        onChange={onRoomInfoInput}
        value={roomInfo.roomcomment}
      />
      <TextField
        name='roomtime'
        label='시작 시간'
        fullWidth
        type='datetime-local'
        margin='normal'
        helperText="방 시간을 입력하세요"
        inputProps={{
          min: minDateTime.toISOString().slice(0, 16),
          max: maxDateTime.toISOString().slice(0, 16),
        }}
        InputLabelProps={{ shrink: true }}
        onChange={onRoomInfoInput}
        value={roomInfo.roomtime}
        onBlur={onBlur}
      />

      <FormControl component='fieldset' margin='normal'>
        <FormLabel component='legend'>방의 공개 여부</FormLabel>
        <RadioGroup
          row
          name='roomopen'
          value={roomInfo.roomopen}
          onChange={onRoomInfoInput}
        >
          <FormControlLabel value='0' control={<Radio />} label='공개' />
          <FormControlLabel value='1' control={<Radio />} label='비공개' />
        </RadioGroup>
      </FormControl>
      <br />
      {showPassword && (
        <TextField
          name='roompw'
          label='비밀번호를 입력하세요'
          error={roomInfo.roompw === "" ? true : false }              
          sx={{ marginBottom: '10px' }}
          onChange={onRoomInfoInput}
          value={roomInfo.roompw}
        />
      )}
      <br />
      <FormControl component='fieldset'>
        <FormLabel component='legend'>평가 익명 여부</FormLabel>
        <RadioGroup
          row
          name='roomhidden'
          value={String(roomInfo.roomhidden)}
          onChange={onRoomInfoInput}
        >
          <FormControlLabel value='0' control={<Radio />} label='익명' />
          <FormControlLabel value='1' control={<Radio />} label='공개' />
        </RadioGroup>
      </FormControl>
      <br />
      <Box mt={2} display='flex' justifyContent='center' gap={1}>
        <Button
          variant='contained'
          color='secondary'
          onClick={handleSave}
          sx={{ marginRight: '30px' }}
        >
          저장
        </Button>
        <Button color='neutral' variant='contained' onClick={onClose}>
          닫기
        </Button>
      </Box>
    </>
  );
};
export default CreateRoom;
