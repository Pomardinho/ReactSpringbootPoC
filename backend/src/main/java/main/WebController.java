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
    @GetMapping("/bbc")
    public String news() throws IOException {
        JSONObject newsObject = new JSONObject();
        JSONArray newsArray = new JSONArray();

        Document bbc = Jsoup.connect("https://www.bbc.com").get();
        Elements newsUrl = bbc.select("div.module__content li.media-list__item");

        for (Element singleNew : newsUrl) {
            Element titleElement = singleNew.selectFirst("h3.media__title a");
            String url = (titleElement != null) ? titleElement.absUrl("href") : "";

            if (!url.isEmpty()) {
                JSONObject singleNewObject = processSingleNews(url);
                newsArray.put(singleNewObject);
            }
        }
        
        newsObject.put("news", newsArray);
        return newsObject.toString();
    }

    private JSONObject processSingleNews(String url) throws IOException {
        JSONObject singleNewObject = new JSONObject();
        Document newsPage = Jsoup.connect(url).get();
    
        String title = extractTitle(newsPage);
    
        Element imageElement = newsPage.selectFirst("img.ssrcss-evoj7m-Image");
        String imageUrl = (imageElement != null) ? imageElement.attr("src") : "";
        
        singleNewObject.put("title", title);
        singleNewObject.put("url", url);
        singleNewObject.put("image", imageUrl);

        JSONArray paragraphsArray = extractParagraphs(newsPage);
        singleNewObject.put("paragraphs", paragraphsArray);

        return singleNewObject;
    }

    private String extractTitle(Document doc) {
        String[] selectors = {
            "h1.ssrcss-15xko80-StyledHeading",
            "h1.ssrcss-nsdtmh-StyledHeading e10rt3ze0",
            "h1.gs-c-promo-heading__title",
            "h1.article-headline__text"
        };
    
        for (String selector : selectors) {
            Element titleElement = doc.selectFirst(selector);
            if (titleElement != null) {
                return titleElement.text();
            }
        }
    
        return "";
    }

    private JSONArray extractParagraphs(Document doc) {
        Elements paragraphs = doc.select("p.ssrcss-1q0x1qg-Paragraph");
        JSONArray paragraphsArray = new JSONArray();

        for (Element paragraph : paragraphs) {
            paragraphsArray.put(paragraph.text());
        }
    
        return paragraphsArray;
    }
}
