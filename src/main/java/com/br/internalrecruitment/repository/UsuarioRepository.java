package com.br.internalrecruitment.repository;


import java.util.Optional;

import com.br.internalrecruitment.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByLogin(String login);
}