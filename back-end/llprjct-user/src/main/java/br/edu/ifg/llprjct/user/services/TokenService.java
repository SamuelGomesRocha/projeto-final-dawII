package br.edu.ifg.llprjct.user.services;

import br.edu.ifg.llprjct.user.models.UserModel;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class TokenService {

    @Value("${jwt.expiration}")
    private String expiration;

    @Value("${jwt.secret}")
    private String secret;

    public String generateToken(Authentication authentication){
        System.out.println("Gerando token");
        UserModel usuarioLogado = (UserModel) authentication.getPrincipal();
        Date today = new Date();
        Long exp = new Long(expiration);
        Date expiracao = new Date(today.getTime()+exp);


        return Jwts.builder()
                .setIssuer("llprjct-user")
                .setSubject(usuarioLogado.getUserName())
                .setIssuedAt(today)
                .setExpiration(expiracao)
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    public boolean validToken(String token){
        try {
            Jwts.parser().setSigningKey(this.secret).parseClaimsJws(token);
            return true;
        }catch(Exception e){
            return false;
        }
    }


    public String getUserName(String token){
        Jws<Claims> jwsClaims = Jwts.parser().setSigningKey(this.secret).parseClaimsJws(token);
        Claims body = jwsClaims.getBody();
        return body.getSubject();
    }

}
