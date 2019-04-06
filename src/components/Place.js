import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import AddReview from "./AddReview";

export default class Place extends Component {
  state = {
    place: {
      opening_hours: { weekday_text: [] }
    },
    reviews: [],
    addingReview: false,
    location: []
  };

  componentDidMount = () => {
    let map = new window.google.maps.Map(this.refs.map, {
      center: this.state.mapCenter,
      zoom: 14,
      mapTypeId: "roadmap"
    });

    let service = new window.google.maps.places.PlacesService(map);
    service.getDetails(
      { placeId: this.props.match.params.place_id },
      (place, status) => {
        const latLng = String(place.geometry.location)
          .replace(" ", "")
          .replace("(", "")
          .replace(")", "")
          .split(",");
        // console.log("latLng", latLng);
        this.setState({
          location: latLng,
          place,
          reviews: place.reviews
        });
      }
    );
  };

  addReview = data => {
    console.log(data);
    this.setState({ reviews: [data, ...this.state.reviews] });
  };

  render() {
    const { place, reviews, location } = this.state;

    const hours = place.opening_hours.weekday_text.map((item, key) => (
      <li key={key}>{item}</li>
    ));
    //pano view rendering
    let sv = new window.google.maps.StreetViewService();
    sv.getPanorama(
      {
        location: {
          lat: parseFloat(location[0]),
          lng: parseFloat(location[1])
        },
        radius: 50
      },
      processSVData
    );
    //console.log(sv);
    function processSVData(data, status) {
      if (status === "OK") {
        let panorama = new window.google.maps.StreetViewPanorama(
          document.getElementById("pano")
        );
        panorama.setPano(data.location.pano);
        panorama.setPov({
          heading: 270,
          pitch: 0
        });
        panorama.setVisible(true);
      }
    }

    return (
      <div className="container-fluid pt-5">
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6">
                <div ref="map" />
              </div>
            </div>

            <div className="mainInfo p-3 mt-4 rounded border border-dark">
              <h2 className="text-black d-flex justify-content-between">
                {place.name}
                <StarRatings
                  rating={place.rating}
                  numberOfStars={5}
                  starRatedColor="red"
                  starDimension="20px"
                  starSpacing="1px"
                />
              </h2>
              <hr className="border-dark" />
              <p className="text-black lead">{place.formatted_address}</p>
              <p className="text-black lead">{place.formatted_phone_number}</p>

              <div className="row m-4">
                <div className="col-xs-5 col-md-3 p-4 rounded border border-dark text-center">
                  <h3 className="text-black">Opening Hours</h3>
                  <ul className="m-0 p-0" style={{ listStyle: "none" }}>
                    {hours}
                  </ul>
                </div>
                <div className="col-xs-1 col-md-1" />
                <div
                  id="pano"
                  className="col-xs-5 col-md-8  rounded border border-dark"
                />
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="col-xs-12 text-center btn btn-warning btn-lg btn-block"
              onClick={() =>
                this.setState({ addingReview: !this.state.addingReview })
              }
            >
              {this.state.addingReview ? "Cancel" : "Add Review"}
            </div>
            {this.state.addingReview && <AddReview submit={this.addReview} />}
            <ul className="list-group">
              {reviews.map(review => (
                <li key={review.time} className="list-group-item">
                  <div>
                    <img
                      height="60"
                      className="float-left mr-3 mb-4"
                      src={review.profile_photo_url}
                      alt={review.author_name}
                    />
                    <h4 className="mb-0">{review.author_name}</h4>
                    <p className="mb-0">{review.relative_time_description}</p>
                    <StarRatings
                      rating={review.rating}
                      numberOfStars={5}
                      starRatedColor="red"
                      starDimension="20px"
                      starSpacing="1px"
                    />
                  </div>
                  <br />
                  <div>
                    <p>{review.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
