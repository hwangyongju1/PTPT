import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// 스타일 컴포넌트 정의
export const StyledNavbar = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 0 200px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0; /* 오른쪽도 설정하여 전체 너비를 차지하도록 설정 */
  z-index: 1000;
  box-sizing: border-box; /* 박스 사이징 설정 */
`;
export const Letter = styled(motion.span)`
  display: inline-block;
  position: relative;
  font-size: 16px;
  color: #000; /* 텍스트 색상을 검정색으로 설정 */
`;

export const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoImage = styled(motion.img)`
  height: 100%; /* 내비게이션 바 높이에 맞추어 로고 높이 설정 */
  max-height: 64px; /* 로고의 최대 높이를 내비게이션 바의 높이로 설정 */
  width: auto; /* 가로 크기는 자동으로 비율에 맞게 설정 */
`;
export const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const NavLink = styled(motion(Link))`
  text-decoration: none;
  color: #000;
  margin: 0 30px;
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 20px;
  position: relative;
  display: inline-block;
  overflow: hidden; /* 글자가 넘칠 때 잘리도록 설정 */

  &:hover {
    background: #f0f0f0;
  }
`;

export const ProfileImage = styled(motion.img)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

// 드롭다운 컨테이너
export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;

  &:hover > div {
    display: block;
  }
`;

// 드롭다운 버튼 (프로필 이미지)
export const DropdownButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

// 드롭다운 메뉴
export const DropdownMenu = styled.div`
  position: absolute;
  top: 110%; /* 프로필 이미지와 드롭다운 메뉴 사이에 공백 추가 */
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 100px;
  border-radius: 5px;
  text-align: center;
`;

// 드롭다운 메뉴 아이템
export const DropdownItem = styled(Link)`
  color: black;
  padding: 12px 0; /* 좌우 패딩을 0으로 설정하여 꽉 차게 함 */
  text-decoration: none;
  display: block;
  width: 100%; /* 아이템이 드롭다운 메뉴의 폭에 꽉 차도록 설정 */
  font-size: 15px; /* 텍스트 크기를 16px로 설정 */
  // color: #76abae;
  &:hover {
    background-color: #f1f1f1;
  }
`;

// 드롭다운 메뉴 아이템 중 로그아웃 버튼 전용 스타일
export const LogoutButton = styled.button`
  color: black;
  padding: 12px 0; /* 좌우 패딩을 0으로 설정하여 꽉 차게 함 */
  width: 100%; /* 버튼이 드롭다운 메뉴의 폭에 꽉 차도록 설정 */
  background: none;
  border: none;
  text-align: center;
  cursor: pointer;
  font-size: 15px; /* 텍스트 크기를 16px로 설정 */
  color: #dc143c;
  &:hover {
    background-color: #f1f1f1;
  }
`;

// 애니메이션 설정
export const letterVariants = {
  initial: {
    y: '0%',
    opacity: 1,
    rotateX: '0deg',
  },
  hover: {
    y: '-100%',
    opacity: 0,
    rotateX: '90deg',
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

export const hoverVariants = {
  initial: {
    y: '100%',
    opacity: 0,
    rotateX: '90deg',
  },
  hover: {
    y: '0%',
    opacity: 1,
    rotateX: '0deg',
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};
