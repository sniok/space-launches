import React, { Component } from "react";
import api from "./Api";
import "./launchpage.css";
import moment from "moment";
import CountdownTimer from "./CountdownTimer";

class LaunchPage extends Component {
  constructor() {
    super();
    this.state = {
      launch: undefined
    };
  }
  async componentDidMount() {
    const info = await api.launch(this.props.match.params.id);
    this.setState({ launch: info.launches[0] });
  }

  render() {
    const { id } = this.props.match.params;
    const l = this.state.launch;

    return (
      <div className="container">
        {this.state.launch
          ? <div>
              <h1>{l.name}</h1>
              {l.vidURLs[0] ? <Stream url={l.vidURLs[0]} /> : ""}
              <div className="rocket-timer">
                <CountdownTimer
                  initialTimeRemaining={moment(l.isonet).diff(moment())}
                />
              </div>
              <h3>Rocket</h3>
              <RocketCard rocket={l.rocket} />
            </div>
          : "Loading"}
        {/*<pre>{JSON.stringify(this.state, null, 2)}</pre>*/}
      </div>
    );
  }
}

const RocketCard = ({ rocket }) => {
  const replaceImage = (image, list) => {
    const ext = image.split(".").pop();
    const base = image.split("_").shift();
    const nes = `${base}_${list[0]}.${ext}`;
    return nes;
  };
  return (
    <div className="rocket-card">

      <img
        src={replaceImage(rocket.imageURL, rocket.imageSizes)}
        width="200px"
      />
      <div className="rocket-card-title">
        {rocket.name}
      </div>
      <div className="rocket-card-meta">
        <a className="button rocket-info" href={rocket.infoURL}>Website</a>
        <a className="button rocket-wiki" href={rocket.wikiURL}>Wiki</a>
      </div>
    </div>
  );
};

const Stream = ({ url }) => {
  if (url.indexOf("youtube") > -1) {
    const id = url.split("=").pop();
    return (
      <div style={{ textAlign: "center" }}>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${id}`}
          frameborder="0"
          allowfullscreen
        />
      </div>
    );
  }
  return <div />;
};

export default LaunchPage;
