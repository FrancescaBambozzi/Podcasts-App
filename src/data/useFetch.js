import { useState, useEffect } from "react";
import xml2js from 'xml-js';

const useFetch = (url) => {
    const [podcasts, setPodcasts] = useState(JSON.parse(localStorage.getItem("podcasts")) || []);
    const [isLoading, setIsLoading] = useState(true);
    const [podCastDetails, setPodcastDetails] = useState(JSON.parse(localStorage.getItem("podCastDetails")) || {});
    const [jsonData, setJSONData] = useState(JSON.parse(localStorage.getItem("jsonData")) || {});

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
                localStorage.setItem('podcasts', JSON.stringify(data.feed.entry));
                setPodcasts(data.feed.entry);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err.message);
            })
    }, [url, podcasts]);

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
                localStorage.setItem('podCastDetails', JSON.stringify(details.results[0]));
                setPodcastDetails(details.results[0]);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err.message)
            })
    }, [url, podCastDetails]);

    //fetch feedUrl data in JSON format
    useEffect(() => {
        fetch(podCastDetails.feedUrl)
            .then(res => {
                if (!res.ok) {
                    throw Error("Failed to fetch XML data");
                }
                return res.text();
            })
            .then(data => {
                let jsonData = xmlToJson(data);
                localStorage.setItem('jsonData', JSON.stringify(jsonData.rss.channel));
                setJSONData(jsonData.rss.channel);
            })
            .catch(err => {
                console.log(err.message)
            })
    }, [jsonData])

    //convert XML string in JSON object
    function xmlToJson(xmlString) {
        const options = { compact: true, ignoreComment: true, spaces: 4 };
        const json = xml2js.xml2json(xmlString, options);
        return JSON.parse(json);
    }

    return { podcasts, isLoading, podCastDetails, jsonData };

}

export default useFetch;