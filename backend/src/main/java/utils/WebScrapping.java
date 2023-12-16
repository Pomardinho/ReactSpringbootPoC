package utils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class WebScrapping {
    private final String USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36";
    
    public WebScrapping() {}
    
    public String getWebContent(String webUrl) {
        JSONObject newsObject = new JSONObject();
        JSONArray newsArray = new JSONArray();

        try {
            Document web = Jsoup.connect(webUrl).userAgent(USER_AGENT).get();
            List<String> newsUrls = extractNewsUrls(web);

            for (String singleNewUrl : newsUrls) {
                JSONObject singleNewObject = processSingleNew(singleNewUrl);
                newsArray.put(singleNewObject);
            }

            //Elements newsUrls = web.select("div.module__content li.media_list__item"); //section.block
        } catch (IOException e) {
            System.out.println("\n[ERROR: " + e.getMessage() + "]");
        }

        newsObject.put("news", newsArray);
        return newsObject.toString();
    }

    private List<String> extractNewsUrls(Document doc) {
        List<String> newsUrls = new ArrayList<>();
        
        String[] selectors = {
            "h3.media__title a",
            "article a"
        };
        
        for (String selector : selectors) {
            Elements urlElements = doc.select(selector);
            for (Element urlElement : urlElements) {
                String newsUrl = urlElement.absUrl("href");
                if (!newsUrl.isEmpty()) {
                    newsUrls.add(newsUrl);
                }
            }
        }
    
        return newsUrls;
    }

    private JSONObject processSingleNew(String url) throws IOException {
        JSONObject singleNewObject = new JSONObject();
        Document newsPage = Jsoup.connect(url).userAgent(USER_AGENT).get();
    
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
