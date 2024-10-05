package com.ssafy.ptpt.exception;

public class NotMatchException extends RuntimeException{
    public static final String MEMBER_NOT_MATCH = "회원의 정보가 일치하지 않습니다.";
    public static final String PW_NOT_MATCH = "비밀번호가 일치하지 않습니다.";
    public static final String EVALUATION_NOT_MATCH = "평가가 일치하지 않습니다.";

    public NotMatchException(String message) {
        super(message);
    }
}
