package utils;

import com.deepl.api.DeepLException;
import com.deepl.api.TextResult;
import com.deepl.api.Translator;
import org.springframework.stereotype.Service;

@Service
public class DeeplService {
    Translator translator;

    public String translate(String text, String targetLang) {
        String authKey = "cf9065c6-48b6-c695-0b55-3a5395074adc:fx";
        translator = new Translator(authKey);
        TextResult result = null;

        try {
            result = translator.translateText(text, null, targetLang);
        } catch (DeepLException | InterruptedException e) {
            System.out.println("\n[ERROR: " + e.getMessage() + "]");
        }

        return result != null ? result.getText() : "";
    }
}
