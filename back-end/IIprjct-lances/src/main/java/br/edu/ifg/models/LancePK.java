package br.edu.ifg.models;

import lombok.Data;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Data
@Embeddable
public class LancePK implements Serializable {

    private static final long serialVersionUID = 4334211319336695902L;
    @ManyToOne
    @JoinColumn(name="id_leilao")
    private LeilaoModel idLeilao;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="id_usuario")
    private UserModel idUser;


}
