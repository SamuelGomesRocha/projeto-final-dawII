package br.edu.ifg.llprjct.user.security;

import br.edu.ifg.llprjct.user.models.UserModel;
import br.edu.ifg.llprjct.user.repositories.UserRepository;
import br.edu.ifg.llprjct.user.services.TokenService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;


public class AuthenticationFilter extends OncePerRequestFilter {

    private TokenService tokenService;
    private UserRepository userRepository;


    public AuthenticationFilter(TokenService tokenService, UserRepository userRepository){
        this.tokenService = tokenService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
            String token = extractToken(request);
            boolean validToken = tokenService.validToken(token);
            if(validToken){
                realizaAutenticacaoTokenOnSpring(token);
            }

            filterChain.doFilter(request, response);
    }


    private void realizaAutenticacaoTokenOnSpring(String token){
        String userName = tokenService.getUserName(token);
        UserModel user = userRepository.findByUserName(userName).get();
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
        SecurityContextHolder.getContext().setAuthentication(auth);
    }

    private String extractToken(HttpServletRequest request){
        System.out.println("Extraindo");
        String token = "";
        String authorization = request.getHeader("Authorization");
        System.out.println("Authorization: "+authorization);


        if(authorization==null || authorization.isBlank()){
            System.out.println("Retornando null");
            return null;
        }else{
            token = authorization.substring(7, authorization.length());
        }


        return token;
    }


}
