package br.edu.ifg.llprjct.user.controllers;

import br.edu.ifg.llprjct.user.dtos.UserDto;
import br.edu.ifg.llprjct.user.enums.Acesso;
import br.edu.ifg.llprjct.user.models.UserModel;
import br.edu.ifg.llprjct.user.services.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/create")
    public ResponseEntity<UserModel> creatingUser(@RequestBody @Valid UserDto userDto){
        UserModel userModel = new UserModel();
        BeanUtils.copyProperties(userDto, userModel);
        userService.createUser(userModel);
        return new ResponseEntity<>(userModel, HttpStatus.CREATED);
    }

    @PostMapping("/update")
    public ResponseEntity<UserModel> updatingUser(@RequestBody UserModel userModel){
        userService.updateUser(userModel);
        return new ResponseEntity<>(userModel, HttpStatus.OK);
    }

    //alter table lance add constraint fk_user foreign key(id_usuario) references usuario(id_user);
    @RequestMapping("/list")
    public List<UserModel> obtemUsers(){
      return userService.listUsers();
    }

    @GetMapping("/{idUser}")
    public UserModel obtemUser(@PathVariable Long idUser){
        return userService.getUser(idUser);
    }

    @GetMapping("/delete/{idUser}")
    public void deletaUser(@PathVariable Long idUser){
        userService.delUser(idUser);
    }

    /*
    @GetMapping("/userValidate")
    public ResponseEntity<Boolean> validaLogin(@RequestParam String userName, @RequestParam String password){
        return userService.loginValidation(userName, password);
    }
    */

    @RequestMapping("/obtem/{userName}")
    public UserModel findByUserName(@PathVariable String userName){ return userService.findByUserName(userName);}

}
