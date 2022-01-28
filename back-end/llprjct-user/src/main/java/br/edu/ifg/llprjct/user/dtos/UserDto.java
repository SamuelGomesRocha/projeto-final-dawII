package br.edu.ifg.llprjct.user.dtos;

import lombok.Data;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

@Data
public class UserDto {

    @NotBlank
    private String cpf;
    @NotBlank
    private String nome;
    @NotBlank
    @Email
    private String email;
    private String iconUser;
    @NotBlank
    private String userName;
    @NotBlank
    private String password;


}
