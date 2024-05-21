package com.truyenvn.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {

    @GetMapping("/demo")
    public ResponseEntity<String> sayHello(){
        return ResponseEntity.ok("Vãi ò được rồi kìa :0");
    }

    @GetMapping("/admin")
    public ResponseEntity<String> admin(){
        return ResponseEntity.ok("Vãi ò được cả admin rồi kìa :0");
    }
}
