import React from 'react';
import { Switch, Box, Typography } from '@mui/material';

const SettingTab = () => {
  return (
    <Box>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        mb={2}
      >
        화면 녹화 <Switch />
      </Box>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        AI 예상 질문 <Switch />
      </Box>
    </Box>
  );
};

export default SettingTab;
