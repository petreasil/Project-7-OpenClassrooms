import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  state = {
    latitude: 0,
    longitude: 0,
    forecast: [],
    temperature: null,
    humidity: null,
    city: null,
    country: null,
    description: null,
    error: ""
  };

  componentDidMount = () => {
    // Get the current position of the user
    navigator.geolocation.getCurrentPosition(
      position => {
        let initialLocation = new window.google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        const coords = position.coords;
        console.log(coords);
        this.setState(
          prevState => ({
            latitude: coords.latitude,
            longitude: coords.longitude
          }),
          () => {
            // Call the API, and set the state of the weather forecast
            fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${
                this.state.latitude
              }&lon=${
                this.state.longitude
              }&units=metric&appid=f083ac804dacf7162acfdbdad23b4cf0`
            )
              .then(response => response.json())
              .then(data => {
                this.setState((prevState, props) => ({
                  temperature: data.main.temp,
                  city: data.name,
                  country: data.sys.country,
                  humidity: data.name.humidity,
                  description: data.weather[0].description
                }));
              });
          }
        );
      },
      error => this.setState({ forecast: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-danger bg-danger">
        <Link to="/" className="navbar-brand text-light font-weight-bold">
          Restaurant Review
        </Link>

        <div className="navbar-nav text-light badge badge-pill badge-info">
          <p className="navbar-text pt-4 mr-2">{this.state.city}</p>
          <p className="navbar-text pt-4 mr-2 ">{this.state.temperature}°C</p>
          <p className="navbar-text pt-4 mr-2 ">{this.state.country}</p>
          <p className="navbar-text pt-4 mr-2 ">{this.state.description}</p>
        </div>
      </nav>
    );
  }
}
export default Header;
