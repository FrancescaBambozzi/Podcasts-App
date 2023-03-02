import { useState, useEffect } from "react";

const useFetch = () => {
    const [podcasts, setPodcasts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
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
    });

    return { podcasts, isLoading }
}

export default useFetch;