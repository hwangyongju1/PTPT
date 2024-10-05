// 시간이 되면 자동으로 모달이 뜨도록 구현
// 해당 모달의 start 버튼을 누르면, entryList 등록과 버튼 활성화
    // 버튼 활성화의 경우 연습중이라는 redux 사용
    import React, {useEffect} from 'react';
    import { adminParticipants } from '../../apis/room';
    import { useSelector } from 'react-redux';
    import { useDispatch } from 'react-redux';
    import { isStartPresantation } from '../../store/actions/room';
    import {
      Box,
      Dialog,
      DialogTitle,
      DialogContent,
      DialogActions,
      Button,
      Typography
    } from '@mui/material';
    
    const MultiStartModal = ({ open, onClose }) => {
        useEffect(()=>{
          if(open){
            const timer = setTimeout(() => {
              onClose();
            }, 3000);

          }
        }, [open, onClose]);

        const handleStart = () => {
          onClose();
        }


      return (
        // <Dialog open={open} onClose={onClose}> 
        //   <DialogTitle>연습을 시작하겠습니까?</DialogTitle>
        //   <DialogContent>3초뒤 자동으로 닫힙니다</DialogContent>
        //   <DialogActions>
        //   <Button
        //     variant='contained'
        //     color='secondary'
        //     onClick={handleStart}
        //   >
        //     시작
        //   </Button>
        //   </DialogActions>
        // </Dialog>
        <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h6">연습을 시작하겠습니까?</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">3초 뒤 자동으로 닫힙니다</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleStart}
        >
          시작
        </Button>
      </DialogActions>
    </Dialog>
      );
    };
    
    export default MultiStartModal;