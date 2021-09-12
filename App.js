import React, {useState, useEffect, useRef} from "react";
import './App.css';

const App = () => {
    const [nowQuote, setNowQuote] = useState("");
    const [author, setAuthor] = useState("");

    const [prevQuote, setPrevQuote] = useState("");
    const [prevAuthor, setPrevAuthor] = useState("");

    const textRef = useRef();
    let colors = ["#d62020", "#460707", "#6816d3", "#301504", "#360321"];

    const getQuote = () => {
        fetch('https://type.fit/api/quotes')
        .then((res) => res.json())
        .then((data) => {
            let randomNum = Math.floor(Math.random() * data.length);
            setPrevQuote(nowQuote);
            setPrevAuthor(author);

            setNowQuote(data[randomNum].text);
            setAuthor(data[randomNum].author);
        });
    };

    useEffect(() => {
        getQuote();
    }, []);

    useEffect(() => {
        textRef.current.style.color = colors[Math.floor(Math.random() * colors.length)];
    }, [nowQuote]);

    const prevClick = () => {
        setNowQuote(prevQuote);
        setAuthor(prevAuthor);
    }

    return (
        <>
            <div id="quote-box">
                <h1 id="author">{author}</h1>
                <hr/>
                <p ref={textRef} id="text">{nowQuote}</p>

                <div id="infopad">
                    <button onClick={prevClick} id="old-quote">Previous Quote</button>

                    <a
                        className="tweetify"
                        href={`https://twitter.com/intent/tweet?text=${nowQuote} - ${author}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        id="tweet-quote"
                    >
                        Tweetify
                    </a>

                    <button onClick={getQuote} id="new-quote">Next Quote</button>
                </div>
            </div>
        </>
    );
}

export default App;
