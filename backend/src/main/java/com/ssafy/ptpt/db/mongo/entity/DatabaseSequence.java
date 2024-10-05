package com.ssafy.ptpt.db.mongo.entity;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "database_sequences")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DatabaseSequence {
    @Id
    private String id;

    private long seq;
}
