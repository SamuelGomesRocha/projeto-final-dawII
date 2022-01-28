package br.edu.ifg.models;

import br.edu.ifg.enums.Acesso;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "usuario")
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idUser;
    private String cpf;
    private String nome;
    private String email;
    private String telefone;
    private String userName;
    private String password;
    private Acesso acesso;
    private String iconUser;

    @OneToMany(mappedBy = "id.idUser")
    @JsonIgnore
    private Set<LanceModel> lances = new HashSet<>();

    public Set<LanceModel> getLances(){
        return this.lances;
    }
}
