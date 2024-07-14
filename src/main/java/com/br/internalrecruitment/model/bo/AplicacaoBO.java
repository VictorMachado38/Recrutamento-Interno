package com.br.internalrecruitment.model.bo;


import com.br.internalrecruitment.model.dao.impl.AplicacaoInterfaceDAO;
import com.br.internalrecruitment.model.dto.AplicacaoDTO;
import com.br.internalrecruitment.model.dto.ResponseDTO;
import com.br.internalrecruitment.model.entity.Aplicacao;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Component;

import static javax.ws.rs.core.Response.Status.*;


@Component
public class AplicacaoBO {

//    @Autowired
//    private VagaDAO dao;

    @Autowired
    private AplicacaoInterfaceDAO aplicacaoInterfaceDAO;


    public ResponseDTO<AplicacaoDTO> saveAplicacao(AplicacaoDTO aplicacaoDto) {
        Aplicacao aplicacao = new Aplicacao(aplicacaoDto);
        if (aplicacaoDto.getId() == null) {
            Aplicacao apply = new Aplicacao();
            try {
                apply = aplicacaoInterfaceDAO.save(aplicacaoDto.toEntity());
                aplicacaoDto.setId(apply.getId());
            } catch (Exception e) {
                if (e instanceof DataIntegrityViolationException) {
                    DataIntegrityViolationException cve = (DataIntegrityViolationException) e;
                    ConstraintViolationException cve2 = (ConstraintViolationException) cve.getCause();
                    System.out.println("Nome da restrição violada: " + cve2.getConstraintName());
                    if (cve2.getConstraintName() != null) {
                        switch (cve2.getConstraintName()) {
                            case "uk_aplicacao_vaga_candidato":
                                return ResponseDTO.<AplicacaoDTO>builder()
                                        .data(aplicacaoDto)
                                        .message("Você já se aplicou nesta vaga!")
                                        .description(" ")
                                        .status(CONFLICT.getStatusCode())
                                        .build();
                            default:
                                return ResponseDTO.<AplicacaoDTO>builder()
                                        .data(aplicacaoDto)
                                        .message("Erro ao processar a requisição")
                                        .description("Erro na propridede " + cve2.getConstraintName())
                                        .status(PAYMENT_REQUIRED.getStatusCode())
                                        .build();
                        }
                    } else
                        return ResponseDTO.<AplicacaoDTO>builder().data(aplicacaoDto).message("Erro ao processar a requisição").status(BAD_REQUEST.getStatusCode()).build();
                } else {
                    return ResponseDTO.<AplicacaoDTO>builder().data(aplicacaoDto).message("Erro ao processar a requisição").status(BAD_REQUEST.getStatusCode()).build();
                }
            }

            return ResponseDTO.<AplicacaoDTO>builder()
                    .data(aplicacaoDto)
                    .message("Vaga aplicada com sucesso!")
                    .description("")
                    .status(OK.getStatusCode())
                    .build();
        } else {
//            AplicacaoDto formDTOup = dao.upgrade(aplicacaoDto);
            return ResponseDTO.<AplicacaoDTO>builder()
                    .data(null)
                    .message("Vaga atualizada")
                    .description("A vaga foi atualizada com sucesso")
                    .status(OK.getStatusCode())
                    .build();
        }
    }


////        Aplicacao aplicacao = new Aplicacao(aplicacaoDto);
////        try {
////            aplicacaoInterfaceDAO.save(aplicacao);
////            return ResponseDTO.<AplicacaoDto>builder()
////                    .data(aplicacaoDto)
////                    .message("Cadastrado com sucesso.")
////                    .status(OK.getStatusCode())
////                    .build();
////
////        } catch (Exception e) {
////            return ResponseDTO.<AplicacaoDto>builder()
////                    .data(aplicacaoDto)
////                    .message("Erro ao processar a requisição")
////                    .status(PAYMENT_REQUIRED.getStatusCode())
////                    .build();
////        }
//
//    }

//    public ResponseDTO<AplicacaoDto> saveVaga(AplicacaoDto formDTO, VagaInterfaceDAO vagaInterfaceDAO) {
//        if (formDTO.getId() == null) {
//            Vaga vaga = new Vaga();
//            try {
//                vaga = vagaInterfaceDAO.save(formDTO.toVagaEntity());
//                formDTO.setId(vaga.getId());
//            } catch (Exception e) {
//                if (e instanceof DataIntegrityViolationException) {
//                    DataIntegrityViolationException cve = (DataIntegrityViolationException) e;
//                    PropertyValueException cve2 = (PropertyValueException) cve.getCause();
//                    System.out.println("Nome da restrição violada: " + cve2.getPropertyName());
//                    if (cve2.getPropertyName() != null) {
//                        return ResponseDTO.<AplicacaoDto>builder()
//                                .data(formDTO)
//                                .message("Erro ao processar a requisição")
//                                .description("Erro na propridede " + cve2.getPropertyName())
//                                .status(PAYMENT_REQUIRED.getStatusCode())
//                                .build();
//                    } else
//                        return ResponseDTO.<AplicacaoDto>builder().data(formDTO).message("Erro ao processar a requisição").status(BAD_REQUEST.getStatusCode()).build();
//                } else {
//                    return ResponseDTO.<AplicacaoDto>builder().data(formDTO).message("Erro ao processar a requisição").status(BAD_REQUEST.getStatusCode()).build();
//                }
//            }
//
//            return ResponseDTO.<AplicacaoDto>builder()
//                    .data(formDTO)
//                    .message("Vaga salva")
//                    .description("A vaga " + formDTO.getTitulo() + " foi salva com sucesso")
//                    .status(OK.getStatusCode())
//                    .build();
//        } else {
//            AplicacaoDto formDTOup = dao.upgrade(formDTO);
//            return ResponseDTO.<AplicacaoDto>builder()
//                    .data(formDTOup)
//                    .message("Vaga atualizada")
//                    .description("A vaga " + formDTO.getTitulo() + " foi atualizada com sucesso")
//                    .status(OK.getStatusCode())
//                    .build();
//        }
//    }
//
//    public ResponseDTO<List<AplicacaoDto>> getVagas() {
//        List<AplicacaoDto> list = dao.busca();
//        return ResponseDTO.<List<AplicacaoDto>>builder()
//                .data(list)
//                .message("List Clients")
//                .description("Successfully Listed Clients")
//                .status(OK.getStatusCode())
//                .build();
//    }
}
