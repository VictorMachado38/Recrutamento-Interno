package com.br.internalrecruitment.model.dao.impl;

import com.br.internalrecruitment.model.entity.Vaga;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface VagaInterfaceDAO extends JpaRepository<Vaga, Long> {

    List<Vaga> findAll();

    Optional<Vaga> findById(Long id);

    Vaga save(Vaga Vaga);

    void delete(Vaga Vaga);
}
