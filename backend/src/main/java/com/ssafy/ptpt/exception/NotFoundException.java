package com.ssafy.ptpt.exception;

public class NotFoundException extends RuntimeException {
    public static final String MEMBER_NOT_FOUND = "존재하지 않는 회원입니다.";
    public static final String STUDY_ROOM_NOT_FOUND = "존재하지 않는 방정보 입니다.";
    public static final String EVALUATION_NOT_FOUND = "존재하지 않는 평가 입니다.";
    public NotFoundException(String message) {
        super(message);
    }
}
