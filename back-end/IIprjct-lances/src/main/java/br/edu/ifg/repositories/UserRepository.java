package br.edu.ifg.repositories;

import br.edu.ifg.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<UserModel, Long> {

}
