import { Dialog, DialogActions, DialogContent, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTempScript } from '../../store/actions/soloActions';

export const DeleteModal = ({ open, handleClose, deleteAction }) => {
  const curIndex = useSelector((state) => state.solo.tempScript);

  const dispatch = useDispatch();
  const deleteClickListener = () => {
    dispatch(deleteAction(curIndex.index));
    dispatch(useTempScript(0, { title: '', content: '' }));
    handleClose();
  };
  return (
    <>
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
          <div>스크립트를 삭제하면 해당 스크립트에 </div>
          <div>등록되어 있는 가이드라인도 모두 삭제됩니다.</div>
          <br></br>
          <div>계속 진행하시겠습니까?</div>
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
            onClick={deleteClickListener}
          >
            삭제
          </Button>
          <Button variant='contained' color='neutral' onClick={handleClose}>
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
