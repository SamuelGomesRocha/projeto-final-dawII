package br.ifg.edu.leilao.services;

import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.context.annotation.Configuration;


    @Configuration
    public class CustomContainer implements WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> {
        public void customize(ConfigurableServletWebServerFactory factory){
            factory.setPort(8042);
        }
    }

