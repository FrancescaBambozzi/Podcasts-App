import { useState, useEffect } from "react";
import PodcastsList from "./PodcastsList";

const Home = () => {
    const [podcasts, setPodcasts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
                .then(res => {
                    if (!res.ok) {
                        throw Error("Failed to fetch data");
                    }
                    return res.json()
                })
                .then(data => {
                    setPodcasts(data.feed.entry);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.log(err.message)
                })
        }, 500);
    }, []);

    return (
        <div className="home">
            <h1>Podcaster</h1>
            {isLoading && <div>Loading ...</div>}
            {podcasts && <PodcastsList podcasts={podcasts} />}
        </div>
    );
}

export default Home;