import React, { useState, useRef } from 'react';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { registerVoicerecord } from '../../store/actions/soloActions';

const AudioRecorder = () => {
  const dispatch = useDispatch();
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [audioStream, setAudioStream] = useState(null);

  function getCurrentTimeFormatted() {
    const now = new Date();

    const year = String(now.getFullYear()).slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0'); // getMonth()는 0부터 시작하므로 1을 더함
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}`;
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          const reader = new FileReader();
          reader.readAsDataURL(event.data);
          reader.onloadend = () => {
            const title = getCurrentTimeFormatted();
            dispatch(registerVoicerecord(title, reader.result));
            console.log('Base64 Audio Data:', reader.result);
          };
        }
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error('Error accessing audio media:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop()); // Stop the stream
      setRecording(false);
      setAudioStream(null);
    }
  };

  return (
    <Button
      variant='contained'
      color={recording ? 'secondary' : 'primary'}
      onClick={recording ? stopRecording : startRecording}
    >
      {recording ? '발표 중지' : '발표 시작'}
    </Button>
  );
};

export default AudioRecorder;
