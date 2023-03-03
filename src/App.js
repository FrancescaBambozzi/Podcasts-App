import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import PodcastPage from "./PodcastPage";
import "./App.css";
import Episode from "./Episode";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/podcast/:id">
            <PodcastPage />
          </Route>
          <Route path="/podcast/:id/episode/:episodeId">
            <Episode />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;