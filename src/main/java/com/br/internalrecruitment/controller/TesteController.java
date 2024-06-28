package com.br.internalrecruitment.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class TesteController {

    @RequestMapping("/teste/**")
    public String redirectTest() {
        // Redireciona a rota /teste para o index.html do Angular
        return "forward:/index.html";
    }
//    @RequestMapping(value = "/{[path:[^\\.]*}")
//    public String redirect() {
//        return "forward:/index.html";
//    }
}