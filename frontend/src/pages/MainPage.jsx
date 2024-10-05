import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Content,
  ProjectCard,
  ProjectImage,
  ProjectTitle,
  ProjectDescription,
  ProjectLink,
  ProjectTextWrapper,
} from '../components/styles/MainPageStyles';

const MainPage = () => {
  return (
    <Container>
      {/* Section 1 */}
      <Content $backgroundColor='#f0f4f8'>
        <ProjectCard>
          <ProjectImage
            src='/backgroundImage.svg'
            alt='AI 음성 학습을 통한 발표 연습'
          />
        </ProjectCard>
        <ProjectTextWrapper>
          <ProjectTitle>발표 연습, 이제 더 이상 걱정하지 마세요!</ProjectTitle>
          <ProjectDescription>
            발표를 준비하면서 느꼈던 부담, 이제 PTPT가 함께합니다.
          </ProjectDescription>
          <ProjectDescription>
            PTPT는 여러분의 발표를 분석하고
          </ProjectDescription>
          <ProjectDescription>
            개선점을 제안하여 완벽한 발표를 도울 것입니다.
          </ProjectDescription>
          <ProjectDescription>
            지금 바로 시작해서 자신감 있는 발표자가 되어보세요!
          </ProjectDescription>

          <ProjectLink as={Link} to='/practice'>
            시작하기
          </ProjectLink>
        </ProjectTextWrapper>
      </Content>

      {/* Section 2 */}
      <Content $backgroundColor='#ffffff' $reverse={true}>
        <ProjectCard>
          <ProjectImage
            src='/soloImage.svg'
            alt='AI 음성 학습을 통한 발표 연습'
            style={{ transform: 'scaleX(-1)' }} // 이 이미지만 좌우 반전
          />
        </ProjectCard>
        <ProjectTextWrapper>
          <ProjectTitle>혼자서도 완벽한 발표 연습</ProjectTitle>
          <ProjectDescription>
            혼자서도 언제 어디서나 발표 연습이 가능합니다.
          </ProjectDescription>
          <ProjectDescription>
            PTPT가 제공하는 스크립트와 음성 분석 기능을 활용해,
          </ProjectDescription>
          <ProjectDescription>
            여러분의 발표를 실제와 같이 완벽하게 연습해보세요!
          </ProjectDescription>
          <ProjectDescription>
            스피치 톤, 속도, 표현력까지 세밀하게 조정할 수 있습니다.
          </ProjectDescription>
          <ProjectLink as={Link} to='/solo'>
            혼자 연습하기
          </ProjectLink>
        </ProjectTextWrapper>
      </Content>

      {/* Section 3 */}
      <Content $backgroundColor='#f0f4f8'>
        <ProjectCard>
          <ProjectImage
            src='/multiImage.svg'
            alt='AI와 함께하는 실전 같은 발표 연습'
          />
        </ProjectCard>
        <ProjectTextWrapper>
          <ProjectTitle>함께하는 발표 연습, 더 효과적으로</ProjectTitle>
          <ProjectDescription>
            발표는 혼자 하는 것이 아닙니다.
          </ProjectDescription>
          <ProjectDescription>
            친구들과 함께, 또는 새로운 사람들과 스터디를 구성하여
          </ProjectDescription>
          <ProjectDescription>
            실전과 같은 발표 연습을 진행하고 평가해보세요.
          </ProjectDescription>
          <ProjectDescription>
            피드백을 주고 받으며 더 나은 발표자가 되어봅시다!
          </ProjectDescription>
          <ProjectLink as={Link} to='/room/list'>
            같이 연습하기
          </ProjectLink>
        </ProjectTextWrapper>
      </Content>
    </Container>
  );
};

export default MainPage;
