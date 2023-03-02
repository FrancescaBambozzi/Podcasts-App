import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "./Header";
import EpisodesList from "./EpisodesList";
import PodcastDetailCard from "./PodcastDetailCard";
import useFetch from "./data/useFetch";

const PodcastDetails = () => {
    const { id } = useParams();
    const { podCastDetails, isLoading, jsonData } = useFetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://itunes.apple.com/lookup?id=' + `${id}`)}`);

    return (
        <div className="page-container">
            <Header isLoading={isLoading}/>
            <div className="podcast-details-container">
                {<PodcastDetailCard podCastDetails={podCastDetails} jsonData={jsonData} />}
                <EpisodesList id={id} jsonData={jsonData} />
            </div>
        </div>
    );
}

export default PodcastDetails;