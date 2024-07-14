package com.br.internalrecruitment.service;

import com.br.internalrecruitment.model.dao.impl.AplicacaoInterfaceDAO;
import com.br.internalrecruitment.model.dto.AplicacaoDTO;
import com.br.internalrecruitment.model.dto.ResponseDTO;
import com.br.internalrecruitment.model.entity.Aplicacao;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static javax.ws.rs.core.Response.Status.OK;
import static javax.ws.rs.core.Response.Status.PAYMENT_REQUIRED;

@Service
public class AplicacaoService {

    @Autowired
    private AplicacaoInterfaceDAO aplicacaoInterfaceDAO;

    @Transactional
    public ResponseDTO<AplicacaoDTO> saveAplicacao(AplicacaoDTO aplicacaoDto) {
        Aplicacao aplicacao = new Aplicacao(aplicacaoDto);
        try {
            aplicacaoInterfaceDAO.save(aplicacao);
            return ResponseDTO.<AplicacaoDTO>builder()
                    .data(aplicacaoDto)
                    .message("Cadastrado com sucesso.")
                    .status(OK.getStatusCode())
                    .build();

        } catch (Exception e) {
            return ResponseDTO.<AplicacaoDTO>builder()
                    .data(aplicacaoDto)
                    .message("Erro ao processar a requisição")
                    .status(PAYMENT_REQUIRED.getStatusCode())
                    .build();
        }

    }

}