package br.ifg.edu.leilao.repositories;

import br.ifg.edu.leilao.models.LeilaoModel;
import org.springframework.data.jpa.repository.JpaRepository;


public interface LeilaoRepository extends JpaRepository<LeilaoModel, Long> {

}
