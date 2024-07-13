package com.br.internalrecruitment.service;

import com.br.internalrecruitment.model.entity.Usuario;
import com.br.internalrecruitment.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private UsuarioRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = userRepository.findByLogin(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
//        return org.springframework.security.core.userdetails.User.builder()
//                .username(usuario.getLogin())
//                .password(usuario.getSenha())
//                .authorities( new ArrayList<>())
//                .accountExpired(false) // Defina como false para não expirar a conta
//                .accountLocked(false)
//                .credentialsExpired(false)
//                .disabled(false)
//                .build();
        return UserDetailsImpl.build(usuario);
    }
}
