import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateNickname,
  fetchUserProfile,
} from '../../store/actions/userActions';
import { updateProfile, checkNicknameDuplicate } from '../../apis/auth';
import styled from 'styled-components';
import { Button, Modal } from '@mui/material';

// 모달의 배경을 어둡게 만드는 오버레이 스타일
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// 모달의 콘텐츠 스타일
export const ModalContent = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  width: 350px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;

// 모달의 헤더 스타일
export const ModalHeader = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin: 10px 0px;
  // text-align: center;
`;

// 닉네임 입력 섹션 스타일
const NicknameSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// 닉네임 입력 필드 스타일
export const NicknameInput = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

// 중복 확인 결과 스타일
export const CheckResult = styled.div`
  color: ${(props) => (props.$isAvailable ? 'green' : 'red')};
  font-size: 14px;
  text-align: center;
`;

// ProfileEditModal 컴포넌트 정의
const ProfileEditModal = ({ onClose, oauthId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data) || {};
  const { nickname = '' } = user;
  const userOauthId = useSelector((state) => state.auth.user.oauthId); // oauthId 가져오기

  useEffect(() => {
    if (oauthId) {
      dispatch(fetchUserProfile(oauthId));
    }
  }, [dispatch, oauthId]);

  const [tempNickname, setTempNickname] = useState(nickname); // 입력된 닉네임 상태
  const [checkResult, setCheckResult] = useState(null); // 닉네임 중복 검사 결과 상태
  const [isAvailable, setIsAvailable] = useState(false); // 닉네임 사용 가능 여부 상태

  // 닉네임 중복 확인 핸들러
  const handleNicknameCheck = async () => {
    try {
      const response = await checkNicknameDuplicate(tempNickname);
      if (response === '입력한 닉네임 사용 가능.') {
        setCheckResult('사용 가능한 닉네임입니다.');
        setIsAvailable(true);
      } else {
        setCheckResult('이미 사용 중인 닉네임입니다.');
        setIsAvailable(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setCheckResult('이미 사용중인 닉네임입니다.');
        setIsAvailable(false);
      } else {
        console.error('Error checking nickname:', error);
        setCheckResult('다시 시도해주세요.');
        setIsAvailable(false);
      }
    }
  };

  // 저장 버튼 클릭 시 호출되는 핸들러
  const handleSave = async () => {
    if (isAvailable) {
      try {
        const memberUpdateRequest = {
          oauthId: userOauthId, // oauthId가 올바르게 설정되었는지 확인
          nickname: tempNickname,
        };

        const profileData = new FormData();
        profileData.append(
          'memberUpdateRequest',
          new Blob([JSON.stringify(memberUpdateRequest)], {
            type: 'application/json',
          })
        );

        const response = await updateProfile(profileData);
        console.log('Profile update response:', response); // 응답을 콘솔에 출력
        // 응답이 없어서 모달이 안 닫혀요
        dispatch(updateNickname(tempNickname)); // Redux 상태 업데이트
        onClose(); // 모달 닫기
        if (response) {
        }
      } catch (error) {
        console.error('Profile update error:', error); // 에러를 콘솔에 출력
        setCheckResult('Error saving profile.');
      }
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>수정할 닉네임을 적어주세요</ModalHeader>
        {/* 닉네임 입력 섹션 */}
        <NicknameSection>
          <NicknameInput
            type='text'
            value={tempNickname}
            onChange={(e) => {
              setTempNickname(e.target.value);
              setCheckResult(null);
              setIsAvailable(false);
            }}
            placeholder='닉네임을 입력해주세요'
          />
          <Button
            variant='outlined'
            color='secondary'
            onClick={handleNicknameCheck}
          >
            중복확인
          </Button>
        </NicknameSection>
        {/* 중복 확인 결과 표시 */}
        {checkResult && (
          <CheckResult $isAvailable={isAvailable}>{checkResult}</CheckResult>
        )}
        {/* 모달 하단 버튼 섹션 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '10px',
          }}
        >
          {/* 닉네임 저장 버튼 */}
          <Button
            color='secondary'
            variant='contained'
            onClick={handleSave}
            disabled={!isAvailable}
          >
            저장
          </Button>
          {/* 모달 닫기 버튼 */}
          <Button color='neutral' variant='contained' onClick={onClose}>
            닫기
          </Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProfileEditModal;
