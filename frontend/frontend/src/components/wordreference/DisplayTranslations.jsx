function DisplayTranslations({ translations }) {
    if (!translations || translations.length == 0) {
        return <div class="error">Could not find the word in the english dictionary</div>
    } else {
        return (
            <div>
                {translations.map((usage, i) => (
                    <div key={i}>
                        <p>{usage.title}</p>
                        {usage.examples.map((example, i) => (
                            <div key={i}>
                                <p><strong>{example.phrase}</strong> {example.translations.join(", ")}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        )
    }
}

export default DisplayTranslations