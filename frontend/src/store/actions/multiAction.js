import { SAVE_MULTI_PRESET } from '../types/multiTypes';

export const saveMultiPreset = (preset) => ({
  type: SAVE_MULTI_PRESET,
  payload: preset,
});
