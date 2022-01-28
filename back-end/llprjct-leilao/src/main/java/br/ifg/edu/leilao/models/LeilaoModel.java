package br.ifg.edu.leilao.models;

import br.ifg.edu.leilao.enums.Status;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

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
    @Column
    private boolean emailEnviado;
}
