import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import DefineWord from '../wordreference/DefineWord'

function SingleNew(props) {
    const { title, picture } = props
    /* Text will be extracted from the new in the future (stored in props), this is just temporary */
    const text = "PETRONIUS woke only about midday, and as usual greatly wearied. The evening before he had been at one of Nero’s feasts, which was prolonged till late at night. For some time his health had been failing. He said himself that he woke up benumbed, as it were, and without power of collecting his thoughts. But the morning bath and careful kneading of the body by trained slaves hastened gradually the course of his slothful blood, roused him, quickened him, restored his strength, so that he issued from the elæothesium, that is, the last division of the bath, as if he had risen from the dead, with eyes gleaming from wit and gladness, rejuvenated, filled with life, exquisite, so unapproachable that Otho himself could not compare with him, and was really that which he had been called,—arbiter elegantiarum."

    const [showModal, setShowModal] = useState(false);
    const [selectedWord, setSelectedWord] = useState('');

    const handleWordClick = (word) => {
        setSelectedWord(word);
        setShowModal(true)
    };

    const words = text.split(" ")

    return (
        <div>
            <h3>{title}</h3>
            <img className="rounded" src={picture}></img>
            <p>
                {words.map((word, index) => (
                    <span key={index} className="d-inline-block me-1" style={{cursor: "pointer"}} onClick={() => handleWordClick(word)}>{word}</span>
                ))}
            </p>
            <p className="text-secondary">This text is temporary and is expected to be extracted from the new body</p>
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