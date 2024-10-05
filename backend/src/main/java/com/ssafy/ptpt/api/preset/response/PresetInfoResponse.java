package com.ssafy.ptpt.api.preset.response;

import com.ssafy.ptpt.db.mongo.entity.Preset;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PresetInfoResponse {
    private Long presetId;
    private String presetType;
    private Map<String, Object> presetData;

    public static PresetInfoResponse fromPreset(Preset preset) {
        return new PresetInfoResponse(preset.getPresetId(),
                                        preset.getPresetType(),
                                        preset.getPresetData());
    }
}
