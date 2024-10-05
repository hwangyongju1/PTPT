import React, { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { useDispatch, useSelector } from 'react-redux';
import { registerPresentationSheet } from '../../../store/actions/soloActions';

const PresentationMain = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [containerHeight, setContainerHeight] = useState(
    window.innerHeight - 180
  ); // 초기 높이 계산
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setContainerHeight(window.innerHeight - 180); // 상단바 64px, 하단바 60px 제외
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(URL.createObjectURL(file));
      setError(null);
    } else {
      setSelectedFile(null);
      setError('PDF 파일만 업로드할 수 있습니다.');
    }
  };
  return (
    <>
      {selectedFile ? (
        <Box sx={{ height: `${containerHeight}px` }}>
          <Worker
            workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.min.js`}
          >
            <Viewer
              fileUrl={selectedFile}
              plugins={[defaultLayoutPluginInstance]}
            />
          </Worker>
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <input
            accept='application/pdf'
            style={{ display: 'none' }}
            id='upload-file'
            type='file'
            onChange={handleFileChange}
          />
          <label htmlFor='upload-file'>
            <Button variant='contained' component='span'>
              파일 선택
            </Button>
          </label>
          {error && (
            <Box sx={{ mt: 2 }}>
              <Alert severity='error'>{error}</Alert>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default PresentationMain;
