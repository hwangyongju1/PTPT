import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSavedRooms } from '../../../store/actions/savedRoomActions';
import { getPresetList } from '../../../apis/preset';
import SoloRoomTab from './SoloRoomTab';
import MultiRoomTab from './MultiRoomTab';

const SavedRoomsPage = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState('alone'); // 선택된 옵션 상태
  const oauthId = useSelector((state) => state.auth.oauthId); // 사용자 ID 가져오기
  const savedRooms = useSelector((state) => state.savedRooms); // Redux 상태에서 저장된 스터디룸 가져오기

  useEffect(() => {
    const fetchPresetList = async () => {
      try {
        const response = await getPresetList({ oauthId });
        console.log(response.data);
        dispatch(setSavedRooms(response.data));
        console.log(savedRooms);
      } catch (err) {
        console.log(err);
      }
    };

    console.log(oauthId);
    fetchPresetList();
  }, [oauthId]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <h2>저장한 스터디룸</h2>

      {/* 옵션 선택 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '20px',
        }}
      >
        <span
          style={{
            cursor: 'pointer',
            fontWeight: selectedOption === 'alone' ? 'bold' : 'normal',
            marginRight: '10px',
          }}
          onClick={() => handleOptionChange('alone')}
        >
          혼자하기
        </span>
        |
        <span
          style={{
            cursor: 'pointer',
            fontWeight: selectedOption === 'together' ? 'bold' : 'normal',
            marginLeft: '10px',
          }}
          onClick={() => handleOptionChange('together')}
        >
          같이하기
        </span>
      </div>

      {selectedOption === 'together' && <MultiRoomTab />}
      {selectedOption === 'alone' && <SoloRoomTab />}
    </div>
  );
};

export default SavedRoomsPage;
