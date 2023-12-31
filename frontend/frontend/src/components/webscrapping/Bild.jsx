import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SingleNew from './SingleNew'

function Bild() {
    document.title = "Bild news"
    const [news, setNews] = useState([])
    const [selectedNewIndex, setSelectedNewIndex] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch("http://localhost:8080/bild")
            .then(res => res.json())
            .then(data => {
                setNews(data.news)
                setIsLoading(false)
                console.log(data.news)
            })
            .catch(error => {
                console.error('Error fetching data:', error)
                setIsLoading(false)
            })
    }, [])

    const displaySingleNew = (index) => {
        setSelectedNewIndex(index)
    }

    return (
        <div className="container text-light">
            <h1>BILD NEWS</h1>
            <a href="https://www.bild.de" target="_blank" className="text-decoration-none"><p className="text-secondary">https://www.bild.de</p></a>
            {isLoading ? (
                    <div className="spinner-border ms-auto text-primary" role="status" aria-hidden="true"></div>
            ) : (
                <div>
                    {selectedNewIndex !== null ? (
                        <SingleNew title={news[selectedNewIndex].title} image={news[selectedNewIndex].image} paragraphs={news[selectedNewIndex].paragraphs}/>
                    ) : (
                        <div className="row">
                            {news.map((item, index) => (
                                <div className="col-md-6 mb-3" key={index} onClick={() => displaySingleNew(index)}>
                                    <div className="bg-black bg-opacity-25 rounded p-2">
                                        <img className="img-fluid rounded" src={item.image} alt={item.title} />
                                        <p>{item.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Bild
