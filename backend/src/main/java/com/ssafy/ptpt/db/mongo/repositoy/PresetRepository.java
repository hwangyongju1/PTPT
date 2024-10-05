package com.ssafy.ptpt.db.mongo.repositoy;

import com.ssafy.ptpt.db.mongo.entity.Preset;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PresetRepository extends MongoRepository<Preset, String> {
    List<Preset> findByMemberId(Long memberId);
    Preset findByPresetId(Long presetId);
    int deleteByPresetId(Long presetId);

}