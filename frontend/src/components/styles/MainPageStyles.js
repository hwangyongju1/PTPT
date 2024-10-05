import styled from 'styled-components';

// 컨테이너 스타일 정의
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
// 개별 프로젝트 카드를 위한 스타일 정의
export const ProjectCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent; /* 배경을 완전히 투명하게 설정 */
  margin: 20px 0;
  width: 80%;
  max-width: 800px;
  transition:
    transform 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
`;

// 프로젝트 텍스트 래퍼 스타일 정의
export const ProjectTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start; /* 수평 정렬을 왼쪽으로 설정 */
  text-align: left; /* 텍스트 자체도 왼쪽 정렬 */
  width: 40%; /* 텍스트가 차지할 넓이 */
  padding: 0px 20px; /* 텍스트와 이미지 간의 여백을 줄임 */
  margin-top: -400px; /* 텍스트를 위로 올림 */
`;

// 콘텐츠 스타일 정의
export const Content = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.$reverse ? 'row-reverse' : 'row')};
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1600px;
  padding: 30px; /* 패딩 추가로 내부 여백 확보 */
  box-sizing: border-box; /* 패딩과 너비를 포함하여 크기 계산 */
  background-color: ${(props) => props.$backgroundColor || 'transparent'};
  background-image: url(${(props) => props.background || 'none'});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  border-radius: 10px;
  opacity: 1;
  transition: opacity 1s ease-in-out;
  gap: 20px; /* 간격을 줄임 */

  & > ${ProjectCard} {
    width: 55%;
  }
  & > ${ProjectTextWrapper} {
    width: 45%;
  }
`;
// 프로젝트 이미지 스타일 정의
export const ProjectImage = styled.img`
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 20px;
  background: transparent; /* 이미지 배경을 투명하게 설정 */
`;

// 프로젝트 제목 및 설명 스타일 정의
export const ProjectTitle = styled.h2`
  margin: 0 0 20px 0; /* 아래쪽 간격을 더 넓히기 위해 margin-bottom을 조정 */
  font-size: 32px; /* 텍스트 크기 키움 */
  color: #333;
`;

export const ProjectDescription = styled.p`
  font-size: 20px; /* 텍스트 크기 키움 */
  color: #777;
  margin-bottom: 10px; /* 문장 간의 간격을 줄이기 위해 margin 조정 */
`;

export const ProjectLink = styled.a`
  margin-top: 20px; /* ProjectDescription과의 간격을 늘리기 위해 margin-top을 조정 */
  font-size: 20px; /* 텍스트 크기 키움 */
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
