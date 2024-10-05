package com.ssafy.ptpt.db.mongo.service;

import com.ssafy.ptpt.db.mongo.entity.Preset;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class PresetModelListener extends AbstractMongoEventListener<Preset>  {

    private final SequenceGeneratorService sequenceGeneratorService;

    @Override
    public void onBeforeConvert(BeforeConvertEvent<Preset> event) {
        Preset preset = event.getSource();
        if (shouldGenerateNewId(preset)) {
            preset.setPresetId(generateNewId());
        }
    }

    private boolean shouldGenerateNewId(Preset preset) {
        return Optional.ofNullable(preset.getPresetId()).orElse(0L) < 1;
    }

    private Long generateNewId() {
        return sequenceGeneratorService.generateSequence(Preset.SEQUENCE_NAME);
    }
}
