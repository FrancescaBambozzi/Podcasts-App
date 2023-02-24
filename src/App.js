import { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      podcasts: []
    }
  }

  componentDidMount() {
    fetch(
      "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          podcasts: json.feed.entry
        });
      })
  }

  render() {
    const { podcasts } = this.state;
    return (
      <div className="App">
        <h1>Podcaster</h1>
        <div className="content">
          { podcasts.map((item) => (
            <ol key= {item.id.attributes["im:id"]}>
              Title: {item.title.label}
            </ol>
          ))}
        </div>
      </div>
    );
  }
}

export default App;