import { Link } from "react-router-dom";

const Header = ({ isLoading }) => {
    return (
        <div className="header">
            <Link to={"/Podcasts-App"}>
                <h1>Podcaster</h1>
            </Link>
            {isLoading && <div className="loader"></div>}
        </div>
    );
}

export default Header;