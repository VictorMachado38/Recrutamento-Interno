package com.br.internalrecruitment.model.entity.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Sexo {
    M("Masculino", "M"),
    F("Feminino", "F");

    private String label;
    private String value;

    private Sexo(String label, String value) {
        this.label = label;
        this.value = value;
    }

//    @JsonValue
//    public String getCodigo() {
//        return codigo;
//    }
//
//    public void setCodigo(String codigo) {
//        this.codigo = codigo;
//    }
//
//    public String getDescricao() {
//        return descricao;
//    }
//
//    public void setDescricao(String descricao) {
//        this.descricao = descricao;
//    }
//
//    @JsonCreator
//    public static Sexo doValor(String codigo) {
//        if (codigo.equals("A")) {
//            return ATIVO;
//        } else if (codigo.equals("I")) {
//            return INATIVO;
//        } else if (codigo.equals("P")) {
//            return PENDENTE;
//        } else {
//            return null;
//        }
//    }
}
