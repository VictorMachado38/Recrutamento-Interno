package com.br.internalrecruitment.service;


import com.br.internalrecruitment.model.dto.AcessDTO;
import com.br.internalrecruitment.model.dto.AuthenticationDTO;
import com.br.internalrecruitment.security.jwt.JwtUtils;
import org.springframework.beans.factory.BeanCreationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;


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
                    = new UsernamePasswordAuthenticationToken(authenticationDTO.getLogin(), authenticationDTO.getSenha());

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
    }
}
