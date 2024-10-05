import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { savePreset } from '../../apis/preset';
import { exitRoom, clearRoom } from '../../apis/room';
import { Tooltip, IconButton } from '@mui/material';
import { clearParticipants } from '../../store/actions/participant';
import { clearRoomSession } from '../../store/actions/room';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export const MultiExitModal = ({ leaveSession }) => {
  const multiPreset = useSelector((state) => state.multi);
  const oauthId = useSelector((state) => state.auth.user.oauthId);
  const studyRoomId = useSelector((state) => state.room.roomId);
  const nickname = useSelector((state) => state.auth.user.nickname);
  const hostNickname = useSelector((state) => state.room.hostId);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false); // modal 상태
  console.log(multiPreset);

  const param = {
    oauthId: oauthId,
    presetType: 'multi',
    presetData: multiPreset,
  };

  const saveClickListener = () => {
    dispatch(clearParticipants());
    dispatch(clearRoomSession());
    if (nickname === hostNickname) {
      clearRoom(studyRoomId);
    } else {
      exitRoom(studyRoomId, nickname);
    }
    leaveSession();
    savePreset(
      param,
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    navigate('/');
    handleClose();
  };

  const exitClickListener = () => {
    dispatch(clearParticipants());
    dispatch(clearRoomSession());
    if (nickname === hostNickname) {
      clearRoom(studyRoomId);
    } else {
      exitRoom(studyRoomId, nickname);
    }
    leaveSession();
    navigate('/');
    handleClose();
  };

  const handleExit = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title='회의 나가기' placement='top'>
        <IconButton
          onClick={handleExit}
          id='navLeaveButton'
          style={{
            color: 'white',
            backgroundColor: 'red',
            borderRadius: '5px',
            top: '-2px',
          }}
        >
          <ExitToAppIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            paddingTop: '40px',
          }}
        >
          <div>발표 연습에 사용한 데이터를 저장하시겠습니까?</div>
          <div>저장한 정보는 내 정보에서 확인할 수 있습니다.</div>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '15px',
          }}
        >
          <Button
            variant='contained'
            color='secondary'
            onClick={saveClickListener}
          >
            저장
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={exitClickListener}
          >
            나가기
          </Button>
          <Button variant='contained' color='neutral' onClick={handleClose}>
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
