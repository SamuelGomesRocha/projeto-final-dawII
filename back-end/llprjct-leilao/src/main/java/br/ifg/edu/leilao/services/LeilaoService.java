package br.ifg.edu.leilao.services;

import br.ifg.edu.leilao.dto.LeilaoDto;
import br.ifg.edu.leilao.enums.Status;
import br.ifg.edu.leilao.models.LeilaoModel;
import br.ifg.edu.leilao.repositories.LeilaoRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class LeilaoService {

    @Autowired
    LeilaoRepository leilaoRepository;


    public void cadastraLeilao(LeilaoModel leilaoModel) {
        leilaoModel.setStatus(Status.INATIVO);
        leilaoRepository.save(leilaoModel);
    }

    public LeilaoModel getLeilaoById(Long idLeilao) {
        LeilaoModel leilao = leilaoRepository.findById(idLeilao).get();
        return leilao;
    }

    public List<LeilaoModel> listLeiloes() {
        List<LeilaoModel> ls = leilaoRepository.findAll();
        System.out.println("Data: " +LocalDate.now());
        for(LeilaoModel l : ls){
            System.out.println("Data Exp: "+l.getDataExpiracao());
            System.out.println(l.getStatus());
            if(l.getDataExpiracao().isBefore(LocalDate.now())){
                if(l.getStatus().equals(Status.INATIVO)){
                    l.setStatus(Status.EXPIRADO);
                    updateLeilao(l);
                }
                if(l.getStatus().equals(Status.ABERTO)){
                    l.setStatus(Status.FINALIZADO);
                    updateLeilao(l);
                }
            }
        }
        ls = leilaoRepository.findAll();
        return ls;
    }

    public void updateLeilao(LeilaoModel leilaoModel) {
        leilaoRepository.save(leilaoModel);
    }

    public void deletaLeilao(Long idLeilao) {
        leilaoRepository.delete(leilaoRepository.getById(idLeilao));
    }
}
