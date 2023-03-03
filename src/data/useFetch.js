import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [podcasts, setPodcasts] = useState(JSON.parse(localStorage.getItem("savedPodcasts")) || []);
    const [isLoading, setIsLoading] = useState(true);

    //fetch the podcasts
    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw Error("Failed to fetch podcasts");
                }
                return res.json();
            })
            .then(data => {
                setPodcasts(data.feed.entry);
                setIsLoading(false);
                localStorage.setItem('savedPodcasts', JSON.stringify(data.feed.entry));
            })
            .catch(err => {
                console.log(err.message);
            })
    }, [url]);

    return { podcasts, isLoading };

}

export default useFetch;