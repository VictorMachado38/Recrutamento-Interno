package com.br.internalrecruitment.model.entity;

import java.time.Instant;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "vericificador")
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class UsuarioVerificador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private UUID uuid;

    @Column(nullable = false)
    private Instant dataExpiracao;

    @ManyToOne
    @JoinColumn(name = "ID_USUARIO", referencedColumnName = "ID", unique = true)
    private Usuario usuario;

}
