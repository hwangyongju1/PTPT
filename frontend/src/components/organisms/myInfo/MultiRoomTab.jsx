import { useState } from 'react';
import { useSelector } from 'react-redux';
import MultiRoomListItem from '../MultiRoomListItem';
import Modal from '../../molecules/RoomCreateModal';
import CreateRoom from '../../../pages/room/CreateRoom';
import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3열로 설정 */
`;

const MultiRoomTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // 선택된 아이템을 관리할 상태
  const savedRoom = useSelector((state) => state.savedRooms.data) || [];
  const multiRoom = savedRoom.filter((preset) => preset.presetType === 'multi');

  const handleModalOpen = (item) => {
    setSelectedItem(item); // 클릭한 아이템을 상태에 저장
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedItem(null); // 모달을 닫을 때 선택된 아이템 초기화
    setIsModalOpen(false);
  };

  return (
    <>
      {multiRoom.length > 0 ? (
        <GridContainer>
          {multiRoom.map((preset) => (
            <MultiRoomListItem
              onClick={() => handleModalOpen(preset.presetData)} // 아이템 클릭 시 모달 열기
              key={preset.presetId}
              item={preset.presetData}
            />
          ))}
        </GridContainer>
      ) : (
        <p>저장한 스터디룸이 없습니다.</p>
      )}
      <Modal open={isModalOpen} onClose={handleModalClose} title='방 생성'>
        <CreateRoom item={selectedItem} onClose={handleModalClose} />
      </Modal>
    </>
  );
};

export default MultiRoomTab;
