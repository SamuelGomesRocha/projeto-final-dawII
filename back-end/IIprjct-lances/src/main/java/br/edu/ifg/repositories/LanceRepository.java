package br.edu.ifg.repositories;

import br.edu.ifg.models.LanceModel;
import br.edu.ifg.models.LancePK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LanceRepository extends JpaRepository<LanceModel, LancePK> {
}
