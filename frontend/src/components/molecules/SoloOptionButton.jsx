import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { initPreset } from '../../store/actions/soloActions';
import { useDispatch } from 'react-redux';

// 버튼 컨테이너 스타일
export const ButtonContainer = styled.div`
  position: relative;
  width: 45%; // 버튼 너비
  height: 500px; // 버튼 높이
  margin: 10px; // 버튼 간격
  cursor: pointer; // 커서 모양
  transition: transform 0.3s ease; // 크기 변경 애니메이션

  // 마우스를 올렸을 때 크기 확대
  &:hover {
    transform: scale(1.05);
  }
`;

// 이미지 스타일
export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 10px; // 모서리 둥글게
  transition: opacity 0.3s ease;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2); // 검은색 반투명 오버레이
  border-radius: 10px;
  transition: background-color 0.3s ease;

  // 마우스를 올렸을 때 오버레이를 더 어둡게 함
  ${ButtonContainer}:hover & {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

// 라벨 스타일
export const Label = styled.span`
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 24px;
  font-weight: bold;
  // text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); // 그림자 효과
`;

const SoloOptionButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 버튼 클릭 시 /solo 페이지로 이동
  const handleClick = () => {
    dispatch(initPreset(null)); // state 초기화
    navigate('/solo');
  };

  return (
    <ButtonContainer onClick={handleClick}>
      <Image src={'/solobutton.svg'} alt='혼자 하기' />
      <Overlay />
      <Label>혼자 하기</Label>
    </ButtonContainer>
  );
};

export default SoloOptionButton;
