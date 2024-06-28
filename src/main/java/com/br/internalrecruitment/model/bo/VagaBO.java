package com.br.internalrecruitment.model.bo;


import com.br.internalrecruitment.model.dao.impl.*;
import com.br.internalrecruitment.model.dto.ResponseDTO;
import com.br.internalrecruitment.model.dto.VagaDto;
import com.br.internalrecruitment.model.entity.Vaga;
import org.hibernate.PropertyValueException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Component;

import java.util.List;

import static javax.ws.rs.core.Response.Status.*;


@Component
public class VagaBO {

    @Autowired
    private VagaDAO dao;

    public ResponseDTO<VagaDto> saveVaga(VagaDto formDTO, VagaInterfaceDAO vagaInterfaceDAO) {
        if (formDTO.getId() == null) {
            Vaga vaga = new Vaga();
            try {
                vaga = vagaInterfaceDAO.save(formDTO.toVagaEntity());
                formDTO.setId(vaga.getId());
            } catch (Exception e) {
                if (e instanceof DataIntegrityViolationException) {
                    DataIntegrityViolationException cve = (DataIntegrityViolationException) e;
                    PropertyValueException cve2 = (PropertyValueException) cve.getCause();
                    System.out.println("Nome da restrição violada: " + cve2.getPropertyName());
                    if (cve2.getPropertyName() != null) {
                        return ResponseDTO.<VagaDto>builder()
                                .data(formDTO)
                                .message("Erro ao processar a requisição")
                                .description("Erro na propridede " + cve2.getPropertyName())
                                .status(PAYMENT_REQUIRED.getStatusCode())
                                .build();
                    } else
                        return ResponseDTO.<VagaDto>builder().data(formDTO).message("Erro ao processar a requisição").status(BAD_REQUEST.getStatusCode()).build();
                } else {
                    return ResponseDTO.<VagaDto>builder().data(formDTO).message("Erro ao processar a requisição").status(BAD_REQUEST.getStatusCode()).build();
                }
            }

            return ResponseDTO.<VagaDto>builder()
                    .data(formDTO)
                    .message("Vaga salva")
                    .description("A vaga " + formDTO.getTitulo() + " foi salva com sucesso")
                    .status(OK.getStatusCode())
                    .build();
        }

        else {
            VagaDto formDTOup = dao.upgrade(formDTO);
            return ResponseDTO.<VagaDto>builder()
                    .data(formDTOup )
                    .message("Vaga atualizada")
                    .description("A vaga " + formDTO.getTitulo() + " foi atualizada com sucesso")
                    .status(OK.getStatusCode())
                    .build();
        }
    }

    public ResponseDTO<List<VagaDto>> getVagas() {
        List<VagaDto> list = dao.busca();
        return ResponseDTO.<List<VagaDto>>builder()
                .data(list)
                .message("List Clients")
                .description("Successfully Listed Clients")
                .status(OK.getStatusCode())
                .build();
    }
}
