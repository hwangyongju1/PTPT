import React, { useRef, useState } from 'react';
import { Button, Box, Divider } from '@mui/material';
import CustomSelect from '../../molecules/CustomSelect';
import CustomSlider from '../../molecules/CustomSlider';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import { base64ToBlob } from '../../../hooks/voice';
import { textToSpeechApi, uploadAudioApi } from '../../../apis/voice';
import { registerGuideline } from '../../../store/actions/soloActions';

const VoiceTab = () => {
  const dispatch = useDispatch();
  const [selectedVoiceModel, setSelectedVoiceModel] = useState(0);
  const [additionalVoice, setAdditionalVoice] = useState(0);
  const [loading, setLoading] = useState(false);
  let soloPreset = useSelector((state) => state.solo);
  let scriptIdx = 0;
  const additionalSetting = [
    '여성(고음)',
    '여성(저음)',
    '남성(저음)',
    '남성(고음)',
  ];
  const param = {
    voice: {
      languageCode: 'ko-KR',
      name: '',
    },
    input: {
      text: '',
    },
    audioConfig: {
      audioEncoding: 'linear16',
      pitch: 0,
      speakingRate: 1,
    },
  };
  const voiceSetting = useRef({
    model: 0,
    speed: 1,
    tone: 0,
  });

  const uploadAudio = (audioContent) => {
    return new Promise((resolve, reject) => {
      const now = new Date();
      const timestamp = now
        .toISOString()
        .replace(/[^0-9]/g, '')
        .slice(0, 14);

      const audioBlob = base64ToBlob(audioContent, 'wav');
      const formData = new FormData();
      formData.append('audio', audioBlob, `audio_${timestamp}.wav`);
      formData.append('fileName', soloPreset.voiceModel[4]);

      uploadAudioApi(
        formData,
        ({ data }) => {
          console.log('성공');
          resolve(data); // Promise를 성공으로 마치고 resultAudioBlob을 반환
        },
        () => {
          console.log('실패');
          reject('업로드 실패'); // Promise를 실패로 마침
        }
      );
    });
  };

  const textToSpeech = (registerFlag) => {
    setLoading(true);
    const text = soloPreset.script[scriptIdx].content;
    param.voice.name = soloPreset.voiceModel[voiceSetting.current.model];
    param.audioConfig.pitch = voiceSetting.current.tone;
    param.audioConfig.speakingRate = voiceSetting.current.speed;

    param.input.text = registerFlag
      ? text
      : text.length <= 100
        ? text
        : text.substring(0, 100);

    // 내 음성모델을 고른 경우
    if (voiceSetting.current.model === 4) {
      // 성별, 높낮이에 따라 음성 선택해야 함.
      console.log('내 음성모델 선택');
      param.voice.name = soloPreset.voiceModel[additionalVoice];
    }

    textToSpeechApi(
      param,
      ({ data }) => {
        if (registerFlag) {
          // 가이드라인 등록
          if (voiceSetting.current.model === 4) {
            uploadAudio(data.audioContent)
              .then((base64) => {
                console.log(base64);
                dispatch(
                  registerGuideline(scriptIdx, base64, voiceSetting.current)
                );
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            dispatch(
              registerGuideline(
                scriptIdx,
                data.audioContent,
                voiceSetting.current
              )
            );
          }
          console.log('가이드라인 등록 완');
        } else {
          // 가이드라인 재생
          if (voiceSetting.current.model === 4) {
            uploadAudio(data.audioContent)
              .then((base64) => {
                console.log(base64);
                var audioFile = new Audio();
                audioFile.src = base64;
                audioFile.play();
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            let audioBlob = base64ToBlob(data.audioContent, 'wav');
            var audioFile = new Audio();
            audioFile.src = window.URL.createObjectURL(audioBlob);
            audioFile.play();
          }
        }
        setLoading(false);
      },
      (res) => {
        console.log(res.response.data.error);
      }
    );
  };

  return (
    <>
      <CustomSelect
        label='음성모델 선택'
        options={soloPreset.voiceModel.map((item, index) => ({
          value: index,
          label: item,
        }))}
        onChange={(value) => {
          voiceSetting.current.model = value;
          setSelectedVoiceModel(value); // 음성모델 선택 시 상태 업데이트
        }}
      />
      {selectedVoiceModel === 4 && (
        <CustomSelect
          label='추가 음성 설정'
          options={additionalSetting.map((item, index) => ({
            value: index,
            label: item,
          }))}
          onChange={(value) => {
            setAdditionalVoice(value);
          }}
          style={{ marginTop: '10px' }}
        />
      )}
      <CustomSelect
        label='스크립트 선택'
        options={soloPreset.script.map((item, index) => ({
          value: index,
          label: item.title,
        }))}
        onChange={(value) => {
          scriptIdx = value;
        }}
        style={{ marginTop: '10px' }}
      />
      <Divider style={{ margin: '20px 0px' }} />
      <div style={{ fontSize: '17px', marginBottom: '10px' }}>톤 조정</div>
      <CustomSlider
        defaultValue={0}
        min={-20}
        max={20}
        handleChange={(event, newValue) => {
          voiceSetting.current.tone = newValue;
        }}
        labels={['낮음', '보통', '높음']}
      ></CustomSlider>

      <div
        style={{
          fontWeight: 'bold',
          marginTop: '25px',
          marginBottom: '10px',
          fontSize: '17px',
        }}
      >
        속도 조정
      </div>
      <CustomSlider
        defaultValue={1}
        step={0.01}
        min={0.25}
        max={2}
        handleChange={(event, newValue) => {
          voiceSetting.current.speed = newValue;
        }}
        labels={['느림', '', '빠름']}
      ></CustomSlider>

      <br></br>
      <Box
        display='flex'
        justifyContent='space-evenly'
        sx={{ paddingTop: '15px' }}
      >
        <Button
          variant='contained'
          color='secondary'
          onClick={() => textToSpeech(false)}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color='inherit' /> : '▶ 재생'}
        </Button>
        <Button
          onClick={() => {
            textToSpeech(true);
          }}
          variant='contained'
          color='secondary'
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color='inherit' /> : '등록'}
        </Button>
      </Box>
    </>
  );
};

export default VoiceTab;
