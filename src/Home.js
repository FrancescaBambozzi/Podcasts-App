import { useState } from "react";
import PodcastsList from "./PodcastsList";
import Header from "./Header";
import useFetch from "./data/useFetch";

const Home = () => {
    const { podcasts, isLoading } = useFetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
    const [searchTerm, setSearchTerm] = useState('');

    // Filter podcasts based on search term
    const filteredPodcasts = podcasts.filter((item) => {
        let name = item["im:name"].label;
        let author = item["im:artist"].label;
        return name.toLowerCase().includes(searchTerm.toLowerCase()) || author.toLowerCase().includes(searchTerm.toLowerCase())
    });

    return (
        <div className="page-container">
            <Header isLoading={isLoading} />
            <div className="search-container">
                <p className="count">{podcasts.length}</p>
                <input className="search-input" type="search" placeholder="Filter podcasts..." value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            {!isLoading && (<PodcastsList filteredPodcasts={filteredPodcasts} />)}
        </div>
    );
}

export default Home;