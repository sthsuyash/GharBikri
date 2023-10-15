package com.suyash.gharbikriserver.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Home {
    @GetMapping("/")
    public String home() {
        return "Gharbikri API V2";
    }

    @GetMapping("/test-secure")
    public String testSecure() {
        return "Security test api";
    }

}
