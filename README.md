# ReactSpringbootPoC
## Como inicializar el proyecto?
<p>Como el proyecto está separado en dos carpetas, backend y frontend, habrá que encender React y Tomcat (Springboot) por separado. Para ello, sigue estos pasos:</p>
<ol> 
  <li>Descarga el .zip del código.</li>
  <li>Abre el proyecto en Visual Studio Code.</li>
  <li>Abre un terminal del proyecto [Ctrl + Shift + ñ] y escribe 'cd .\frontend\frontend\'. Dentro de la carpeta escribe 'npm run dev'. <b>React ya está encendido en http://localhost:5173/</b>.</li>
  <li>Dírigete al archivo ubicado en <i>backend > src > main > java > main > MainApplication.java</i> y ejecuta [Run] el archivo (justo antes del método main deberia aparecer "Run|Debug").
    <b>Springboot ya está encendido en http://localhost:8080/</b>.</li>
</ol>
<p>Ahora que ya está todo encendido, accede a http://localhost:5173/news para ver las noticias o a http://localhost:5173/wordreference para buscar palabras en el diccionario.</p>
