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
              {l.missions.map(m => <Mission key={m.id} mission={m} />)}
              <RocketCard rocket={l.rocket} />
              {l.rocket.agencies.map(a => <Agency key={a.id} agency={a} />)}
              {l.location.pads.map(p => <Pad key={p.id} pad={p} />)}
            </div>
          : "Loading"}
      </div>
    );
  }
}

const getImageStyle = () => {
  let url =
    "https://source.unsplash.com/collection/146098/random?sig=" +
    ~~(Math.random() * 100);

  return `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6) ), url(${url})`;
};

const RocketCard = ({ rocket }) => {
  const getImageStyleImg = image => {
    let url = image;
    if (image.indexOf("placeholder") > -1) {
      url =
        "https://source.unsplash.com/collection/146098/random?sig=" +
        ~~(Math.random() * 100);
    }
    return `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6) ), url(${url})`;
  };
  return (
    <div
      className="rocket-card"
      style={{ backgroundImage: getImageStyleImg(rocket.imageURL) }}
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
          width={document.getElementsByClassName("container")[0].clientWidth}
          height="415"
          src={`https://www.youtube.com/embed/${id}`}
          frameBorder="0"
          id="ytfr"
          allowFullScreen
        />
      </div>
    );
  }
  return <div />;
};

const Mission = ({ mission }) => {
  return (
    <div className="mission" style={{ backgroundImage: getImageStyle() }}>
      <div className="missionName">{mission.name}</div>
      <div className="missionType">{mission.typeName}</div>
      <div className="missionDesc">{mission.description}</div>
    </div>
  );
};

const Agency = ({ agency }) => {
  return (
    <div className="card" style={{ backgroundImage: getImageStyle() }}>
      <div className="agencyName">{agency.name}</div>
      <div className="agencyCountry">{agency.countryCode}</div>
      <div className="datLine" />
      <div className="rocket-card-meta">
        <a className="button rocket-info" href={agency.infoURL}>Website</a>
        <a className="button rocket-wiki" href={agency.wikiURL}>Wiki</a>
      </div>
    </div>
  );
};

const Pad = ({ pad }) => {
  return (
    <div className="card" style={{ backgroundImage: getImageStyle() }}>
      <div className="padName">{pad.name}</div>
      <div className="datLine" />
      <div className="rocket-card-meta">
        <a className="button rocket-info" href={pad.wikiURL}>Wiki</a>
        <a className="button rocket-wiki" href={pad.mapURL}>Map</a>
      </div>
    </div>
  );
};

export default LaunchPage;
