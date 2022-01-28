package br.ifg.edu.leilao.dto;

import br.ifg.edu.leilao.enums.Status;
import lombok.Data;
import org.hibernate.validator.constraints.NotBlank;

import java.time.LocalDateTime;

@Data
public class LeilaoDto {

    private Long idLeilao;
    @NotBlank
    private String item;
    @NotBlank
    private String lanceMinimo;
    private Status status;
    @NotBlank
    private String dataExpiracao;
    private String urlIcon;

}
