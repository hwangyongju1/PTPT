import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, List, Slider, Typography } from '@mui/material';
import PlayIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import PauseIcon from '@mui/icons-material/PauseCircleOutlined';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import DropdownMenu from '../atoms/DropdownMenu';
import { useSelector } from 'react-redux';
import { base64ToBlob } from '../../hooks/voice';
import AudioRecorder from './AudioRecorder';
import { ExitModal } from './SoloExitModal';
import ListIcon from '@mui/icons-material/List';

const BottomBar = () => {
  const audioRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [audioSrc, setAudioSrc] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSliderHovered, setIsSliderHovered] = useState(false);
  const script = useSelector((state) => state.solo.script);
  const guideline = script.filter((item) => item.guideline && item.title);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const audio = audioRef.current;

    const handleLoadedData = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (audioSrc) {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [audioSrc]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (event, newValue) => {
    const audio = audioRef.current;
    audio.currentTime = newValue;
    setCurrentTime(newValue);
  };

  const handleSeek = (seconds) => {
    const audio = audioRef.current;
    audio.currentTime = Math.max(0, Math.min(duration, currentTime + seconds));
    setCurrentTime(audio.currentTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '60px',
      }}
    >
      <Slider
        value={currentTime}
        max={duration}
        onChange={handleSliderChange}
        onMouseEnter={() => setIsSliderHovered(true)}
        onMouseLeave={() => setIsSliderHovered(false)}
        sx={{
          padding: '0px',
          width: '100%',
          marginBottom: '5px',
          '& .MuiSlider-thumb': {
            width: 10,
            height: 10,
            opacity: isSliderHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            '&:hover': {
              opacity: 1,
            },
          },
          '& .MuiSlider-track': {
            borderRadius: 2,
          },
          '& .MuiSlider-rail': {
            borderRadius: 2,
          },
        }}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Left: DropdownMenu */}
        <Box sx={{ flexGrow: 0 }}>
          <DropdownMenu
            info='가이드라인 선택'
            Icon={ListIcon}
            options={guideline.map((item) => ({
              value: item.guideline,
              label: item.title,
            }))}
            onSelect={(src) => {
              if (!src.startsWith('http')) {
                let audioBlob = base64ToBlob(src, 'wav');
                setAudioSrc(window.URL.createObjectURL(audioBlob));
              } else {
                setAudioSrc(src);
              }
            }}
          />
        </Box>

        {/* Center: Playback Controls */}
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            onClick={() => handleSeek(-10)}
            sx={{ minWidth: '40px', mr: 1 }}
          >
            <FastRewindIcon />
          </Button>
          <Button onClick={handlePlayPause} sx={{ minWidth: '40px' }}>
            {isPlaying ? (
              <PauseIcon sx={{ fontSize: 30 }} />
            ) : (
              <PlayIcon sx={{ fontSize: 30 }} />
            )}
          </Button>
          <Typography variant='body2' sx={{ ml: 2, color: '#646464' }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </Typography>
          <Button
            onClick={() => handleSeek(10)}
            sx={{ minWidth: '40px', ml: 1 }}
          >
            <FastForwardIcon />
          </Button>
        </Box>

        {/* Right: Additional Buttons */}
        <Box
          sx={{ flexGrow: 0, display: 'flex', gap: '10px', marginRight: '5px' }}
        >
          <AudioRecorder />
          <Button variant='contained' color='error' onClick={handleClickOpen}>
            나가기
          </Button>
        </Box>
      </Box>
      <audio ref={audioRef} src={audioSrc} />
      <ExitModal open={open} handleClose={handleClose} />
    </Box>
  );
};

export default BottomBar;
