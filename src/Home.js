import { useState, useEffect } from "react";
import PodcastsList from "./PodcastsList";
import Header from "./Header";

const Home = () => {
    const [podcasts, setPodcasts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

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
        }, 100);
    }, []);

    // Filter items based on search term
    const filteredItems = podcasts.filter((item) => {
        let name = item["im:name"].label;
        let author = item["im:artist"].label;
        return name.toLowerCase().includes(searchTerm.toLowerCase()) || author.toLowerCase().includes(searchTerm.toLowerCase())
    });

    return (
        <div className="page-container">
            <Header isLoading={isLoading} />
            <div className="search-container">
                <p className="count">{podcasts.length}</p>
                <input type="search" placeholder="Filter podcasts..." value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            {podcasts && <PodcastsList filteredItems={filteredItems} />}
        </div>
    );
}

export default Home;