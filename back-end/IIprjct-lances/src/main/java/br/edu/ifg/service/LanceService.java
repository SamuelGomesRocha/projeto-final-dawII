package br.edu.ifg.service;

import br.edu.ifg.dto.LanceDTO;
import br.edu.ifg.enums.Status;
import br.edu.ifg.models.LanceModel;
import br.edu.ifg.models.LeilaoModel;
import br.edu.ifg.models.UserModel;
import br.edu.ifg.repositories.LanceRepository;
import br.edu.ifg.repositories.LeilaoRepository;
import br.edu.ifg.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LanceService {


    @Autowired
    LeilaoRepository leilaoRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    LanceRepository lanceRepository;


    List<String> erros = new ArrayList<String>();

    public LanceModel putLance(LanceDTO dto) {
        LanceModel lanceModel = new LanceModel();
        Double vl = 0.0;
        Long um = 1l;

        if(getLancesByLeilao(dto.getIdLeilao()).size() == 0){
           vl = getValorLeilao(dto.getIdLeilao());

        }else {


            for (LanceModel l : getLancesByLeilao(dto.getIdLeilao())) {
                System.out.println("Valor lance: " + l.getValorLance());
                vl = l.getValorLance();
                um = l.getId().getIdUser().getIdUser();
            }
        }

        System.out.println("Olha o dtoooo "+ dto.getIdUser());
        if(vl >= dto.getValorLance() || um.equals(dto.getIdUser())){
           if(vl >= dto.getValorLance()) erros.add("O valor do lance deve ser maior ao anterior");
           if(um.equals(dto.getIdUser())) erros.add("O mesmo usuário não pode repetir o lance");
        }else {

            Long count = 0l;
            System.out.println("idLeilao: " + dto.getIdLeilao() + "\nidUser: " + dto.getIdUser());

            UserModel user = userRepository.findById(dto.getIdUser()).get();
            LeilaoModel leilao = leilaoRepository.findById(dto.getIdLeilao()).get();

          //  LanceModel lanceModel = new LanceModel();
            lanceModel.setLeilao(leilao);
            lanceModel.setUser(user);
            lanceModel.setValorLance(dto.getValorLance());

            for (LanceModel l : getAllLances()) {
                count = l.getKey();
            }
            lanceModel.setKey(count += 1);
            leilao.setStatus(Status.ABERTO);
            leilao.setLanceMinimo(lanceModel.getValorLance());
            leilaoRepository.saveAndFlush(leilao);
            lanceModel = lanceRepository.saveAndFlush(lanceModel);

        }
        return lanceModel;
    }


    public List<LanceModel> getAllLances() {
        return lanceRepository.findAll();
    }


    public List<LanceModel> getLancesByLeilao(Long idLeilao) {
        System.out.println("observe o idLeilao");
        List<LanceModel> lancesByLeilao = new ArrayList<LanceModel>();
            for(LanceModel l : getAllLances()){
                if(l.getId().getIdLeilao().getIdLeilao().equals(idLeilao)) {
                    lancesByLeilao.add(l);
                    System.out.println(l.getValorLance() + " leilaoId: "+idLeilao);
                }
            }


        return lancesByLeilao;
    }


    private Double getValorLeilao(Long idLeilao){
        LeilaoModel l = leilaoRepository.findById(idLeilao).get();
       return l.getLanceMinimo();
    }

    public UserModel getGanhadorLeilao(Long idLeilao){
        System.out.println("Winner");
        LeilaoModel leilao = leilaoRepository.findById(idLeilao).get();
        UserModel user = new UserModel();
        LanceModel lResult = new LanceModel();
        if(leilao.getStatus().equals(Status.EXPIRADO) || leilao.getStatus().equals(Status.FINALIZADO)){
            for(LanceModel l : getLancesByLeilao(idLeilao)){
                lResult = l;
            }
            user = userRepository.findById(lResult.getId().getIdUser().getIdUser()).get();
            LeilaoModel l = leilaoRepository.findById(lResult.getId().getIdLeilao().getIdLeilao()).get();
                if(l.isEmailEnviado() != true && l.getStatus().equals(Status.FINALIZADO)){
                    System.out.println("Irei enviar o email");
                    sendEmail(user, l);
                    l.setEmailEnviado(true);
                    leilaoRepository.saveAndFlush(l);
                }

            }
        return user;
    }


    private void sendEmail(UserModel userModel, LeilaoModel l){
        new EnviaEmailAoGanhador(userModel.getEmail(), l.getItem(), userModel.getUserName()).executa();
    }

    public List<String> getErrors() {
        return erros;
    }
}
