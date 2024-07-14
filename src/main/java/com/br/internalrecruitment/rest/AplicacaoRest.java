package com.br.internalrecruitment.rest;

import com.br.internalrecruitment.model.bo.AplicacaoBO;
import com.br.internalrecruitment.model.bo.VagaBO;
import com.br.internalrecruitment.model.dto.AplicacaoDTO;
import com.br.internalrecruitment.model.dto.ResponseDTO;
import com.br.internalrecruitment.model.dto.UsuarioAplicadoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/apply")
@CrossOrigin
public class AplicacaoRest {

    @Autowired
    private AplicacaoBO bo;

    @Autowired
    private VagaBO bo2;

    @PostMapping("/save")
    @CrossOrigin(origins = "*", maxAge = 3600)
    public ResponseDTO<AplicacaoDTO> saveAplicacao(@RequestBody AplicacaoDTO dto) {
        return bo.saveAplicacao(dto);
    }

    @GetMapping("/list")
    @CrossOrigin(origins = "*", maxAge = 3600)
    public ResponseDTO<List<UsuarioAplicadoDTO>> buscaVagasCandidatos() {
        return bo2.buscaVagasCandidatos();
    }

}
