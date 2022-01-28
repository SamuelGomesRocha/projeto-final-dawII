package br.edu.ifg.dto;

import br.edu.ifg.models.LancePK;
import lombok.Data;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class LanceDTO {

    private Long idLeilao;
    private Long idUser;
    private Double valorLance;
}
