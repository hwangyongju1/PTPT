import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from '../../../apis/auth';
import { trainModelApi } from '../../../apis/voice';
import { setLoading } from '../../../store/actions/voiceModelActions';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Input,
} from '@mui/material';

const VoiceModelPage = () => {
  const dispatch = useDispatch();
  const oauthId = useSelector((state) => state.auth.user.oauthId);
  const loading = useSelector((state) => state.voiceModel.loading);
  const [file, setFile] = useState(null);
  const [voiceModelCreated, setVoiceModelCreated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getProfile(oauthId);
        setVoiceModelCreated(profile.voiceModelCreated);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchData();
  }, [oauthId]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (file) {
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append('oauthId', oauthId);
      formData.append('audio', file);
      trainModelApi(
        formData,
        (res) => {
          console.log(res);
          setVoiceModelCreated(true);
          dispatch(setLoading(false));
        },
        (err) => {
          console.log(err);
          dispatch(setLoading(false)); // 로딩 종료
        }
      );
    }
  };

  return (
    <Box>
      <h2>음성 모델</h2>
      {voiceModelCreated ? (
        <Typography variant='body1'>
          음성 모델이 등록되었습니다! <br />내 목소리로 가이드라인을
          만들어보세요!
        </Typography>
      ) : (
        <Typography variant='body1'>
          자신의 목소리가 담긴 음성 파일을 업로드 해주세요. <br />
          음성 파일의 길이는 <b>약 10분</b>을 권장하며, <br />
          음성 모델 학습에는 <b>10분 이상</b> 소요됩니다.
        </Typography>
      )}
      <Box sx={{ marginTop: 2 }}>
        {/* 파일 입력 필드 */}
        <Box sx={{ marginBottom: 2 }}>
          <Input type='file' onChange={handleFileChange} />
        </Box>
        {/* 버튼 */}
        <Button
          variant='contained'
          color='secondary'
          onClick={handleFileUpload}
          disabled={loading}
        >
          {loading ? '생성중...' : '음성 모델 생성'}
        </Button>
        {loading && (
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
            <CircularProgress size={24} sx={{ marginRight: 2 }} />
            <Typography variant='body2'>Loading...</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default VoiceModelPage;
