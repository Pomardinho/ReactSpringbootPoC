import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SingleNew from './SingleNew'

function BBC() {
    document.title = "BBC news"
    const [news, setNews] = useState([]);
    const [selectedNewIndex, setSelectedNewIndex] = useState(null);
    
    useEffect(() => {
        fetch("http://localhost:8080/news").then(res => res.json()).then(data => {
            setNews(data.news)
            console.log(data.news)
        })
    }, [])

    const displaySingleNew = (index) => {
        setSelectedNewIndex(index);
    };

    return (
        <div className="container text-light">
            <h1>BBC news</h1>
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
    )
}

export default BBC