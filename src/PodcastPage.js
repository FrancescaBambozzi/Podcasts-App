import { useParams } from "react-router-dom";
import Header from "./Header";
import xml2js from 'xml-js';
import { useState, useEffect } from "react";
import Podcast from "./Podcast";
import EpisodesList from "./EpisodesList";
import Episode from "./Episode";

const PodcastPage = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [podcastDetails, setPodcastDetails] = useState(JSON.parse(localStorage.getItem("savedPodcastDetails")) || {});
    const [feedData, setFeedData] = useState(JSON.parse(localStorage.getItem("savedFeedData")) || {});
    const [showEpisode, setShowEpisode] = useState(false);

    const handleShowEpisode = () => {
        setShowEpisode(true);
    }

    const handleReset = () => {
        setShowEpisode(false);
    }

    //convert XML string in JSON object
    function xmlToJson(xmlString) {
        const options = { compact: true, ignoreComment: true, spaces: 4 };
        const json = xml2js.xml2json(xmlString, options);
        return JSON.parse(json);
    }

    //fetch podcast by id
    useEffect(() => {
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://itunes.apple.com/lookup?id=' + `${id}`)}`)
            .then(res => {
                if (!res.ok) {
                    throw Error("Failed to fetch details");
                }
                return res.json();
            })
            .then(data => {
                //parse the string data contents into a JSON object
                const details = JSON.parse(data.contents);
                setPodcastDetails(details.results[0]);
                localStorage.setItem('savedPodcastDetails', JSON.stringify(details.results[0]));
                setIsLoading(false);
            })
            .catch(err => {
                console.log("Fetch podcast by id error:", err.message)
            })
    }, [id]);

    //fetch data in JSON format
    useEffect(() => {
        fetch(podcastDetails.feedUrl)
            .then(res => {
                if (!res.ok) {
                    throw Error("Failed to fetch XML data");
                }
                return res.text();
            })
            .then(data => {
                let jsonData = xmlToJson(data);
                setFeedData(jsonData.rss.channel);
                localStorage.setItem('savedFeedData', JSON.stringify(jsonData.rss.channel));
            })
            .catch(err => {
                console.log("Fetch podcast's feedURL error:", err.message)
            })
    }, [podcastDetails.feedUrl]);

    return (
        <div className="page-container">
            <Header isLoading={isLoading} />
            <div className="podcast-details-container">
                {!isLoading && (
                    <>
                        <Podcast podcastDetails={podcastDetails} feedData={feedData} handleReset={handleReset} />
                        {showEpisode ? <Episode /> : <EpisodesList feedData={feedData} handleShowEpisode={handleShowEpisode} />}
                    </>
                )}
            </div>
        </div>
    );
}

export default PodcastPage;