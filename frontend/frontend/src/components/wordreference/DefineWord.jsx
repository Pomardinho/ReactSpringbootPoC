import React, { useState, useEffect } from 'react'
import { defineWord } from 'wordreference'
import DisplayTranslations from './DisplayTranslations'
import 'bootstrap/dist/css/bootstrap.min.css'

function DefineWord({ word }) {
    const [wordData, setWordData] = useState(false)
    const [translations, setTranslations] = useState(null)
    const [wordExists, setWordExists] = useState(false)

    useEffect(() => {
        const fetchData = async() => {
            const result = await defineWord(word, `English-Spanish`);
            if (result.sections && result.sections.length > 0) {
                setWordExists(true)
                setWordData(result)
                setTranslations(parseTranslations(result))
            } else {
                setWordExists(false)
            }
        }

        fetchData()
    }, [word])
    

    const parseTranslations = (result) => {
        const parsedTranslations = []
        result.sections.forEach((section) => {
            if (section.title != "Traductions supplémentaires" && section.translations 
            && section.translations.length > 0 && section.translations[0].examples
            && section.translations[0].examples.length > 0) {
                const usage = {
                    title: section.title,
                    examples: section.translations.map((translation) => {
                        const firstExample = translation.examples[0] || {}
                        return { 
                            phrase: firstExample.phrase || "", 
                            translations: firstExample.translations || []
                        }
                    })
                }

                parsedTranslations.push(usage)
            }
        })
        
        return parsedTranslations
    }

    return (
        <div className="text-light">
            {wordExists ? (wordData && <DisplayTranslations data={wordData}/>) : (<p>There is no word "{word}" in the dictionary.</p>)}
        </div>
    )
}

export default DefineWord