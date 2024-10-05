import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';
import { reportParticipants, assignationParticipants } from '../../apis/room';

const hostOptions = ['발표자 지정', '신고'];
const myOptions = [''];
const otherOptions = ['신고'];

const ITEM_HEIGHT = 48;

export default function CustomOption({ participant }) {
  // const userId = useSelector((state) => state.user.userId);
  const nickname = useSelector((state) => state.auth.user.nickname); // 내 닉네임
  const studyRoomId = useSelector((state) => state.room.roomId);
  //   const userId = 'OpenVidu_User48';
  const hostId = useSelector((state) => state.room.hostId);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // host인지 구분
  // host 이면 신고와 지정
  // 내 option은 없고, 타인의 option을 클릭하면 신고 기능
  var options = null;
  if (nickname === hostId) {
    options = hostOptions;
  } else {
    options = participant === nickname ? myOptions : otherOptions;
  }
  // const options = hostOptions;

  const onHandleOption = (option, person) => {
    if (option === '발표자 지정') {
      console.log('발표자 지정 호출');
      //   reportParticipants -> nickname
      // oauthId로 post할 수 없음 -> 신고자는 상대방의 oauthId를 알 수 없다
      assignationParticipants(studyRoomId, person);
    } else if (option === '신고') {
      console.log('신고');
      //assignationParticipants -> studyroomId, nickname
      reportParticipants(person);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => { 
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='long-menu'
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={() => {
              onHandleOption(option, participant);
              console.log(`${option} clicked for ${participant}`);
              handleClose();
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
