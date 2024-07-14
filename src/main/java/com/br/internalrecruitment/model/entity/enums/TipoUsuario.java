package com.br.internalrecruitment.model.entity.enums;

public enum TipoUsuario {
    recruiter("Recrutador"),
    candidate("Candidato");

    private String label;


    private TipoUsuario(String label) {
        this.label = label;
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
