import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useState } from 'react';
import RoomListItem from '../components/organisms/RoomListItem';
import { searchByStudyRoomName } from '../apis/room';
import styled from 'styled-components';
import { loadRoomList } from '../apis/room';
import {
  Button,
  TextField,
  Typography,
  Pagination,
  Stack,
} from '@mui/material';
import CreateRoom from './room/CreateRoom';
import Modal from '../components/molecules/RoomCreateModal';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; // MUI 아이콘 사용 시

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1; /* 남은 공간을 차지하게 함 */
  gap: 16px;
`;

const RecommendInnerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 260px;
  margin-top: 20px;
  margin-bottom: 50px;
  justify-content: center;
  width: 100%;
  background-color: ${(props) => props.backgroundcolor};
`;

const RoomListPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onLoadRoomList();
  }, []); // 빈 배열을 추가하여 useEffect가 처음 렌더링될 때 한 번만 실행되도록 설정

  const [currentList, setCurrentList] = useState([]);
  const [searchList, setSearchList] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchType, setSearchType] = useState('roomname'); // 검색 유형 상태
  const [searchName, setSearchName] = useState(''); // 검색어 상태
  const [selectedTopics, setSelectedTopics] = useState([]); // 선택된 주제 상태
  // page 처리 -> size와 sort도 선택을 원하면 추가
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const onLoadRoomList = async () => {
    const response = await loadRoomList(page - 1);
    console.log(response);
    setCurrentList([...response.data.content]);
    setTotalPage(response.data.totalPages);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSearch = async () => {
    if (searchType === 'roomname') {
      // 제목으로 찾기
      setPage(1);
      const response = await searchByStudyRoomName(searchName, page - 1);
      setTotalPage(response.data.totalPages);
      setSearchList([...response.data.content]);
      // response 보고 수정하기
    } else if (searchType === 'subject') {
      // 주제로 찾기
      console.log(selectedTopics);
    }
  };

  const handleChange = async (event, value) => {
    setPage(value);
    const response = await loadRoomList(value - 1);
    setCurrentList([...response.data.content]);
  };

  return (
    <>
      <div>
        <div style={{ padding: '0px 230px' }}>
          <h2>스터디룸 목록</h2>
          <SearchContainer>
            <CenterContainer>
              <TextField
                value={searchName}
                size='small'
                onChange={(e) => setSearchName(e.target.value)}
                sx={{
                  minWidth: 300,
                  height: 40, // 높이 맞춤
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#c4c4c4', // 기본 border 색상
                    },
                    '&:hover fieldset': {
                      borderColor: '#c4c4c4', // hover 시 border 색상
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#c4c4c4', // 포커스 시 border 색상
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                variant='contained'
                color='secondary'
                onClick={handleSearch}
              >
                검색
              </Button>
            </CenterContainer>

            <Button
              onClick={handleModalOpen}
              variant='contained'
              color='secondary'
            >
              방 만들기
            </Button>
          </SearchContainer>
          <div>
            <Modal
              open={isModalOpen}
              onClose={handleModalClose}
              title='방 생성'
            >
              <CreateRoom onClose={handleModalClose} />
            </Modal>
          </div>
          <RecommendInnerWrapper>
            {searchList.length > 0 ? (
              searchList.map((room, index) => (
                <RoomListItem {...room} key={index} />
              ))
            ) : currentList.length === 0 ? (
              <Typography>생성된 방이 없습니다</Typography>
            ) : (
              currentList.map((room, index) => (
                <RoomListItem {...room} key={index} />
              ))
            )}
          </RecommendInnerWrapper>
        </div>
        <div>
          <Stack
            spacing={2}
            alignItems='center' // 가운데 정렬
            justifyContent='center' // 가운데 정렬
            sx={{ marginTop: '20px', marginBottom: '20px' }}
          >
            <Pagination count={totalPage} page={page} onChange={handleChange} />
          </Stack>
        </div>
      </div>
    </>
  );
};

export default RoomListPage;
