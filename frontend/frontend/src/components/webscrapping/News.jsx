import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function News() {
    document.title = "News"
    const [news, setNews] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:8080/news").then(res => res.json()).then(data => {
            setNews(data.news)
            console.log(data.news)
        })
    }, [])

    return (
        <div class="container text-light">
            <h1>News</h1>
            <div class="row">
                {news.map((item, index) => (
                    <div class="col-md-6 mb-3" key={index}>
                        <div class="bg-black bg-opacity-25 rounded p-2">
                            <img class="img-fluid rounded" src={item.picture} alt={item.title}/>
                            <a class="link-primary" href={item.url} target="_blank" rel="noopener noreferrer">
                                <p>{item.title}</p>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default News