package com.br.internalrecruitment.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


import com.br.internalrecruitment.model.dto.AcessDTO;
import com.br.internalrecruitment.model.dto.AuthenticationDTO;
import com.br.internalrecruitment.security.jwt.JwtUtils;
import org.springframework.beans.factory.BeanCreationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    public AcessDTO login(AuthenticationDTO authenticationDTO) {

        try {
            //Cria mecanismo de credenciais para o sprig
            UsernamePasswordAuthenticationToken authenticationToken
                    = new UsernamePasswordAuthenticationToken(authenticationDTO.getLogin(), authenticationDTO.getPassword());

            //Prepara o mecanismo para a autenticação
            Authentication authentication = authenticationManager.authenticate(authenticationToken);


            //Cria o contexto da autenticação
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            String token = jwtUtils.gerarTokenFromUserDetailsImpl(userDetails);

            return new AcessDTO(token);
        } catch (BeanCreationException e) {
            //todo: senha o usuario errado
            return new AcessDTO("Acesso negado");
        }
//        return null;
    }
}
