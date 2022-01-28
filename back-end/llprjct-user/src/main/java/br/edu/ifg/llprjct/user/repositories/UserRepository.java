package br.edu.ifg.llprjct.user.repositories;

import br.edu.ifg.llprjct.user.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserModel, Long> {

    public Optional<UserModel> findByUserName(String userName);


}
