import React, { Component } from "react";
import Places from "./Places";
import Map from "./Map";

class Main extends Component {
  state = {
    places: [],
    filteredPlaces: [],
    filter: 0
  };

  linkTo = path => {
    console.log(path);
    this.props.history.push(path);
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 px-md-0">
            <Map
              fetchPlaces={this.fetchPlaces}
              newPlace={this.newPlace}
              places={
                this.state.filter > 0
                  ? this.state.filteredPlaces
                  : this.state.places
              }
              linkTo={this.linkTo}
            />
          </div>
          <div className="col-md-4 px-md-0" style={{ height: "100vh" }}>
            <Places
              places={
                this.state.filter > 0
                  ? this.state.filteredPlaces
                  : this.state.places
              }
              filter={this.state.filter}
              onChangeRating={this.onChangeRating}
            />
          </div>
        </div>
      </div>
    );
  }

  fetchPlaces = places => {
    this.setState({ places });
  };

  onChangeRating = filter => {
    const places = this.state.places.filter(place => place.rating >= filter);

    console.log("filtered places", places);
    this.setState({ filter, filteredPlaces: places });
  };

  newPlace = data => {
    console.log("newPlace", data);
    this.setState({ places: [data, ...this.state.places] });
  };
}

export default Main;
