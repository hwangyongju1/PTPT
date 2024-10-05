import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { savePreset, modifyPreset } from '../../apis/preset';
import styled from 'styled-components';

export const ExitModal = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const soloPreset = useSelector((state) => state.solo);
  const oauthId = useSelector((state) => state.auth.user.oauthId);
  const [title, setTitle] = useState(''); // 제목을 입력받기 위한 state

  useEffect(() => {
    if (soloPreset.title) setTitle(soloPreset.title);
  }, [soloPreset]);

  console.log(soloPreset);
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요, 2자리 맞추기
  const date = String(now.getDate()).padStart(2, '0'); // 2자리 맞추기
  const createdTime = `${year}-${month}-${date}`;

  const presetData = {
    title: title || '제목', // 사용자가 입력한 제목
    createdTime: createdTime,
    isCompleted: false,
    script: soloPreset.script.map(({ guideline, ...rest }) => rest),
  };

  const param = {
    oauthId: oauthId,
    presetType: 'solo',
    presetData: presetData,
  };

  const saveClickListener = () => {
    if (soloPreset.presetId) {
      // 수정
      modifyPreset(
        soloPreset.presetId,
        param,
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      savePreset(
        param,
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    navigate('/');
    handleClose();
  };

  const exitClickListener = () => {
    navigate('/');
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
          <div style={{ marginBottom: '5px' }}>
            발표 연습에 사용한 데이터를 저장하시겠습니까?
          </div>
          <div>저장한 정보는 내 정보에서 확인할 수 있습니다.</div>
          <StyledInput
            type='text'
            placeholder='제목을 입력하세요'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
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

// Styled Component for the input
const StyledInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px 12px;
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
  box-sizing: border-box;
  font-size: 16px;

  &::placeholder {
    color: #888;
  }

  &:focus {
    border-color: #999;
    outline: none;
  }
`;
