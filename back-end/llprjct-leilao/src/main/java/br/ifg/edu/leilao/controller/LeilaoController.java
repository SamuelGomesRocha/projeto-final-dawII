package br.ifg.edu.leilao.controller;


import br.ifg.edu.leilao.dto.LeilaoDto;
import br.ifg.edu.leilao.enums.Status;
import br.ifg.edu.leilao.models.LeilaoModel;
import br.ifg.edu.leilao.services.LeilaoService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value = "/api/leilao")
public class LeilaoController {

    @Autowired
    LeilaoService leilaoService;

    @PostMapping("/create")
    public ResponseEntity<LeilaoModel> creatingLeilao(@RequestBody @Valid LeilaoDto leilaoDto){
        System.out.println("Status"+leilaoDto.getStatus());
        LeilaoModel leilaoModel = new LeilaoModel();
        BeanUtils.copyProperties(leilaoDto, leilaoModel);
        leilaoModel.setDataExpiracao(LocalDate.parse(leilaoDto.getDataExpiracao()));
        leilaoModel.setLanceMinimo(Double.parseDouble(leilaoDto.getLanceMinimo()));
        if(leilaoModel.getUrlIcon().equals("") || leilaoModel.equals(null)){
            leilaoModel.setUrlIcon("https://cdn-icons-png.flaticon.com/512/2331/2331903.png");
        }
        switch (leilaoDto.getStatus().toString()){
            case "INATIVO":
                leilaoModel.setStatus(Status.INATIVO);
                break;
            case "ABERTO":
                leilaoModel.setStatus(Status.ABERTO);
                break;
            case "EXPIRADO":
                leilaoModel.setStatus(Status.EXPIRADO);
                break;
            case "FINALIZADO":
                leilaoModel.setStatus(Status.FINALIZADO);
                break;
        }
        leilaoService.cadastraLeilao(leilaoModel);
        return new ResponseEntity<>(leilaoModel, HttpStatus.CREATED);
    }

    @RequestMapping("/list")
    public List<LeilaoModel> obtemLeiloes(){
        return leilaoService.listLeiloes();
    }

    @PutMapping("/update")
    public ResponseEntity<LeilaoModel> updatingLeilao(@RequestBody LeilaoDto leilaoDto){
        System.out.println("Status"+leilaoDto.getStatus().toString());
        LeilaoModel leilaoModel = new LeilaoModel();
    System.out.println("Leilao status"+leilaoModel.getItem()+leilaoModel.getLanceMinimo()+leilaoModel.getStatus());

        BeanUtils.copyProperties(leilaoDto, leilaoModel);
        leilaoModel.setDataExpiracao(LocalDate.parse(leilaoDto.getDataExpiracao()));
        leilaoModel.setLanceMinimo(Double.parseDouble(leilaoDto.getLanceMinimo()));
        switch (leilaoDto.getStatus().toString()){
            case "INATIVO":
                leilaoModel.setStatus(Status.INATIVO);
                break;
            case "ABERTO":
                leilaoModel.setStatus(Status.ABERTO);
                break;
            case "EXPIRADO":
                leilaoModel.setStatus(Status.EXPIRADO);
                break;
            case "FINALIZADO":
                leilaoModel.setStatus(Status.FINALIZADO);
                break;
        }
        leilaoService.updateLeilao(leilaoModel);
        return new ResponseEntity<>(leilaoModel, HttpStatus.CREATED);
    }

    @GetMapping("/delete/{idLeilao}")
    public void deleteLeilao(@PathVariable("idLeilao") Long idLeilao){
        leilaoService.deletaLeilao(idLeilao);
    }

    @GetMapping("/{idLeilao}")
    public LeilaoModel obtemLeilao(@PathVariable("idLeilao") Long idLeilao){
        LeilaoModel pseudoLeilao = leilaoService.getLeilaoById(idLeilao);
        return pseudoLeilao;
    }


}
