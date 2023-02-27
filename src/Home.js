import { useState, useEffect } from "react";
import PodcastsList from "./PodcastsList";
import Header from "./Header";

const Home = () => {
    const [podcasts, setPodcasts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchInput, setSearchInput] = useState(" ");

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

    const searchPodcast = (event) => {
        const search = event.target.value;
        setSearchInput(search);
    }

    //filter the list of podcasts by title and author
    const filteredPodcasts = podcasts.filter((podcast) => {
        const name = podcast["im:name"].label;
        const artist = podcast["im:artist"].label;
        if (name.includes(searchInput) || artist.includes(searchInput)) {
            return name, artist;
        }
    });

    console.log(podcasts)

    return (
        <div className="page-container">
            <Header isLoading={isLoading} />
            <div className="search-container">
                <p className="count">{podcasts.length}</p>
                <input className="search-input" type="search" placeholder="Filter podcasts..." onChange={searchPodcast} />
            </div>
            {filteredPodcasts && <PodcastsList filteredPodcasts={filteredPodcasts} />}
        </div>
    );
}

export default Home;