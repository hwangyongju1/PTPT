import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { detailStudyRoom } from '../../apis/room';
import { setRoomSession } from '../../store/actions/room';
import { useMatch } from 'react-router-dom';

const RoomDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 주소의 파라미터값 가져오기
  const match = useMatch('/room/:roomId');

  const [roomInfo, setRoomInfo] = useState(null);

  const onRoomDetail = async () => {
    // console.log('match : ' + match.params.roomId);
    const response = await detailStudyRoom(match.params.roomId);
    console.log('room detail');
    console.log(response);
    setRoomInfo(response);
  };

  // 방에 입장하기 위한 세션 정보
  useEffect(() => {
    const onHandleEnterRoom = async () => {
      await onRoomDetail();
    };

    onHandleEnterRoom();
  }, [match.params.roomId]); // 의존성 배열에 roomId 추가

  useEffect(() => {
    if (roomInfo) {
      const sessionData = {
        sessionName: `Session${roomInfo.studyRoomId}`,
        roomId: roomInfo.studyRoomId,
      };
      console.log('roominfo : ', roomInfo);
      dispatch(setRoomSession(sessionData));
      navigate('/room/detail');
    }
  }, [roomInfo, dispatch, navigate]); // roomInfo가 업데이트될 때만 실행

  return (
    <div>
      {/* roomInfo가 존재할 때만 렌더링 */}
      {roomInfo && (
        <div>
          <h1>Room Detail</h1>
          <p>Room Name: {roomInfo.studyRoomName}</p>
          {/* 다른 방의 정보 추가 */}
        </div>
      )}
    </div>
  );
};

export default RoomDetail;
