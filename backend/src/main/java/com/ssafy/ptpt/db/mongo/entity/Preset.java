package com.ssafy.ptpt.db.mongo.entity;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Map;

@Getter
@Setter
@Document(collection  = "preset")
@ToString
@NoArgsConstructor
public class Preset {

    @Transient
    public static final String SEQUENCE_NAME = "preset_sequence";

    @Id
    private Long presetId;

    // solo or multi
    @Field
    private Long memberId;

    // solo or multi
    @Field
    private String presetType;

    @Field(name = "preset_data")
    private Map<String, Object> presetData;

    public Preset(Long memberId, String presetType, Map<String, Object> presetData) {
        this.memberId = memberId;
        this.presetType = presetType;
        this.presetData = presetData;
    }
}