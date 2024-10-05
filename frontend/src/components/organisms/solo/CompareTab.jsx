import React, { useState } from 'react';
import CustomSelect from '../../molecules/CustomSelect';
import { useSelector } from 'react-redux';
import AudioWaveform from '../../molecules/AudioWaveform';
import { base64ToBlob } from '../../../hooks/voice';

const CompareTab = () => {
  let soloPreset = useSelector((state) => state.solo);
  const guideline = soloPreset.script.filter(
    (item) => item.guideline && item.title
  );
  console.log(guideline);
  console.log(soloPreset);
  const [guide, setGuide] = useState();
  const [voiceRecord, setVoiceRecord] = useState();
  return (
    <>
      <CustomSelect
        label='가이드라인 선택'
        options={guideline.map((item) => ({
          value: item.guideline,
          label: item.title,
        }))}
        onChange={(src) => {
          if (!src.startsWith('http')) {
            let audioBlob = base64ToBlob(src, 'wav');
            setGuide(window.URL.createObjectURL(audioBlob));
          } else {
            setGuide(src);
          }
        }}
      />
      <CustomSelect
        label='녹음본 선택'
        options={soloPreset.voiceRecord.map((item) => ({
          value: item.data,
          label: item.title,
        }))}
        onChange={(value) => {
          setVoiceRecord(value);
        }}
        style={{ margin: '10px 0px' }}
      />
      <AudioWaveform title={'가이드라인'} audioUrl={guide} />
      <AudioWaveform title={'내 녹음본'} audioUrl={voiceRecord} />
    </>
  );
};

export default CompareTab;
