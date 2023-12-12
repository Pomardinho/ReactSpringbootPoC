package main;

import java.io.IOException;
import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class WebController {
    @GetMapping("/news")
    public String news() throws IOException {
        JSONObject newsObject = new JSONObject();
        JSONArray newsArray = new JSONArray();

        Document bbc = Jsoup.connect("https://www.bbc.com/mundo").get(); //CAMBIAR POR https://www.bbc.com
        Elements newsHeadlines = bbc.select("h3.ea6by782");
        Elements newsPictures = bbc.select("div.ea6by784 div.bbc-sni631");

        for (int i = 0; i < newsHeadlines.size(); i++) {
            Element headline = newsHeadlines.get(i);
            Element pictures = newsPictures.get(i);

            Element link = headline.selectFirst("a");
            String title = headline.text();
            String url = link.absUrl("href");

            Element source = pictures.selectFirst("source");
            String[] picturesSrc = source.attr("srcset").split("\\s+");
            String picture = picturesSrc[picturesSrc.length - 2];
            
            JSONObject singleNew = new JSONObject();
            singleNew.put("title", title);
            singleNew.put("url", url);
            singleNew.put("picture", picture);
            
            newsArray.put(singleNew);
        }
        
        newsObject.put("news", newsArray);
        return(newsObject.toString());    
    }
}
