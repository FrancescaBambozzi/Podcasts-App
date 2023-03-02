import { useState, useEffect } from "react";
import xml2js from 'xml-js';

const useFetch = (url) => {
    const [podcasts, setPodcasts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [podCastDetails, setPodcastDetails] = useState({});
    const [feedUrl, setFeed] = useState(null);
    const [description, setDescription] = useState("");
    const [episodes, setEpisodes] = useState([]);
    
    //fetch the podcasts
    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw Error("Failed to fetch podcasts");
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
    }, [url]);

    //fetch podcast by id
    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw Error("Failed to fetch details");
                }
                return res.json();
            })
            .then(data => {
                const details = JSON.parse(data.contents);
                setPodcastDetails(details.results[0]);
                setFeed(details.results[0].feedUrl);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err.message)
            })
    }, [url]);

    //fetch feedUrl data in JSON format
    useEffect(() => {
        fetch(feedUrl)
            .then(res => {
                if (!res.ok) {
                    throw Error("Failed to fetch XML data");
                }
                return res.text();
            })
            .then(data => {
                let jsonData = xmlToJson(data);
                let description = jsonData.rss.channel.description._cdata || jsonData.rss.channel.description._text;
                setDescription(description);
                let episodes = jsonData.rss.channel.item;
                setEpisodes(episodes);
            })
            .catch(err => {
                console.log(err.message)
            })
    })

    //convert XML string in JSON object
    function xmlToJson(xmlString) {
        const options = { compact: true, ignoreComment: true, spaces: 4 };
        const json = xml2js.xml2json(xmlString, options);
        return JSON.parse(json);;
    }

    return { podcasts, isLoading, podCastDetails, description, episodes };

}

export default useFetch;