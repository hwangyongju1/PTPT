import { Button } from '@mui/material';
import { textToSpeechApi } from '../apis/voice';
import AudioWaveform from '../components/molecules/AudioWaveform';
import { useState } from 'react';

const VoiceTestPage = () => {
  // params로 받아야하는 값
  // voice -> name
  // input -> text
  // audioConfig -> pitch, speakingRate
  const [url, setUrl] = useState();
  const param = {
    voice: {
      languageCode: 'ko-KR',
      name: 'ko-KR-Wavenet-A',
    },
    input: {
      text: '네 안녕하세요 발표 시작하도록 하겠습니다',
    },
    audioConfig: {
      audioEncoding: 'linear16',
      pitch: 0,
      speakingRate: 1,
    },
  };
  const textToSpeeach = () => {
    textToSpeechApi(
      param,
      ({ data }) => {
        // audioContet는 base64로 인코딩된 문자열을 반환함
        console.log(data);
        // data를 바로 서버로 업로드
        // 서버에서 data -> wav 파일로 변환 후 업로드
        var audioFile = new Audio();
        let audioBlob = base64ToBlob(data.audioContent, 'wav');
        audioFile.src = window.URL.createObjectURL(audioBlob);
        console.log(audioFile.src);
        setUrl(audioFile.src);
        audioFile.playbackRate = 1; //재생속도
        audioFile.play();
        downloadURI(audioFile.src, 'audio.wav');
      },
      (res) => {
        console.log(res);
      }
    );
  };

  const base64ToBlob = (base64, fileType) => {
    let typeHeader = 'data:application/' + fileType + ';base64,'; // base64 헤더 파일 유형 정의
    let audioSrc = typeHeader + base64;
    let arr = audioSrc.split(',');
    let array = arr[0].match(/:(.*?);/);
    let mime = (array && array.length > 1 ? array[1] : type) || type;
    // url헤더 제거하고 btye로 변환
    let bytes = window.atob(arr[1]);
    // 예외를 처리하고 0보다 작은 ASCII 코드를 0보다 큰 값으로 변환
    let ab = new ArrayBuffer(bytes.length);
    // 뷰 생성(메모리에 직접): 8비트 부호 없는 정수, 길이 1바이트
    let ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], {
      type: mime,
    });
  };

  const downloadURI = (uri, name) => {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // delete link;
  };

  return (
    <>
      <Button
        onClick={() => {
          textToSpeeach();
        }}
        variant='outlined'
        disableElevation
        color='primary'
      >
        실행
      </Button>

      <AudioWaveform audioUrl={url} />
    </>
  );
};

export default VoiceTestPage;
