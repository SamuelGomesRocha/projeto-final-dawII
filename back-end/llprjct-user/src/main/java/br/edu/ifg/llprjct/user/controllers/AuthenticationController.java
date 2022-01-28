package br.edu.ifg.llprjct.user.controllers;


import br.edu.ifg.llprjct.user.dtos.TokenDTO;
import br.edu.ifg.llprjct.user.models.UserModel;
import br.edu.ifg.llprjct.user.request.LoginRequest;
import br.edu.ifg.llprjct.user.services.TokenService;
import br.edu.ifg.llprjct.user.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    UserService userService;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<TokenDTO> doAuthentication(@RequestBody LoginRequest loginRequest){
            UsernamePasswordAuthenticationToken dadosLogin = loginRequest.converter();
            Authentication authentication = manager.authenticate(dadosLogin);
            String token = tokenService.generateToken(authentication);
            return ResponseEntity.ok(new TokenDTO(token, "Bearer "));
    }
}
