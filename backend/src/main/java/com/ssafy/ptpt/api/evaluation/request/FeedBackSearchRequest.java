package com.ssafy.ptpt.api.evaluation.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeedBackSearchRequest {
    private Long studyRoomId;
    private String oauthId;
}
