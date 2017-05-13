import React, { Component } from "react";
import moment from "moment";
import Flag from "react-flags";
import CountdownTimer from "../CountdownTimer";
import { Route, Link, HashRouter } from "react-router-dom";

import "./Launch.css";

class Launch extends Component {
  mapMissions = mis => {
    return (
      <span className="launch-mission-list">
        {mis.length === 0 ? this.props.data.name : mis.map(m => m.name)}
      </span>
    );
  };
  mapDescription = mis => {
    return mis.map(m => m.description).join(" ");
  };

  replaceImage = (image, list) => {
    const ext = image.split(".").pop();
    const base = image.split("_").shift();
    const nes = `${base}_${list[2]}.${ext}`;
    return nes;
  };

  mapLinks = vidURLs => {
    return vidURLs.map(url => {
      let title = "Info";
      if (url.indexOf("youtube") > -1) {
        title = "Youtube stream";
      }
      return <a className="launch-link" href={url}>{title}</a>;
    });
  };

  getImageStyle = (image, sizes) => {
    let url = image;
    if (image.indexOf("placeholder") > -1) {
      url = "https://source.unsplash.com/collection/235/random?sig=" +
        ~~(Math.random() * 100);
    } else {
      url = this.replaceImage(url, sizes);
    }
    return `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6) ), url(${url})`;
  };

  render() {
    const now = moment();
    const launchDate = moment(this.props.data.isonet);
    const { id, rocket, missions, vidURLs } = this.props.data;
    console.log(rocket);
    return (
      <div
        className="launch"
        style={{
          backgroundImage: this.getImageStyle(
            rocket.imageURL,
            rocket.imageSizes
          )
        }}
      >
        <div className="launchRocket">{rocket.name}</div>
        <div className="launchMission">{missions[0].name}</div>
        <div className="launchWhen">{launchDate.format("D MMMM HH:mm")}</div>
        <div className="launchDesc">{this.mapDescription(missions)}</div>
        <div className="datLine" />
        <div className="launchMore">
          <Link to={`/launch/${id}`}>Learn more</Link>
        </div>

      </div>
    );
  }
}

export default Launch;
