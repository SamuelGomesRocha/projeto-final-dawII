package br.edu.ifg.llprjct.user.services;

import br.edu.ifg.llprjct.user.enums.Acesso;
import br.edu.ifg.llprjct.user.models.UserModel;
import br.edu.ifg.llprjct.user.repositories.UserRepository;
import br.edu.ifg.llprjct.user.request.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

//Camada intermediária entre o Repository e o Controller
@Service
public class UserService {


    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    //@Autowired
   // PasswordEncoder encoder;

    public void createUser(UserModel userModel) {
        userModel.setAcesso(Acesso.PROPONENTE);
        userModel.setPassword(encoder.encode(userModel.getPassword()));
        String i = userModel.getIconUser();
        if(i.isBlank() || i.isEmpty()){
            userModel.setIconUser(
                    "https://s2.glbimg.com/RP3Yd_uhReqH3w0SwlBEvC6ZY84=/620x520/smart/e.glbimg.com/og/ed/f/original/2021/05/12/basquiat-in-this-case_sjCxqMt.jpg"
            );
        }
        userRepository.save(userModel);
    }


    public void updateUser(UserModel userModel) {
       userModel.setPassword(encoder.encode(userModel.getPassword()));
        userRepository.save(userModel);
    }

    public List<UserModel> listUsers(){
       List<UserModel> users = userRepository.findAll();
       return users;
    }

    public UserModel getUser(Long id){
        Optional<UserModel> userReturned = userRepository.findById(id);
        return userReturned.get();
    }

    @Transactional
    public void delUser(Long idUser) {
         userRepository.deleteById(idUser);
    }




    public LoginRequest loginValidation(String userName, String password){

        Optional<UserModel> user = userRepository.findByUserName(userName);

        if(user.isEmpty()){
            return new LoginRequest();
        }

        UserModel userTrue = user.get();
     //   boolean valid = encoder.matches(password, userTrue.getPassword());
        LoginRequest newLog = new LoginRequest();
    //    HttpStatus status = (valid) ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;
        newLog.setUserName(userTrue.getUserName());
        newLog.setPassword(userTrue.getPassword());
        return newLog;
    }

    public UserModel findByUserName(String userName) {
        return userRepository.findByUserName(userName).get();
    }
}
