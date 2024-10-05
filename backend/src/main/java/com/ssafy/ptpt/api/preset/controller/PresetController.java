package com.ssafy.ptpt.api.preset.controller;

import com.ssafy.ptpt.api.preset.request.PresetCreateRequest;
import com.ssafy.ptpt.api.preset.request.PresetSearchRequest;
import com.ssafy.ptpt.api.preset.response.PresetInfoResponse;
import com.ssafy.ptpt.api.preset.service.PresetService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/preset")
@RequiredArgsConstructor
public class PresetController {

    private final PresetService presetService;


    /**
     *  사용자 식별값 oauthId를 얻어와서 사용자 조회,
     *  presetCreateRequest 값을 저장하는 로직 구현
     */
    @PostMapping()
    @Operation(summary = "프리셋 등록")
    public ResponseEntity<Void> createPreset(@RequestBody PresetCreateRequest presetCreateRequest){
        presetService.savePreset(presetCreateRequest);
        return ResponseEntity.ok().build();

    }

    // 프리셋 전체 조회
    /**
     * 사용자 식별값을 통해 사용자가 저장한 프리셋 리스트를 불러온다 
     */
    @PostMapping("/search")
    @Operation(summary = "프리셋 전체 조회")
    public ResponseEntity<List<PresetInfoResponse>> viewPresetList(@RequestBody PresetSearchRequest presetSearchRequest){
        List<PresetInfoResponse> presetInfoResponses = presetService.viewPresetList(presetSearchRequest);
        return ResponseEntity.ok().body(presetInfoResponses);
    }

    /**
     * 사용자가 전체 조회한 프리셋 중 presetId를 통해 상세 조회를 진행합니다
     */
    @GetMapping("/{presetId}")
    @Operation(summary = "프리셋 상세 조회")
    public ResponseEntity<PresetInfoResponse> viewPreset(@PathVariable("presetId") Long presetId){
        PresetInfoResponse presetInfoResponse = presetService.viewPreset(presetId);
        return ResponseEntity.ok().body(presetInfoResponse);
    }

    @DeleteMapping("/{presetId}")
    @Operation(summary = "프리셋 삭제")
    public ResponseEntity<Void> deletePreset(@PathVariable("presetId") Long presetId){
        int complete = presetService.deletePreset(presetId);
        return complete == 1 ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @PutMapping("/{presetId}")
    @Operation(summary = "프리셋 업데이트")
    public ResponseEntity<Void> updatePreset(@PathVariable("presetId") Long presetId,
                                                @RequestBody Map<String, Object> presetData) {
        try {
            presetService.updatePresetById(presetId, presetData);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

}
