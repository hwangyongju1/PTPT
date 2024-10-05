import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import MyInfoSidebarOption from '../../molecules/MyInfoSidebarOption';
import ProfileEditModal from '../../molecules/ProfileEditModal';
import ProfileImageEditModal from '../../molecules/ProfileImageEditModal';
import { Edit } from '@mui/icons-material'; // MUI 아이콘 라이브러리에서 연필 아이콘 가져오기

// 사이드바 컨테이너 스타일
const SidebarContainer = styled.div`
  width: 250px;
  background-color: #ffffff;
  padding: 20px;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// 프로필 섹션 스타일
const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

// 프로필 이미지 스타일 (원형으로 표시, 클릭 가능)
const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
`;

// 프로필 이름 및 아이콘을 포함하는 컨테이너 스타일
const ProfileNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* 이름과 아이콘 사이의 간격 설정 */
  margin-top: 10px;
`;

// 프로필 이름 스타일
const ProfileName = styled.h2`
  font-size: 20px;
  margin: 0;
`;

// 연필 아이콘 스타일
const EditIcon = styled(Edit)`
  cursor: pointer;
  color: #b1b1b1; /* 아이콘 색상 설정 */
  &:hover {
    color: #7a7a7a; /* 아이콘 호버 색상 설정 */
  }
`;

// 파일 업로드 입력 스타일 (숨김)
const FileInput = styled.input`
  display: none;
`;

// MyInfoSidebar 컴포넌트 정의
const MyInfoSidebar = () => {
  // Redux에서 사용자 데이터를 가져옴 (Navbar와 동일한 상태 참조)
  const user = useSelector((state) => state.auth?.user) || {};
  const [isModalOpen, setIsModalOpen] = useState(false); // 프로필 수정 모달 상태 관리
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); // 프로필 이미지 수정 모달 상태 관리
  const { oauthId, nickname, memberPicture } = user;
  console.log(user);
  // 프로필 수정 모달 열기 핸들러
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // 프로필 수정 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 프로필 이미지 수정 모달 열기 핸들러
  const handleImageClick = () => {
    setIsImageModalOpen(true);
  };

  // 프로필 이미지 수정 모달 닫기 핸들러
  const handleImageModalClose = () => {
    setIsImageModalOpen(false);
  };

  return (
    <SidebarContainer>
      <ProfileSection>
        {/* 프로필 이미지 (클릭 시 파일 입력 창 열기) */}
        <ProfileImage
          src={'https://i11b207.p.ssafy.io/uploads' + memberPicture} // 프로필 이미지가 없으면 기본 이미지 사용
          alt='Profile'
          onClick={handleImageClick}
        />
        {/* 프로필 이름 및 아이콘 */}
        <ProfileNameContainer>
          <ProfileName>{nickname || '닉네임 없음'}</ProfileName>
          <EditIcon onClick={handleOpenModal} />
        </ProfileNameContainer>
        {/* 프로필 수정 모달 열기 버튼 */}
        {/* <button onClick={handleOpenModal}>닉네임 수정</button> */}
      </ProfileSection>
      {/* 사이드바 옵션들 */}
      <MyInfoSidebarOption to='/myinfo/statistics' icon='📊'>
        통계
      </MyInfoSidebarOption>
      <MyInfoSidebarOption to='/myinfo/saved-rooms' icon='📁'>
        저장한 스터디룸
      </MyInfoSidebarOption>
      <MyInfoSidebarOption to='/myinfo/voice-model' icon='🎙️'>
        음성 모델 등록
      </MyInfoSidebarOption>
      {/* 프로필 수정 모달 */}
      {isModalOpen && (
        <ProfileEditModal
          onClose={handleCloseModal}
          oauthId={oauthId} // oauthId 전달
        />
      )}
      {/* 프로필 이미지 수정 모달 */}
      {isImageModalOpen && (
        <ProfileImageEditModal
          onClose={handleImageModalClose}
          oauthId={oauthId} // oauthId 전달
        />
      )}
    </SidebarContainer>
  );
};

export default MyInfoSidebar;
