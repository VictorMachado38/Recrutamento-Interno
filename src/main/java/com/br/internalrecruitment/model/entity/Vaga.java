package com.br.internalrecruitment.model.entity;

import com.br.internalrecruitment.model.dto.VagaDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.Builder;
import lombok.Data;


@Entity
@Transactional
@JsonIgnoreProperties(ignoreUnknown = true)
@Table(name = "vaga", schema = "public")
@Data
public class Vaga {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private String descricao;

    private String requisitos;

    @Builder
    public Vaga(Long id, String titulo, String descricao, String requisitos) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.requisitos = requisitos;
    }

    public Vaga() {
    }

    public VagaDto toDTO() {
        return VagaDto.builder()
                .id(this.id)
                .titulo(this.titulo)
                .descricao(this.descricao)
                .requisitos(this.requisitos)
                .build();
    }
}