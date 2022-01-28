package br.edu.ifg.models;

import br.edu.ifg.enums.Status;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity(name = "leilao")
public class LeilaoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idLeilao;
    private String item;
    private Double lanceMinimo;
    private Status status;
    private LocalDate dataExpiracao;
    private String urlIcon;
    private boolean emailEnviado;

    @OneToMany(mappedBy = "id.idLeilao")
    @JsonIgnore
    private Set<LanceModel> lances = new HashSet<>();


    public Set<LanceModel> getLances(){
        return this.lances;
    }

    public boolean isEmailEnviado() {
        return emailEnviado;
    }

    public void setEmailEnviado(boolean emailEnviado) {
        this.emailEnviado = emailEnviado;
    }
}