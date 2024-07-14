package com.br.internalrecruitment.model.dto;

import com.br.internalrecruitment.model.entity.Vaga;
import lombok.Builder;
import lombok.Data;

@Data
public class VagaDTO {

    private Long id;
    private String titulo;
    private String descricao;
    private String requisitos;

    @Builder
    public VagaDTO(Long id, String titulo, String descricao, String requisitos) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.requisitos = requisitos;
    }

    public Vaga toVagaEntity() {
        return Vaga.builder()
                .id(this.id)
                .titulo(this.titulo)
                .descricao(this.descricao)
                .requisitos(this.requisitos)
                .build();
    }
}
