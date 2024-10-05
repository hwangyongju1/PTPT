// src/pages/SettingsPage.jsx

import React, { useState, useEffect } from 'react';
import {
  TextField,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { saveMultiPreset } from '../../store/actions/multiAction';
import { modifyStudyRoomInfo } from '../../apis/room';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const preset = useSelector((state) => state.multi);
  const studyRoomId = useSelector((state) => state.room.roomId);
  const nickname = useSelector((state) => state.auth.user.nickname);
  const hostNickname = useSelector((state) => state.room.hostId);

  const [formValues, setFormValues] = useState({
    studyRoomTitle: '',
    studyRoomPw: '',
    isPublic: '0',
    presentationTime: '',
    subject: '',
    description: '',
    anonymity: '0',
  });
  console.log(preset)

  useEffect(() => {
    if (preset) {
      setFormValues({
        studyRoomTitle: preset.studyRoomTitle || '',
        studyRoomPw: preset.studyRoomPw || '',
        isPublic: preset.isPublic ? '1' : '0',
        presentationTime: preset.presentationTime || '',
        subject: preset.subject || '',
        description: preset.description || '',
        anonymity: preset.anonymity ? '1' : '0',
      });
    }
  }, [preset]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    dispatch(
      saveMultiPreset({
        roomname: formValues.studyRoomTitle,
        roompw: formValues.studyRoomPw,
        roomopen: formValues.isPublic,
        roomtime: formValues.presentationTime,
        roomtopic: formValues.subject,
        roomcomment: formValues.description,
        roomhidden: formValues.anonymity,
      })
    );
    await modifyStudyRoomInfo(studyRoomId, formValues);
  };

  return (
    <Box sx={{ padding: 1 }}>
      <Typography variant="h7" gutterBottom >
        <Box sx={{ fontWeight: 'bold', m: 1 }}>설정 변경</Box>
      </Typography>
      <TextField
        name="studyRoomTitle"
        label="방 이름"
        fullWidth
        margin="normal"
        onChange={handleChange}
        value={formValues.studyRoomTitle}
      />
      <TextField
        name="subject"
        label="방 주제"
        fullWidth
        margin="normal"
        onChange={handleChange}
        value={formValues.subject}
      />
      <TextField
        name="description"
        label="방 설명"
        fullWidth
        margin="normal"
        onChange={handleChange}
        value={formValues.description}
      />
      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">방의 공개 여부</FormLabel>
        <RadioGroup
          row
          name="isPublic"
          value={formValues.isPublic}
          onChange={handleChange}
        >
          <FormControlLabel value="0" control={<Radio />} label="공개" />
          <FormControlLabel value="1" control={<Radio />} label="비공개" />
        </RadioGroup>
      </FormControl>
      <br />
      {formValues.isPublic === '1' && (
        <TextField
          name="studyRoomPw"
          label="비밀번호"
          margin="normal"
          onChange={handleChange}
          value={formValues.studyRoomPw}
        />
      )}
      <br />
      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">평가 익명 여부</FormLabel>
        <RadioGroup
          row
          name="anonymity"
          value={formValues.anonymity}
          onChange={handleChange}
        >
          <FormControlLabel value="0" control={<Radio />} label="익명" />
          <FormControlLabel value="1" control={<Radio />} label="공개" />
        </RadioGroup>
      </FormControl>
      <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
        <Button
          variant="contained"
          color="primary"
          disabled={hostNickname !== nickname}
          onClick={handleSubmit}
          sx={{ marginRight: '8px' }}
        >
          저장
        </Button>
        <Button variant="contained" color="secondary" onClick={() => window.history.back()}>
          뒤로가기
        </Button>
      </Box>
      {hostNickname !== nickname &&
      <Box align="center" >
      <Typography variant="h6">참가자는 접근할 수 없습니다</Typography>  
      </Box>
    }
    </Box>
  );
};

export default SettingsPage;
