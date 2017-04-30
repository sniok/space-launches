import React, { Component } from "react";
import moment from "moment";
import Flag from "react-flags";

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
          {flags.map(flag => <Flag name={flag} format="png" pngSize={16} />)}
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
  render() {
    const now = moment();
    const launchDate = moment(this.props.data.isonet);
    const { rocket, missions } = this.props.data;
    return (
      <div className="launch">
        <div className="launch-rocket">
          <div className="launch-rocket-name">
            <a href={rocket.wikiURL}>{rocket.name}</a>
          </div>
          <img
            src={this.replaceImage(rocket.imageURL, rocket.imageSizes)}
            width="200px"
            alt={rocket.name}
          />
        </div>
        <div className="launch-meta">
          <div className="launch-meta-title">
            {this.mapMissions(missions)}
            <span style={{ float: "right" }}>
              {launchDate.format("D MMMM Y HH:mm")}
            </span>
          </div>
          <div className="launch-desc">
            <div className="launch-tags">
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

            <b>Time until launch – </b>
            {launchDate.diff(now, "hours")} hours
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Launch;
