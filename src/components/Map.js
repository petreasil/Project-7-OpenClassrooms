import React, { Component } from "react";
import AddRestaurant from "./AddRestaurant";

export default class Map extends Component {
  state = {
    mapCenter: { lat: -33.8688, lng: 191.2195 },
    map: null,
    newPlace: {},
    activePlace: {}
  };
  componentDidMount = () => {
    let map = new window.google.maps.Map(this.refs.map, {
      center: this.state.mapCenter,
      zoom: 14,
      mapTypeId: "roadmap"
    });
    map.addListener("click", event => {
      const latLng = String(event.latLng)
        .replace(" ", "")
        .replace("(", "")
        .replace(")", "")
        .split(",");

      this.setState({
        newPlace: {
          geometry: {
            location: {
              lat: Number(latLng[0]),
              lng: Number(latLng[1])
            }
          }
        }
      });
    });

    this.setState({ map });

    navigator.geolocation.getCurrentPosition(position => {
      const mapCenter = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(mapCenter);

      this.setState({ mapCenter });

      this.marker(mapCenter, map);

      let service = new window.google.maps.places.PlacesService(map);

      service.nearbySearch(
        {
          location: mapCenter,
          radius: "1000",
          type: ["restaurant"]
        },
        (results, status) => {
          this.props.fetchPlaces(results);
          // console.log("places", results);
        }
      );
    });
  };

  componentWillReceiveProps = nextProps => {
    //console.log("props", nextProps.places);
    // console.log("places", results);
    this.createMarkers(nextProps.places, this.state.map);
  };

  render() {
    return (
      <div>
        <div ref="map" style={{ width: "100%", height: "100vh" }} />
        {Object.keys(this.state.newPlace).length > 0 && (
          <AddRestaurant
            closeModal={this.closeModal}
            latLng={this.state.newPlace}
            newPlace={this.props.newPlace}
          />
        )}
      </div>
    );
  }

  marker = (position, map) => {
    let marker = new window.google.maps.Marker({
      map,
      position,
      animation: window.google.maps.Animation.DROP,
      icon:
        "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
    });

    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <h2>Current location</h2>
      `
    });

    marker.addListener("click", function() {
      infoWindow.open(map, marker);
    });
  };

  createMarkers = (places, map) => {
    var bounds = new window.google.maps.LatLngBounds();

    for (var i = 0, place; (place = places[i]); i++) {
      const image = {
        url: place.icon,
        size: new window.google.maps.Size(71, 71),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(17, 34),
        scaledSize: new window.google.maps.Size(25, 25)
      };

      //console.log("place", place);

      const marker = new window.google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        rating: place.rating,
        place_id: place.place_id,
        position: place.geometry.location,
        animation: window.google.maps.Animation.DROP
      });

      const placeContent = `
      <h2>${place.name}</h2>
      <p>${place.vicinity}</p>
      ${
        place.place_id
          ? `<div><a class="btn btn-info btn-md" href="/${
              place.place_id
            }">See place</a></div>`
          : ""
      }
      `;

      const infoWindow = new window.google.maps.InfoWindow({
        content: placeContent
      });

      marker.addListener("click", function() {
        console.log("marker", marker);
        infoWindow.open(map, marker);
      });

      marker.addListener("click", toggleBounce);

      function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
        }
      }

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  };

  closeModal = () => this.setState({ newPlace: {} });
}
