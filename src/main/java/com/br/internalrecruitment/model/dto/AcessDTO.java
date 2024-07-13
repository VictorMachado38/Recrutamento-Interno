package com.br.internalrecruitment.model.dto;

import lombok.Data;

@Data
public class AcessDTO {

    public AcessDTO(String token) {
        this.token = token;
    }

    private String token;
}
