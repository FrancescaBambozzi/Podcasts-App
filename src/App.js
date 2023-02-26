import { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      podcasts: []
    }
  }

  // save the state to the browser’s local storage
  componentDidUpdate() {
    const localStateString = JSON.stringify(this.state);
    localStorage.setItem("localStateString", localStateString);
  }

  //pull the saved state when the UI is rerendered
  componentDidMount() {
    fetch(
      "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          podcasts: json.feed.entry
        });
      })

    const localStateString = localStorage.getItem("localStateString");

    //make data available between sessions by setting the state from the previous one to the new one
    if (localStateString) {
      const savedState = JSON.parse(localStateString);
      this.setState(savedState);
    }

  }

  render() {
    const { podcasts } = this.state;
    return (
      <div className="App">
        <h1>Podcaster</h1>
        <div className="content">
          {podcasts.map((item) => (
            <ol key={item.id.attributes["im:id"]}>
              Title: {item.title.label}
            </ol>
          ))}
        </div>
      </div>
    );
  }
}

export default App;