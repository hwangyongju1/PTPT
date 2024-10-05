export const base64ToBlob = (base64, fileType) => {
  let typeHeader = 'data:application/' + fileType + ';base64,'; // base64 헤더 파일 유형 정의
  let audioSrc = typeHeader + base64;
  let arr = audioSrc.split(',');
  let array = arr[0].match(/:(.*?);/);
  let mime = (array && array.length > 1 ? array[1] : type) || type;
  let bytes = window.atob(arr[1]);
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], {
    type: mime,
  });
};

// Base64 문자열을 ArrayBuffer로 변환
function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// ArrayBuffer를 AudioBuffer로 변환
function arrayBufferToAudioBuffer(arrayBuffer, audioContext) {
  return new Promise((resolve, reject) => {
    audioContext.decodeAudioData(
      arrayBuffer,
      (audioBuffer) => {
        resolve(audioBuffer);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

// 여러 개의 AudioBuffer를 결합
async function concatenateAudioBuffers(audioBuffers, audioContext) {
  if (audioBuffers.length === 0) {
    return null;
  }

  const totalLength = audioBuffers.reduce(
    (sum, buffer) => sum + buffer.length,
    0
  );
  const sampleRate = audioBuffers[0].sampleRate;

  const combinedBuffer = audioContext.createBuffer(
    audioBuffers[0].numberOfChannels,
    totalLength,
    sampleRate
  );

  let offset = 0;
  for (const buffer of audioBuffers) {
    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
      combinedBuffer
        .getChannelData(channel)
        .set(buffer.getChannelData(channel), offset);
    }
    offset += buffer.length;
  }

  return combinedBuffer;
}

// AudioBuffer를 Blob으로 변환
function audioBufferToBlob(audioBuffer, audioContext) {
  return new Promise((resolve, reject) => {
    const numberOfChannels = audioBuffer.numberOfChannels;
    const length = audioBuffer.length * numberOfChannels * 2;
    const arrayBuffer = audioBuffer.getChannelData(0).buffer;

    const wavHeader = createWavHeader({
      sampleRate: audioBuffer.sampleRate,
      bitDepth: 16,
      numberOfChannels: numberOfChannels,
      length: length,
    });

    const wavArrayBuffer = new Uint8Array(
      wavHeader.length + arrayBuffer.byteLength
    );
    wavArrayBuffer.set(new Uint8Array(wavHeader.header), 0);
    wavArrayBuffer.set(new Uint8Array(arrayBuffer), wavHeader.header.length);

    resolve(new Blob([wavArrayBuffer], { type: 'audio/wav' }));
  });
}

// WAV 헤더 생성 (간단한 구현)
function createWavHeader({ sampleRate, bitDepth, numberOfChannels, length }) {
  const header = new ArrayBuffer(44);
  const view = new DataView(header);

  // RIFF identifier
  view.setUint8(0, 'R'.charCodeAt(0));
  view.setUint8(1, 'I'.charCodeAt(0));
  view.setUint8(2, 'F'.charCodeAt(0));
  view.setUint8(3, 'F'.charCodeAt(0));
  view.setUint32(4, 36 + length, true);
  view.setUint8(8, 'W'.charCodeAt(0));
  view.setUint8(9, 'A'.charCodeAt(0));
  view.setUint8(10, 'V'.charCodeAt(0));
  view.setUint8(11, 'E'.charCodeAt(0));
  view.setUint8(12, 'f'.charCodeAt(0));
  view.setUint8(13, 'm'.charCodeAt(0));
  view.setUint8(14, 't'.charCodeAt(0));
  view.setUint8(15, ' '.charCodeAt(0));
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numberOfChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, (sampleRate * numberOfChannels * bitDepth) / 8, true);
  view.setUint16(32, (numberOfChannels * bitDepth) / 8, true);
  view.setUint16(34, bitDepth, true);
  view.setUint8(36, 'd'.charCodeAt(0));
  view.setUint8(37, 'a'.charCodeAt(0));
  view.setUint8(38, 't'.charCodeAt(0));
  view.setUint8(39, 'a'.charCodeAt(0));
  view.setUint32(40, length, true);

  return {
    header: new Uint8Array(header),
    length: header.byteLength,
  };
}

// AudioBuffer를 Base64로 인코딩
async function audioBufferToBase64(audioBuffer, audioContext) {
  return audioBufferToBlob(audioBuffer, audioContext).then((blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  });
}

// Base64 문자열 오디오 파일을 결합하고 Base64로 반환
export async function processBase64Audio(base64Strings) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const audioBuffers = await Promise.all(
    base64Strings.map(async (base64) => {
      const arrayBuffer = base64ToArrayBuffer(base64);
      return arrayBufferToAudioBuffer(arrayBuffer, audioContext);
    })
  );

  const combinedBuffer = await concatenateAudioBuffers(
    audioBuffers,
    audioContext
  );
  const base64String = await audioBufferToBase64(combinedBuffer, audioContext);

  return base64String;
}

// 예제 Base64 문자열 (여기서는 실제 Base64 문자열을 넣어야 함)
// const base64Strings = [
//   'BASE64_STRING_1',
//   'BASE64_STRING_2',
//   // 추가 Base64 문자열들...
// ];

// // 오디오 파일 처리 및 Base64 반환
// processBase64Audio(base64Strings)
//   .then((base64) => {
//     console.log('Combined Audio Base64:', base64);
//   })
//   .catch(console.error);
