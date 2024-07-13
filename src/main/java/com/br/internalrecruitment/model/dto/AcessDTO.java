package com.br.internalrecruitment.model.dto;

import lombok.Data;

@Data
public class AcessDTO {

    public AcessDTO(String token) {
        this.token = token;
        this.status = Long.valueOf(200);
    }

    private String token;
    private Long status;
}
