import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import PodcastDetails from "./PodcastDetails";
import "./App.css";
import EpisodesList from "./EpisodesList";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/podcast/:id">
            <PodcastDetails />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;