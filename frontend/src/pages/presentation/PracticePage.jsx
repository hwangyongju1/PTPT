import React from 'react';
import PracticeOption from '../../components/organisms/PracticeOption';

const PracticePage = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 100px)',
      }}
    >
      <PracticeOption />
    </div>
  );
};

export default PracticePage;
