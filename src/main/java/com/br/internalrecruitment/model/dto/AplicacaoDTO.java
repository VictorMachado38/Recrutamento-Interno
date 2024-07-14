package com.br.internalrecruitment.model.dto;

import com.br.internalrecruitment.model.entity.Aplicacao;
import com.br.internalrecruitment.model.entity.Usuario;
import com.br.internalrecruitment.model.entity.Vaga;
import lombok.Builder;
import lombok.Data;

@Data
public class AplicacaoDTO {

    private Long id;
    private Long idVaga;
    private Long idUsuario;


    @Builder
    public AplicacaoDTO(Long id, Long idVaga, Long idUsuario) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.idVaga = idVaga;
    }

    public Aplicacao toEntity() {
        return Aplicacao.builder()
                .id(this.id)
                .idVaga(Vaga.builder().id(this.idVaga).build())
                .idCandidato(Usuario.builder().id(this.idUsuario).build())
                .build();
    }

//    public Vaga toVagaEntity() {
//        return Vaga.builder()
//                .id(this.id)
//                .titulo(this.titulo)
//                .descricao(this.descricao)
//                .requisitos(this.requisitos)
//                .build();
//    }
}
