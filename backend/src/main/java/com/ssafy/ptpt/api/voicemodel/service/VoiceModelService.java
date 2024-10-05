package com.ssafy.ptpt.api.voicemodel.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.ssafy.ptpt.db.jpa.entity.Member;
import com.ssafy.ptpt.db.jpa.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

@Service
@RequiredArgsConstructor
public class VoiceModelService {

    private final WebClient webClient;
    private final ObjectMapper objectMapper;
    private final MemberRepository memberRepository;

    @Value("${external.api.convert}")
    private String CONVERT;

    @Value("${external.api.select}")
    private String SELECT;

    @Value("${external.api.upload}")
    private String UPLOAD;

    @Value("${external.api.preprocess}")
    private String PREPROCESS;
    @Value("${external.api.extract}")
    private String EXTRACT;
    @Value("${external.api.train}")
    private String TRAIN;


    @Autowired
    public VoiceModelService(WebClient.Builder webClientBuilder, ObjectMapper objectMapper, MemberRepository memberRepository) {
        this.webClient = webClientBuilder.build();
        this.objectMapper = objectMapper;
        this.memberRepository = memberRepository;
    }

    public Mono<String> trainPreprocess(String audioPath, String vmName) {
        // JSON 객체 생성
        ObjectNode jsonObject = objectMapper.createObjectNode();
        ArrayNode jsonArray = objectMapper.createArrayNode();
        jsonArray.add(audioPath);
        jsonArray.add(vmName);
        jsonArray.add("40k");
        jsonArray.add(64);
        jsonObject.set("data", jsonArray);

        return webClient.post()
                .uri(PREPROCESS)
                .bodyValue(jsonObject)
                .retrieve()
                .bodyToMono(String.class);
    }

    public Mono<String> extractFeature(String vmName) {
        // JSON 객체 생성
        ObjectNode jsonObject = objectMapper.createObjectNode();
        ArrayNode jsonArray = objectMapper.createArrayNode();
        jsonArray.add("4");
        jsonArray.add(64);
        jsonArray.add("rmvpe_gpu");
        jsonArray.add("true");
        jsonArray.add(vmName);
        jsonArray.add("v2");
        jsonArray.add("4");
        jsonObject.set("data", jsonArray);

        return webClient.post()
                .uri(EXTRACT)
                .bodyValue(jsonObject)
                .retrieve()
                .bodyToMono(String.class);
    }

    public Mono<String> train(String vmName) {
        // JSON 객체 생성
        ObjectNode jsonObject = objectMapper.createObjectNode();
        ArrayNode jsonArray = objectMapper.createArrayNode();
        jsonArray.add(vmName);
        jsonArray.add("40k");
        jsonArray.add("ture");
        jsonArray.add(0);
        jsonArray.add(30);
        jsonArray.add(20);
        jsonArray.add(3);
        jsonArray.add("Yes");
        jsonArray.add("assets/pretrained_v2/f0G40k.pth");
        jsonArray.add("assets/pretrained_v2/f0D40k.pth");
        jsonArray.add("4");
        jsonArray.add("Yes");
        jsonArray.add("Yes");
        jsonArray.add("v2");
        jsonObject.set("data", jsonArray);

        return webClient.post()
                .uri(TRAIN)
                .bodyValue(jsonObject)
                .retrieve()
                .bodyToMono(String.class);
    }

    public Mono<String> uploadAudioFile(String audioPath, boolean trainFlag) {
        String resultPath = "https://i11b207.p.ssafy.io" + audioPath.substring(audioPath.indexOf("/uploads"));
        System.out.println("uploadAudioFile: " + resultPath);
        // JSON 객체 생성
        ObjectNode jsonObject = objectMapper.createObjectNode();
        ArrayNode jsonArray = objectMapper.createArrayNode();
        jsonArray.add(resultPath);
        jsonArray.add(trainFlag); // convert: false, train: true
        jsonObject.set("data", jsonArray);

        return webClient.post()
                .uri(UPLOAD)
                .bodyValue(jsonObject)
                .retrieve()
                .bodyToMono(String.class);
    }

    public Mono<String> inferChangeVoice(String vmName) {
        System.out.println("in inferChangeVoice");

        // JSON 객체 생성
        ObjectNode jsonObject = objectMapper.createObjectNode();
        ArrayNode jsonArray = objectMapper.createArrayNode();
        jsonArray.add(vmName);
        jsonArray.add(0.33);
        jsonArray.add(0.33);
        jsonObject.set("data", jsonArray);

        return webClient.post()
                .uri(SELECT)
                .bodyValue(jsonObject)
                .retrieve()
                .bodyToMono(String.class);
    }

    public Mono<String> inferConvert(String ttsPath) {
        System.out.println("in inferConvert");
        // JSON 객체 생성
        ObjectNode jsonObject = objectMapper.createObjectNode();
        ArrayNode jsonArray = objectMapper.createArrayNode();
        jsonArray.add(0);
        jsonArray.add(ttsPath);
        jsonArray.add(0);
        jsonArray.addNull();
        jsonArray.add("rmvpe");
        jsonArray.add("");
        jsonArray.add("logs\\been//added_IVF283_Flat_nprobe_1_been_v2.index");
        jsonArray.add(0.75);
        jsonArray.add(3);
        jsonArray.add(0);
        jsonArray.add(0.25);
        jsonArray.add(0.33);
        jsonObject.set("data", jsonArray);

        return webClient.post()
                .uri(CONVERT)
                .bodyValue(jsonObject)
                .retrieve()
                .bodyToMono(String.class);
    }

    public Mono<String> processVoiceConversion(String voiceModel, String ttsPath) {
        return uploadAudioFile(ttsPath, false)
                .flatMap(uploadResponse -> {
                    String uploadPath;
                    try {
                        JsonNode rootNode = objectMapper.readTree(uploadResponse);
                        uploadPath = rootNode.path("data").get(0).asText();
                    } catch (JsonProcessingException e) {
                        return Mono.error(new RuntimeException(e));
                    }
                    System.out.println("upload 경로 확인: " + uploadPath);
                    return inferChangeVoice(voiceModel)
                            .flatMap(changeVoiceResponse -> inferConvert(uploadPath))
                            .flatMap(convertResponse -> {
                                try {
                                    JsonNode rootNode = objectMapper.readTree(convertResponse);
                                    JsonNode dataNode = rootNode.path("data").get(1);
                                    String filePath = dataNode.path("name").asText();
                                    String httpPath = "http://175.209.203.185:7897/file=" + filePath;
                                    System.out.println("httpPath: " + httpPath);
                                    String resultPath = addPrefixToFilename(ttsPath, "result_");
                                    return downloadFile(httpPath, resultPath)
                                            .then(Mono.just("https://i11b207.p.ssafy.io" + resultPath.substring(resultPath.indexOf("/uploads"))));
                                } catch (Exception e) {
                                    return Mono.error(e);
                                }
                            });
                })
                .onErrorResume(error -> {
                    System.err.println("오류 발생: " + error.getMessage());
                    return Mono.just("처리 중 오류 발생");
                });
    }

    public String addPrefixToFilename(String ttsPath, String prefix) {
        // 마지막 슬래시('/')의 위치를 찾기
        int lastSlashIndex = ttsPath.lastIndexOf("/");

        // 파일 경로를 두 부분으로 나누고, prefix를 파일명 앞에 추가
        String directory = ttsPath.substring(0, lastSlashIndex + 1);
        String filename = ttsPath.substring(lastSlashIndex + 1);

        // 새 파일 경로를 만들어 반환
        return directory + prefix + filename;
    }


    // WebClient를 사용하여 파일을 다운로드하는 함수
    public Mono<Void> downloadFile(String fileUrl, String outputFilePath) {
        return webClient.get()
                .uri(fileUrl)
                .header(HttpHeaders.ACCEPT, MediaType.APPLICATION_OCTET_STREAM_VALUE)
                .retrieve()
                .bodyToFlux(DataBuffer.class)
                .flatMap(dataBuffer -> {
                    try {
                        Path path = Paths.get(outputFilePath);
                        if (Files.notExists(path)) {
                            Files.createFile(path);
                        }
                        try (OutputStream outputStream = Files.newOutputStream(path, StandardOpenOption.CREATE, StandardOpenOption.APPEND)) {
                            byte[] bytes = new byte[dataBuffer.readableByteCount()];
                            dataBuffer.read(bytes);
                            outputStream.write(bytes);
                            return Mono.empty();
                        }
                    } catch (IOException e) {
                        return Mono.error(e);
                    } finally {
                        // release the data buffer
                        DataBufferUtils.release(dataBuffer);
                    }
                }).then();
    }

    public void updateVoiceModelCreated(String oauthId) {
        Member member = memberRepository.findByOauthId(oauthId);
        member.setVoiceModelCreated(1);
        memberRepository.save(member);
    }

    public Mono<String> processTraining(String vmName, String voicePath) {
        return uploadAudioFile(voicePath, true)
                .flatMap(uploadResponse -> {
                    String uploadPath;
                    try {
                        JsonNode rootNode = objectMapper.readTree(uploadResponse);
                        uploadPath = rootNode.path("data").get(0).asText();
                        int lastIdx = uploadPath.lastIndexOf('/');
                        uploadPath = uploadPath.substring(0, lastIdx);
                        System.out.println("upload 경로 확인: " + uploadPath);
                    }catch (JsonProcessingException e) {
                        return Mono.error(new RuntimeException(e));
                    }
                    return trainPreprocess(uploadPath, vmName)
                            .flatMap(preprocessResponse -> extractFeature(vmName))
                            .flatMap(extractResponse -> train(vmName))
                            .flatMap(trainResponse -> Mono.just("완료"));
                })
                .onErrorResume(error -> {
                    System.err.println("오류 발생: " + error.getMessage());
                    return Mono.just("처리 중 오류 발생");
                });
    }
}
