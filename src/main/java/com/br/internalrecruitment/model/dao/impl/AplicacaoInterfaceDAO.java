package com.br.internalrecruitment.model.dao.impl;

import com.br.internalrecruitment.model.entity.Aplicacao;
import com.br.internalrecruitment.model.entity.Vaga;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface AplicacaoInterfaceDAO extends JpaRepository<Aplicacao, Long> {

    List<Aplicacao> findAll();

    Optional<Aplicacao> findById(Long id);

    Aplicacao save(Aplicacao aplicacao);

    void delete(Aplicacao aplicacao);
}
