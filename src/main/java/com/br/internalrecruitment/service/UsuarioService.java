package com.br.internalrecruitment.service;

import com.br.internalrecruitment.model.dto.UsuarioDTO;
import com.br.internalrecruitment.model.entity.Usuario;
import com.br.internalrecruitment.model.entity.UsuarioVerificador;
import com.br.internalrecruitment.model.entity.enums.TipoSituacaoUsuario;
import com.br.internalrecruitment.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

//    @Autowired
//    private UsuarioVerificador usuarioVerificador;

    @Autowired
    private PasswordEncoder passwordEncoder;

//    @Autowired
//    private EmailService emailService;

    public List<UsuarioDTO> listarTodos(){
        List<Usuario> usuarios = usuarioRepository.findAll();
        return usuarios.stream().map(UsuarioDTO::new).toList();
    }

    public void inserir(UsuarioDTO usuario) {
        Usuario usuarioEntity = new Usuario(usuario);
        usuarioEntity.setSenha(passwordEncoder.encode(usuario.getSenha()));
        usuarioRepository.save(usuarioEntity);
    }

    public void inserirNovoUsuario(UsuarioDTO usuario) {
        Usuario usuarioEntity = new Usuario(usuario);
        usuarioEntity.setSenha(passwordEncoder.encode(usuario.getSenha()));
        usuarioEntity.setSituacao(TipoSituacaoUsuario.PENDENTE);
        usuarioEntity.setId(null);
        usuarioRepository.save(usuarioEntity);

        UsuarioVerificador verificador = new UsuarioVerificador();
        verificador.setUsuario(usuarioEntity);
        verificador.setUuid(UUID.randomUUID());
        verificador.setDataExpiracao(Instant.now().plusMillis(900000));
//        usuarioVerificador.save(verificador);

//        //TODO - Enviar um email para verificar a conta
//        emailService.enviarEmailTexto(usuario.getEmail(),
//                "Novo usuário cadastrado",
//                "Você está recebendo um email de cadastro o número para validação é " + verificador.getUuid());

    }

//    public String verificarCadastro(String uuid) {
//
//        UsuarioVerificador usuarioVerificacao = usuarioVerificador.findByUuid(UUID.fromString(uuid)).get();
//
//        if(usuarioVerificacao != null) {
//            if(usuarioVerificacao.getDataExpiracao().compareTo(Instant.now()) >= 0) {
//
//                Usuario u = usuarioVerificacao.getUsuario();
//                u.setSituacao(TipoSituacaoUsuario.ATIVO);
//
//                usuarioRepository.save(u);
//
//                return "Usuário Verificado";
//            }else {
//                usuarioVerificador.delete(usuarioVerificacao);
//                return "Tempo de verificação expirado";
//            }
//        }else {
//            return "Usuario não verificado";
//        }
//
//    }

    public UsuarioDTO alterar(UsuarioDTO usuario) {
        Usuario usuarioEntity = new Usuario(usuario);
        usuarioEntity.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return new UsuarioDTO(usuarioRepository.save(usuarioEntity));
    }

    public void excluir(Long id) {
        Usuario usuario = usuarioRepository.findById(id).get();
        usuarioRepository.delete(usuario);
    }

    public UsuarioDTO buscarPorId(Long id) {
        return new UsuarioDTO(usuarioRepository.findById(id).get());
    }
}