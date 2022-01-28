package br.edu.ifg.controller;

import br.edu.ifg.dto.LanceDTO;
import br.edu.ifg.models.LanceModel;
import br.edu.ifg.models.UserModel;
import br.edu.ifg.service.LanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/lance")
public class LanceController {

    @Autowired
    LanceService lanceService;


    @PutMapping("/novoLance")
    private LanceModel putLance(@RequestBody @Valid LanceDTO dto){
        return lanceService.putLance(dto);
    }

    @RequestMapping("/list")
    private List<LanceModel> listLances(){
        return lanceService.getAllLances();
    }

    @GetMapping("/get/{idLeilao}")
    private List<LanceModel> listLancesByLeilao(@PathVariable Long idLeilao){
        System.out.println("entrei aqui");return lanceService.getLancesByLeilao(idLeilao);}


    @GetMapping("/winner/{idLeilao}")
    private UserModel getWinner(@PathVariable Long idLeilao){
        return lanceService.getGanhadorLeilao(idLeilao);
    }

    @GetMapping("/erros")
    private List<String> getErrors(){
        return lanceService.getErrors();
    }

}
