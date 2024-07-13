package com.br.internalrecruitment.service;

import com.br.internalrecruitment.model.entity.Usuario;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class UserDetailsImpl implements UserDetails {

    private Long id;

    private String name;

    private String username;

    private String email;

    private String password;

    public  static  UserDetailsImpl build(Usuario usuario) {
        return new UserDetailsImpl(
                usuario.getId(),
                usuario.getNome(),
                usuario.getLogin(),
                usuario.getEmail(),
                usuario.getSenha(),
                new ArrayList<>()
        );
    }

    public UserDetailsImpl(Long id, String name, String username, String email, String password, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    //    private List<GrantedAuthority> authorities;
    private Collection<? extends GrantedAuthority> authorities;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return List.of();
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
//        return false;
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
//        return false;
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        //        return false;
        return true;
    }

    @Override
    public boolean isEnabled() {
        //        return false;
        return true;
    }
}
