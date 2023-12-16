package main;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import utils.WebScrapping;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class WebController {
    private final WebScrapping webScrapping = new WebScrapping();

    @GetMapping("/bbc")
    public String bbc() {
        return webScrapping.getWebContent("https://www.bbc.com");
    }

    @GetMapping("bild")
    public String bild() {
       return webScrapping.getWebContent("https://www.bild.de");
    }
}
