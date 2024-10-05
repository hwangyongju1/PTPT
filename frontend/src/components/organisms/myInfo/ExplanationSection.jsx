import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* 각 항목 사이의 간격 */
  padding: 20px;
  width: 400px;
`;

const Item = styled.div`
  display: flex;
  align-items: flex-start; /* 텍스트를 점과 정렬 */
  gap: 10px; /* 점과 텍스트 사이의 간격 */
  margin-bottom: 10px;
`;

const Bullet = styled.span`
  font-size: 20px;
  color: #333; /* 점의 색상 */
  display: inline-block;
  width: 1em; /* 점과 텍스트 간격 조절 */
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
`;

const ExplanationSection = ({ data }) => {
  if (!data) {
    return null;
  }

  const explain = {
    totalDelivery: {
      name: '전달력',
      minText:
        '전달력이 부족하면 청중이 발표 내용을 제대로 이해하지 못할 수 있어요. 명확한 전달과 자신감 있는 발표가 중요합니다. 발음, 억양, 그리고 발표의 흐름에 신경 써보세요.',
      maxText:
        '전달력이 뛰어나군요! 발표를 통해 청중이 내용을 쉽게 이해할 수 있었습니다. 이러한 뛰어난 전달력을 계속 유지하세요!',
    },
    totalExpression: {
      name: '표현력',
      minText:
        '표현력이 부족하면 발표 내용이 명확하게 전달되지 않거나, 설득력이 떨어질 수 있어요. 단어 선택과 감정 표현에 신경 쓰면 발표의 효과를 크게 높일 수 있습니다.',
      maxText:
        '표현력이 매우 뛰어납니다! 정확한 단어 선택과 감정 표현이 발표를 더욱 생동감 있게 만들었어요. 설득력 있는 표현은 발표자의 메시지를 강력하게 전달합니다.',
    },
    totalLogic: {
      name: '논리성',
      minText:
        '논리성이 부족하면 청중이 발표 내용을 이해하기 어렵고, 발표자의 신뢰성이 떨어질 수 있어요. 발표의 구조와 근거를 다시 한 번 점검해보세요.',
      maxText:
        '논리성이 매우 높다는 평가를 받았어요! 논리적인 전개는 청중을 효과적으로 설득하는 데 큰 힘이 됩니다.',
    },
    totalPreparation: {
      name: '준비성',
      minText:
        '준비성이 부족하면 발표가 불안정해지고, 예상치 못한 상황에 대처하기 어려울 수 있어요. 더 많은 연습과 자료 준비가 필요합니다.',
      maxText:
        '준비성이 높다는 평가를 받았어요! 준비성이 높으면 자신감이 증가하고 질문 대응능력이 증가해 전문성을 더욱 돋보이게 합니다.',
    },
    totalSuitability: {
      name: '적합성',
      minText:
        '발표 내용이 청중이나 상황에 적합하지 않을 경우, 청중의 관심을 끌기 어려울 수 있어요. 발표 내용이 청중의 요구와 상황에 맞도록 조정해보세요.',
      maxText:
        '발표 내용의 적합성이 매우 높다는 평가를 받았어요! 주제와 상황에 맞춘 발표는 청중의 긍정적인 반응을 이끌어냅니다.',
    },
  };

  // data.totalDelivery = 100;
  const totalValues = Object.keys(data)
    .filter((key) => key.startsWith('total'))
    .map((key) => ({ key, value: data[key] }));

  const max = totalValues.reduce((prev, current) =>
    prev.value > current.value ? prev : current
  );
  const min = totalValues.reduce((prev, current) =>
    prev.value < current.value ? prev : current
  );

  console.log('최대값:', max.value, '키:', max.key);
  console.log('최소값:', min.value, '키:', min.key);
  console.log(explain[max.key.maxText]);
  console.log(explain[min.key.minText]);
  return (
    <>
      <Container>
        <Item>
          <Bullet>•</Bullet>
          <Text>
            <div style={{ fontSize: '20px', marginBottom: '10px' }}>
              <b>{explain[min.key].name}</b>이 낮아요!
            </div>
            <div style={{ lineHeight: '1.5' }}>{explain[min.key].minText}</div>
          </Text>
        </Item>
        <Item>
          <Bullet>•</Bullet>
          <Text>
            <div style={{ fontSize: '20px', marginBottom: '10px' }}>
              <b>{explain[max.key].name}</b>이 높아요!
            </div>
            <div style={{ lineHeight: '1.5' }}>{explain[max.key].maxText}</div>
          </Text>
        </Item>
      </Container>
    </>
  );
};

export default ExplanationSection;
