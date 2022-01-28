package br.edu.ifg.repositories;

import br.edu.ifg.models.LeilaoModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeilaoRepository extends JpaRepository<LeilaoModel, Long> {
}
