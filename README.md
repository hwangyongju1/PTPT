# PTPT ; Presentation Personal Trainer 👨🏻‍🏫🏋🏻
## 💡 프로젝트 소개
발표 시뮬레이션을 통한 발표 연습 서비스

## 📜 컨벤션 
### 1. 코드 컨벤션
- **BackEnd**
    - 변수명: camelCase
    - 클래스명
        - 명사
        - PascalCase
    - 메서드명
        - 동사
        - camelCase
- **FrontEnd**
    - 컴포넌트, 스타일 컴포넌트: PascalCase
        - 컴포넌트명과 파일명 일치
    - js 함수(메서드), 변수, hook: camelCase

### 2. 브랜치 전략

- Git Flow
    - master / develop / feature / release / hotfix
    - `feature/개발파트/기능` 형식
        
        ex) `feature/fe/component`
        

### 3. 커밋 컨벤션
- `타입 : 제목` 형식
- 커밋 타입
    
    - `feat` : 새로운 기능 추가
    - `fix` : 버그 수정
    - `docs` : 문서 수정
    - `style` : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
    - `refactor` : 코드 리펙토링
    - `test` : 테스트 코드, 리펙토링 테스트 코드 추가
    - `chore` : 빌드 업무 수정, 패키지 매니저 수정
    - `resolve` : conflict 해결

### 4. 코드 리뷰 Pn룰
Pn 룰은 리뷰어가 각 코멘트별로 강조하고 싶은 정도를 표현하는 방식입니다!

- P1: 꼭 반영해주세요(Request changes)
- P2: 적극적으로 고려해주세요(Request changes)
- P3: 웬만하면 반영해 주세요(Comment)
- P4: 반영해도 좋고 넘어가도 좋습니다(Approve)
- P5: 그냥 사소한 의견입니다(Approve)
