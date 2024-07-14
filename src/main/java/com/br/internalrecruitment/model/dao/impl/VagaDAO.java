package com.br.internalrecruitment.model.dao.impl;

import com.br.internalrecruitment.model.dao.AbstractDAOConnection;
import com.br.internalrecruitment.model.dto.UsuarioAplicadoDTO;
import com.br.internalrecruitment.model.dto.VagaDTO;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

//@Repository
@Component
public class VagaDAO extends AbstractDAOConnection {

    public List<VagaDTO> busca() {
        connection();
        //language=PostgreSQL
        String sql = "SELECT v.id,v.titulo,v.descricao,v.requisitos FROM vaga v";
        ResultSet rs;

        {
            try {
                rs = getStmt().executeQuery(sql);
                List<VagaDTO> list = new ArrayList<>();
                while (rs.next()) {
                    list.add(VagaDTO.builder()
                            .id(rs.getLong("id"))
                            .titulo(rs.getString("titulo"))
                            .descricao(rs.getString("descricao"))
                            .requisitos(rs.getString("requisitos"))
                            .build());
                }
                closeConnection();
                return list;
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }

    }

    public List<UsuarioAplicadoDTO> buscaVagasCandidatos() {
        connection();
        //language=PostgreSQL
        String sql = "SELECT v.id AS idVaga, v.titulo, v.descricao, v.requisitos, " +
                "u.id AS idCandidato, u.nome, u.email, u.sexo " +
                "FROM aplicacao a " +
                "JOIN vaga v ON a.id_vaga = v.id " +
                "JOIN usuario u ON a.id_candidato = u.id";
        ResultSet rs;

        {
            try {
                rs = getStmt().executeQuery(sql);
                List<UsuarioAplicadoDTO> list = new ArrayList<>();
                while (rs.next()) {
                    list.add(UsuarioAplicadoDTO.builder()
                            .idVaga(rs.getLong("idVaga"))
                            .tituloVaga(rs.getString("titulo"))
                            .descricaoVaga(rs.getString("descricao"))
                            .requisitosVaga(rs.getString("requisitos"))
                            .idCandidato(rs.getLong("idCandidato"))
                            .nomeCandidato(rs.getString("nome"))
                            .emailCandidato(rs.getString("email"))
                            .sexoCandidato(rs.getString("sexo"))
                            .build());
                }
                closeConnection();
                return list;
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public VagaDTO upgrade(VagaDTO formDTO) {
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
                closeConnection();
                return formDTO;
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
