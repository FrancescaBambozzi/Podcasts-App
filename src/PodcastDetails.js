import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";
import xml2js from 'xml-js';
import EpisodesList from "./EpisodesList";

const PodcastDetails = () => {
    const { id } = useParams();
    const [podCastDetails, setPodcastDetails] = useState({});
    const [feedUrl, setFeed] = useState(null);
    const [description, setDescription] = useState("");
    const [episodes, setEpisodes] = useState([]);

    //fetch podcast by id
    useEffect(() => {
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://itunes.apple.com/lookup?id=' + id)}`)
            .then(res => {
                if (!res.ok) {
                    throw Error("Failed to fetch details");
                }
                return res.json()
            })
            .then(data => {
                const details = JSON.parse(data.contents);
                setPodcastDetails(details.results[0]);
                setFeed(details.results[0].feedUrl)
            })
            .catch(err => {
                console.log(err.message)
            })
    }, []);

    //fetch feedUrl data in JSON format
    useEffect(() => {
        fetch(feedUrl)
            .then(res => { return res.text() })
            .then(data => {
                let jsonData = xmlToJson(data);
                let description = jsonData.rss.channel.description._cdata || jsonData.rss.channel.description._text;
                setDescription(description);
                let episodes = jsonData.rss.channel.item;
                setEpisodes(episodes);
            })
    })

    //convert XML string in JSON object
    function xmlToJson(xmlString) {
        const options = { compact: true, ignoreComment: true, spaces: 4 };
        const json = xml2js.xml2json(xmlString, options);
        return JSON.parse(json);;
    }

    return (
        <div className="page-container">
            <Header />
            <div className="podcast-details-container">
                <div className="side">
                    <div className="podcast-content">
                        <img src={podCastDetails.artworkUrl600} alt="podcast-image" />
                        <div className="podcast-text">
                            <h3>{podCastDetails.trackName}<br /><span>By: {podCastDetails.artistName}</span></h3>
                            <p><strong>Description:</strong><br />
                                <div dangerouslySetInnerHTML={{ __html: "" + description + "" }} />
                            </p>
                        </div>
                    </div>
                </div>
                {episodes.length > 0 && <EpisodesList episodes={episodes}/>}
            </div>
        </div>
    );
}

export default PodcastDetails;