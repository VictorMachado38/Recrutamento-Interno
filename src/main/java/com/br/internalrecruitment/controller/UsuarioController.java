package com.br.internalrecruitment.controller;

import java.util.List;

import com.br.internalrecruitment.model.dto.ResponseDTO;
import com.br.internalrecruitment.model.dto.UsuarioDTO;
import com.br.internalrecruitment.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/usuario")
@CrossOrigin
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<UsuarioDTO> listarTodos() {
        return usuarioService.listarTodos();
    }

    @GetMapping(value = "/{login}")
    public ResponseDTO<UsuarioDTO> listarTodos(@PathVariable("login") String login) {
        return usuarioService.carregarPeloLogin(login);
    }

    @PostMapping
    public ResponseDTO<UsuarioDTO> inserir(@RequestBody UsuarioDTO usuario) {
        return usuarioService.inserir(usuario);
    }

    @PutMapping
    public UsuarioDTO alterar(@RequestBody UsuarioDTO usuario) {
        return usuarioService.alterar(usuario);
    }

//    //http://endereco/usuario/3
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> excluir(@PathVariable("id") Long id){
//        usuarioService.excluir(id);
//        return ResponseEntity.ok().build();
//    }

}
