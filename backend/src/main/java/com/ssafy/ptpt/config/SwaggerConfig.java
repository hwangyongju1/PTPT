package com.ssafy.ptpt.config;//package com.ssafy.ptpt.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import springfox.documentation.builders.PathSelectors;
//import springfox.documentation.builders.RequestHandlerSelectors;
//import springfox.documentation.service.ApiKey;
//import springfox.documentation.service.AuthorizationScope;
//import springfox.documentation.service.SecurityReference;
//import springfox.documentation.spi.DocumentationType;
//import springfox.documentation.spi.service.contexts.SecurityContext;
//import springfox.documentation.spring.web.plugins.Docket;
//import springfox.documentation.swagger.web.UiConfiguration;
//import springfox.documentation.swagger.web.UiConfigurationBuilder;
//import springfox.documentation.swagger2.annotations.EnableSwagger2;
//
//import java.util.List;
//
//import static com.google.common.collect.Lists.newArrayList;
//
///**
// * API 문서 관련 swagger2 설정 정의.
// */
//@Configuration    //일단 오류가 나므로 임시방편으로 주석처리 TODO: 추후 수정 필요
//public class SwaggerConfig {
//
//    @Bean
//    public Docket api() {
//        return new Docket(DocumentationType.SWAGGER_2).useDefaultResponseMessages(false)
//                .select()
//                .apis(RequestHandlerSelectors.any())
//                .paths(PathSelectors.ant("/api/**"))
//                .build()
//                .securityContexts(newArrayList(securityContext()))
//                .securitySchemes(newArrayList(apiKey()))
//                ;
//    }
//
//    private ApiKey apiKey() {
//        return new ApiKey(SECURITY_SCHEMA_NAME, "Authorization", "header");
//    }
//
//    private SecurityContext securityContext() {
//        return SecurityContext.builder()
//                .securityReferences(defaultAuth())
//                .build();
//    }
//
//    public static final String SECURITY_SCHEMA_NAME = "JWT";
//    public static final String AUTHORIZATION_SCOPE_GLOBAL = "global";
//    public static final String AUTHORIZATION_SCOPE_GLOBAL_DESC = "accessEverything";
//
//    private List<SecurityReference> defaultAuth() {
//        AuthorizationScope authorizationScope = new AuthorizationScope(AUTHORIZATION_SCOPE_GLOBAL, AUTHORIZATION_SCOPE_GLOBAL_DESC);
//        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
//        authorizationScopes[0] = authorizationScope;
//        return newArrayList(new SecurityReference(SECURITY_SCHEMA_NAME, authorizationScopes));
//    }
//
//    @Bean
//    UiConfiguration uiConfig() {
//        return UiConfigurationBuilder.builder()
////                .supportedSubmitMethods(newArrayList("get").toArray(new String[0])) // try it 기능 활성화 범위
////                .operationsSorter(METHOD)
//                .build();
//    }
//}

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration    // 스프링 실행시 설정파일 읽어드리기 위한 어노테이션
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .components(new Components())
                .info(apiInfo());
    }

    private Info apiInfo() {
        return new Info()
                .title("CodeArena Swagger")
                .description("CodeArena 유저 및 인증 , ps, 알림에 관한 REST API")
                .version("1.0.0");
    }
}