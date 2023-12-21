import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DefineWord from '../wordreference/DefineWord'

function SingleNew(props) {
    const { title, image, paragraphs } = props
    const [translatedText, setTranslatedText] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedWord, setSelectedWord] = useState('')
    
    const text = paragraphs.join("\n");
    const words = text.split(" ")

    useEffect(() => {
        fetch(`http://localhost:8080/translate?text=${encodeURIComponent(text)}`)
        .then(res => res.text())
        .then(data => {
            console.log("translating text")
            setTranslatedText(data)
        })
        .catch(error => {
            console.log('Error fetching data:', error)
        })
    }, [text])

    const handleWordClick = (word) => {
        setSelectedWord(word);
        setShowModal(true)
    };
    
    return (
        <div>
            <h3>{title}</h3>
            <img className="rounded" src={image}></img>
            <p>
                {words.map((word, index) => (
                    <span key={index} className="d-inline-block me-1" style={{cursor: "pointer"}} onClick={() => handleWordClick(word)}>{word}</span>
                ))}
            </p>
            <p className="text-secondary">{translatedText}</p>
            <button className="btn btn-success mt-3" onClick={() => window.location.reload()}>Go back</button>

            <div className={`modal ${showModal ? 'show' : ''}`} id="myModal" tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                <div className="modal-content bg-dark">
                    <div className="modal-header" data-bs-theme="dark">
                        <h5 className="modal-title">Word definition</h5>
                        <button type="button" className="btn btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <DefineWord word={selectedWord.replace(/[^(\w\s-)]+|(\s|-){2,}/g, '')}/>
                    </div>
                </div>
                </div>
            </div>
            <div className={`modal-backdrop fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}></div>
        </div>
    )
}

export default SingleNew