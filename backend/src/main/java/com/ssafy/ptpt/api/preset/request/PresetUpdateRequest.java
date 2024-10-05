package com.ssafy.ptpt.api.preset.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PresetUpdateRequest {
    private Long presetId;
    private Map<String, Object> presetData;
}
