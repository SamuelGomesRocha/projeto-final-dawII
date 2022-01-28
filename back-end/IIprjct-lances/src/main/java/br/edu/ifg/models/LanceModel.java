package br.edu.ifg.models;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="lance")
public class LanceModel {


    @Id
    private Long key;

    @Embedded()
    private LancePK id = new LancePK();
    private Double valorLance;


    public void setLeilao(LeilaoModel leilao){
        id.setIdLeilao(leilao);
    }

    public void setUser(UserModel user){
        id.setIdUser(user);
    }



}
