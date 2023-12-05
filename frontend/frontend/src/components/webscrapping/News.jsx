import React, { useState, useEffect } from 'react';

function News() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/news").then(res => res.json()).then(data => {
            setNews(data.news)
            console.log(data.news)
        })
    }, [])

    return (
        <div>
            <h1>News</h1>
            {news.map((item, index) => (
                <div key={index}>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                        <img src={item.picture} alt={item.title} />
                        <p>{item.title}</p>
                    </a>
                </div>
            ))}
        </div>
    )
}

export default News