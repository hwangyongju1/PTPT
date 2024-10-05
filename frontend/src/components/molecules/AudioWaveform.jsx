import React, { useRef, useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import PlayIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import PauseIcon from '@mui/icons-material/PauseCircleOutlined';

const AudioWaveform = ({ audioUrl, title }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const handleError = (error) => {
      console.error('WaveSurfer error:', error);
    };

    if (audioUrl && waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#A8DBA8',
        progressColor: '#3B8686',
        height: 100,
        backgroundColor: '#2A363B',
        barWidth: 2,
        barHeight: 1,
        barGap: 3,
        scrollParent: true,
        minPxPerSec: 100,
      });

      wavesurfer.current.on('ready', () => {
        setDuration(wavesurfer.current.getDuration());
      });

      wavesurfer.current.on('audioprocess', () => {
        setCurrentTime(wavesurfer.current.getCurrentTime());
      });

      wavesurfer.current.on('play', () => {
        setIsPlaying(true);
      });

      wavesurfer.current.on('pause', () => {
        setIsPlaying(false);
      });

      wavesurfer.current.on('error', handleError);

      try {
        wavesurfer.current.load(audioUrl);
      } catch (error) {
        console.error('Failed to load audio URL:', error);
      }

      return () => {
        wavesurfer.current.destroy();
      };
    }
  }, [audioUrl]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handlePlayPause = () => {
    wavesurfer.current.playPause();
  };

  return (
    <div style={{ overflowX: 'scroll', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 0px',
          boxSizing: 'border-box',
        }}
      >
        <span style={{ flexShrink: 0, fontWeight: 'bold' }}>{title}</span>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '5px', color: '#696969' }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <button
            onClick={handlePlayPause}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '0px',
            }}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
      </div>
      {audioUrl && (
        <div
          ref={waveformRef}
          style={{
            border: '1px solid lightgray',
            borderRadius: '10px',
            padding: '10px',
            boxSizing: 'border-box',
          }}
        />
      )}
    </div>
  );
};

export default AudioWaveform;
