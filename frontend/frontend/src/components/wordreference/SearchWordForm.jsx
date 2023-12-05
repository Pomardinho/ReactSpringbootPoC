import React, { useState, useEffect } from 'react'
import { defineWord } from 'wordreference'
import DisplayTranslations from './DisplayTranslations'

function SearchWordForm() {
    const [word, setWord] = useState("")
    const [language, setLanguage] = useState("Spanish")
    const [translations, setTranslations] = useState(null)
    const [submitted, setSubmitted] = useState(false)

    const SearchWord = async (e) => {
        e.preventDefault()
        const result = await defineWord(word, `English-${language}`)
        setTranslations(parseTranslations(result))
        setSubmitted(true)
    }

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

    useEffect(() => {
        if (submitted) {
            SearchWord()
        }

        setSubmitted(false)
    }, [submitted])

    return (
        <div>
            <h1>Search words in English and get the translation!</h1>
            <form onSubmit={SearchWord}>
                <label>Translate </label>
                <input type="text" value={word} onChange={(e) => setWord(e.target.value)} placeholder="any word" required/>
                <label> to: </label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="Italian">Italian</option>
                </select>
                <br/>
                <button type="submit">Go!</button>
            </form>

            {translations && (<DisplayTranslations translations={translations}/>)}
        </div>
    )
}

export default SearchWordForm