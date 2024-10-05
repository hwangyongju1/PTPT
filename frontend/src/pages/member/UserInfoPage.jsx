import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../store/actions/authActions';
import { checkNicknameDuplicate, updateProfile } from '../../apis/auth';
import {
  NicknameInput,
  ModalHeader,
} from '../../components/molecules/ProfileEditModal';
import { Button } from '@mui/material';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 64px);
  background-color: #f9f9f9;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 350px;
  gap: 10px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  margin-bottom: 10px;
`;

const FileInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
`;

const NicknameContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Message = styled.p`
  color: ${(props) => (props.$isError ? 'red' : 'blue')};
  margin: 5px 0;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
  width: 100%;
  text-align: left;
`;

const UserInfoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = new URLSearchParams(window.location.search);

  // oauthId 값을 추출
  const oauthId = params.get('oauthId');
  const [nickname, setNickname] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [voiceModel, setVoiceModel] = useState(null);
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setNicknameMessage('');
    setIsNicknameValid(false);
  };

  const handleVoiceModelChange = (e) => {
    setVoiceModel(e.target.files[0]);
  };

  const handleProfilePictureChange = (e) => {
    console.log(e.target.files[0]);
    setProfilePicture(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const profileData = new FormData();

    const memberUpdateRequest = {
      oauthId: oauthId,
      nickname: nickname,
      memberPicture: '/profileImage/defaultImage.png',
      voiceModelCreated: 0,
    };
    profileData.append(
      'memberUpdateRequest',
      new Blob([JSON.stringify(memberUpdateRequest)], {
        type: 'application/json',
      })
    );
    if (profilePicture)
      memberUpdateRequest.memberPicture =
        '/profileImage/' + oauthId + '.' + profilePicture.name.split('.').pop();
    profileData.append('image', profilePicture);

    console.log(memberUpdateRequest);
    try {
      const response = await updateProfile(profileData);
      console.log('성공', response);
    } catch (error) {
      console.error('ddddd', error);
      throw error;
    }
    dispatch(setAuth(token, memberUpdateRequest));
    // response가 없으므로 무조건 메인으로 이동
    navigate('/');
  };

  const handleNicknameCheck = async () => {
    try {
      const response = await checkNicknameDuplicate(nickname);
      if (response) {
        setNicknameMessage('사용 가능한 닉네임입니다.');
        setIsNicknameValid(true);
      }
    } catch (error) {
      setNicknameMessage('이미 존재하는 닉네임입니다.');
      setIsNicknameValid(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleFormSubmit}>
        <ModalHeader>사용자 정보를 입력해주세요</ModalHeader>
        <NicknameContainer>
          <NicknameInput
            type='text'
            placeholder='닉네임을 입력하세요'
            value={nickname}
            onChange={handleNicknameChange}
            required
          />
          <Button
            variant='contained'
            color='secondary'
            onClick={handleNicknameCheck}
            sx={{ marginLeft: '10px' }}
          >
            중복확인
          </Button>
        </NicknameContainer>
        {nicknameMessage && (
          <Message $isError={!isNicknameValid}>{nicknameMessage}</Message>
        )}
        <Label>프로필 사진</Label>
        <FileInput type='file' onChange={handleProfilePictureChange} />
        <Label>음성 모델</Label>
        <FileInput type='file' onChange={handleVoiceModelChange} />
        <ButtonContainer>
          <Button
            variant='contained'
            color='secondary'
            disabled={!isNicknameValid}
            onClick={handleFormSubmit}
          >
            회원가입
          </Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default UserInfoPage;
