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
    private static final String USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36";
    
    @GetMapping("/bbc")
    public String bbc() {
        JSONObject newsObject = new JSONObject();
        JSONArray newsArray = new JSONArray();
        
        try {
            Document bbc = Jsoup.connect("https://www.bbc.com").userAgent(USER_AGENT).get();
            Elements newsUrl = bbc.select("div.module__content li.media-list__item");
    
            for (Element singleNew : newsUrl) {
                Element title = singleNew.selectFirst("h3.media__title a");
                String url = (title != null) ? title.absUrl("href") : "";
    
                if (!url.isEmpty()) {
                    JSONObject singleNewObject = processSingleNews(url);
                    newsArray.put(singleNewObject);
                }
            }

        } catch (IOException e) {
            System.out.println("\n[ERROR: " + e.getMessage() + "]");
        }
        
        newsObject.put("news", newsArray);
        return newsObject.toString();
    }

    @GetMapping("bild")
    public String bild() {
        JSONObject newsObject = new JSONObject();
        JSONArray newsArray = new JSONArray();

        try {
            Document bild = Jsoup.connect("https://www.bild.de").userAgent(USER_AGENT).get();
            Elements newsUrl = bild.select("section.block");
    
            for (Element singleNew : newsUrl) {
                Element urlContainer = singleNew.selectFirst("article a");
                String url = urlContainer.absUrl("href");
    
                if (!url.isEmpty()) {
                    JSONObject singleNewObject = processSingleNews(url);
                    newsArray.put(singleNewObject);
                }
            }
    
        } catch (IOException e) {
            System.out.println("\n[ERROR: " + e.getMessage() + "]");
        }
        
        newsObject.put("news", newsArray);
        return newsObject.toString();
    }

    private JSONObject processSingleNews(String url) throws IOException {
        JSONObject singleNewObject = new JSONObject();
        Document newsPage = Jsoup.connect(url).get();
    
        String title = extractTitle(newsPage);
        String image = extractImage(newsPage);
        
        singleNewObject.put("title", title);
        singleNewObject.put("url", url);
        singleNewObject.put("image", image);

        JSONArray paragraphsArray = extractParagraphs(newsPage);
        singleNewObject.put("paragraphs", paragraphsArray);

        return singleNewObject;
    }

    private String extractTitle(Document doc) {
        String[] selectors = {
            "h1.ssrcss-15xko80-StyledHeading",
            "h1.ssrcss-nsdtmh-StyledHeading e10rt3ze0",
            "h1.gs-c-promo-heading__title",
            "h1.article-headline__text",
            "h2.article-title span.article-title__headline"
        };
    
        for (String selector : selectors) {
            Element title = doc.selectFirst(selector);
            if (title != null) {
                return title.text();
            }
        }
    
        return "";
    }

    private String extractImage(Document doc) {
        String[] selectors = {
            "img.ssrcss-evoj7m-Image",
            "img[class='']"
        };
        
        for (String selector : selectors) {
            Element image = doc.selectFirst(selector);
            if (image != null) {
                return image.absUrl("src");
            }
        }
        
        return "";
    }

    private JSONArray extractParagraphs(Document doc) {
        JSONArray paragraphsArray = new JSONArray();
        
        String[] selectors = {
            "p.ssrcss-1q0x1qg-Paragraph",
            "p:not([class])"
        };
        
        for (String selector : selectors) {
            Elements pragraphs = doc.select(selector);
            for (Element paragraph : pragraphs) {
                paragraphsArray.put(paragraph.text());
            }
        }

        return paragraphsArray;
    }
}
