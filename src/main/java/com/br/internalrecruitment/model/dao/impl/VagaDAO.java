package com.br.internalrecruitment.model.dao.impl;

import com.br.internalrecruitment.model.dao.AbstractDAOConnection;
import com.br.internalrecruitment.model.dto.VagaDto;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

//@Repository
@Component
public class VagaDAO extends AbstractDAOConnection {

    public List<VagaDto> busca() {
        connection();
        //language=PostgreSQL
        String sql = "SELECT v.id,v.titulo,v.descricao,v.requisitos FROM vaga v";
        ResultSet rs;

        {
            try {
                rs = getStmt().executeQuery(sql);
                List<VagaDto> list = new ArrayList<>();
                while (rs.next()) {
                    list.add(VagaDto.builder()
                            .id(rs.getLong("id"))
                            .titulo(rs.getString("titulo"))
                            .descricao(rs.getString("descricao"))
                            .requisitos(rs.getString("requisitos"))
                            .build());
                }
                clouseConnection();
                return list;
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }

    }

    public VagaDto upgrade(VagaDto formDTO) {
        connection();
        //language=PostgreSQL
        String sql1 = "UPDATE vaga SET " +
                "titulo = '" + formDTO.getTitulo() + "'," +
                "descricao = '" + formDTO.getDescricao() + "'," +
                "requisitos = '" + formDTO.getRequisitos() + "'" +
                "WHERE id = " + formDTO.getId();
        {
            try {
                Integer a = getStmt().executeUpdate(sql1);
                clouseConnection();
                return formDTO;
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
