import React, { Component } from "react";
import moment from "moment";
import Flag from "react-flags";
import CountdownTimer from "./CountdownTimer";
import { Route, Link, HashRouter } from "react-router-dom";

class Launch extends Component {
  renderAgencies = ag => {
    return ag.map(a => {
      let flags = a.countryCode.indexOf(",") > -1
        ? a.countryCode.split(",")
        : [a.countryCode];
      if (flags.length > 5) {
        flags = [];
      }
      return (
        <a href={a.wikiURL}>
          {flags.map(flag => (
            <img
              src={
                process.env.PUBLIC_URL +
                  "/img/flags/flags-iso/flat/16/" +
                  flag[0] +
                  flag[1] +
                  ".png"
              }
            />
          ))}
          {a.name}
        </a>
      );
    });
  };
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
    const nes = `${base}_${list[0]}.${ext}`;
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
  render() {
    const now = moment();
    const launchDate = moment(this.props.data.isonet);
    const { id, rocket, missions, vidURLs } = this.props.data;
    return (
      <div className="launch">
        <div className="launch-rocket">
          <div className="launch-rocket-name">
            <a href={rocket.wikiURL}>{rocket.name}</a>
          </div>
          <img
            src={this.replaceImage(rocket.imageURL, rocket.imageSizes)}
            alt={rocket.name}
          />
        </div>
        <div className="launch-meta">
          <div className="launch-meta-title">
            <Link to={`/launch/${id}`}>{this.mapMissions(missions)}</Link>
            <span style={{ float: "right" }}>
              {launchDate.format("D MMMM Y HH:mm")}
            </span>
          </div>
          <div className="launch-desc">
            <div className="launch-tags">
              {this.mapLinks(vidURLs)}
              <span className="launch-agencies">
                {this.renderAgencies(rocket.agencies)}
              </span>
              {missions[0] && missions[0].typeName
                ? <span className="launch-type">
                    {missions[0].typeName}
                  </span>
                : ""}
            </div>

            {missions[0] && missions[0].description
              ? <section className="launch-description">
                  {this.mapDescription(missions)}
                </section>
              : ""}

            <b>Time until launch</b>

            <CountdownTimer initialTimeRemaining={launchDate.diff(now)} />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Launch;
