package com.br.internalrecruitment.rest;

import com.br.internalrecruitment.model.bo.VagaBO;
import com.br.internalrecruitment.model.dao.impl.VagaInterfaceDAO;
import com.br.internalrecruitment.model.dto.ResponseDTO;
import com.br.internalrecruitment.model.dto.VagaDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vaga")
public class VagaRest {

    @Autowired
    VagaBO bo = new VagaBO();

    @Autowired
    private VagaInterfaceDAO vagaInterfaceDAO;



    @PostMapping("/save")
    @CrossOrigin(origins = "*", maxAge = 3600)
    public ResponseDTO<VagaDto> saveClient(@RequestBody VagaDto vaga) {
        return bo.saveVaga(vaga, vagaInterfaceDAO);
    }

    @GetMapping("/list")
    @CrossOrigin(origins = "*", maxAge = 3600)
    public ResponseDTO<List<VagaDto>> getAllClientess() {
        return bo.getVagas();
    }

}
