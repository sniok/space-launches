import React, { Component } from "react";
import api from "../apis/LaunchLibrary";
import "./launchpage.css";
import moment from "moment";
import CountdownTimer from "../CountdownTimer";

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
              <h1 style={{ textAlign: "center" }}>{l.name}</h1>
              {l.vidURLs[0] ? <Stream url={l.vidURLs[0]} /> : ""}
              <div className="rocket-timer">
                Countdown
                <CountdownTimer
                  initialTimeRemaining={moment(l.isonet).diff(moment())}
                />
              </div>
              {l.missions.map(m => <Mission mission={m} />)}

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
  const getImageStyle = image => {
    let url = image;
    if (image.indexOf("placeholder") > -1) {
      return `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.86) )`;
    }
    return `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6) ), url(${url})`;
  };
  return (
    <div
      className="rocket-card"
      style={{ backgroundImage: getImageStyle(rocket.imageURL) }}
    >
      <div className="launchRocket">{rocket.name}</div>
      <div className="rocketMadeBy">
        {rocket.agencies.map(a => a.name).join(", ")}
      </div>
      <div className="datLine" />
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

const Mission = ({ mission }) => {
  return (
    <div>
      <div className="mission">
        <div className="missionName">{mission.name}</div>
        <div className="missionType">{mission.typeName}</div>
        <div className="missionDesc">{mission.description}</div>
      </div>
    </div>
  );
};

export default LaunchPage;
