import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function DisplayTranslations({ data }) {
    const handleAudioPlay = (audioUrl) => {
        const audio = new Audio(audioUrl);
        audio.play();
    };

    return (
        <div>
            <div className="row align-items-center">
                <h1 className="col-auto">{data.inputWord}</h1>
                {data.audioLinks && data.audioLinks.length > 0 && (
                    <button className="col-auto btn btn-secondary" onClick={() => handleAudioPlay(data.audioLinks[0])}>🔊</button>
                )}
            </div><br/>
            
            {data.sections.map((section, index) => (
                <div key={index}>
                    <h3>{section.title}</h3>
                    {section.translations && section.translations.map((translation, idx) => (
                        <div key={idx}>
                            <p>{idx + 1}. {translation.meanings[0].word} <span className="text-primary">[{translation.meanings[0]?.pos}] </span> 
                                {translation.word.word} ({translation.definition})<br/>
                                {translation.examples && translation.examples.map((example, i) => (
                                    <span className="text-secondary">{example.phrase} <i>{example.translations}</i></span>
                                ))}
                            </p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default DisplayTranslations