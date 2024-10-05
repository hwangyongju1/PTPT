import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../apis/auth';
import { setAuth } from '../../store/actions/authActions';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { ModalOverlay, ModalContent, ModalHeader } from './ProfileEditModal';

// 파일 선택 버튼 스타일 (label 사용)
const FileLabel = styled.label`
  display: inline-block;
  padding: 10px;
  background-color: #639d82;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #4e8065;
  }
`;

// 파일 업로드 입력 스타일 (숨김)
const FileInput = styled.input`
  display: none;
`;

// 파일 이름 표시 스타일
const FileName = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #333;
  text-align: center;
`;

const CancelButton = styled.button`
  background-color: #639d82;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
`;

// 파일 이름 및 취소 버튼을 포함하는 컨테이너 스타일
const FileNameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 버튼을 오른쪽으로 정렬 */
  margin-top: 10px;
`;

// 이미지 미리보기 스타일
const ImagePreview = styled.img`
  max-width: 100px;
  max-height: 100px;
  border-radius: 8px;
`;

// 이미지 미리보기 컨테이너 스타일
const ImagePreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const ProfileImageEditModal = ({ onClose, oauthId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    'https://i11b207.p.ssafy.io/uploads/profileImage/defaultImage.png'
  );

  useEffect(() => {
    setImagePreviewUrl(
      'https://i11b207.p.ssafy.io/uploads' + user.memberPicture
    );
  }, [user]);
  // 파일 선택 시 호출되는 핸들러
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);

      // 이미지 미리보기 URL 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setFileName('');
    setImagePreviewUrl('/default_profile.png'); // 기본 이미지로 리셋
  };

  // 저장 버튼 클릭 시 호출되는 핸들러
  const handleSave = async () => {
    if (selectedFile) {
      try {
        const memberUpdateRequest = {
          oauthId: user.oauthId,
          nickname: user.nickname,
        };

        const profileData = new FormData();
        profileData.append(
          'memberUpdateRequest',
          new Blob([JSON.stringify(memberUpdateRequest)], {
            type: 'application/json',
          })
        );
        profileData.append('image', selectedFile);
        if (selectedFile)
          memberUpdateRequest.memberPicture =
            '/profileImage/' +
            oauthId +
            '.' +
            selectedFile.name.split('.').pop();
        const response = await updateProfile(profileData);
        console.log('Profile image update response:', response);
        dispatch(setAuth('token', memberUpdateRequest));
        onClose(); // 모달 닫기
      } catch (error) {
        console.error('Error updating profile image:', error);
      }
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>새로운 프로필 사진을 선택하세요</ModalHeader>
        {/* 이미지 미리보기 컨테이너 */}
        <ImagePreviewContainer>
          <ImagePreview src={imagePreviewUrl} alt='미리보기' />
        </ImagePreviewContainer>
        <FileInput
          type='file'
          id='fileInput'
          accept='image/*'
          onChange={handleFileChange}
        />
        <FileLabel htmlFor='fileInput'>이미지 선택</FileLabel>
        {/* <FileNameContainer>
          <FileName>Selected file: {fileName}</FileName>
          {selectedFile && (
            <CancelButton onClick={handleCancel}>Cancel</CancelButton>
          )}
        </FileNameContainer> */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '10px',
          }}
        >
          <Button
            color='secondary'
            variant='contained'
            onClick={handleSave}
            disabled={!selectedFile}
          >
            저장
          </Button>
          <Button color='neutral' variant='contained' onClick={onClose}>
            닫기
          </Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProfileImageEditModal;
