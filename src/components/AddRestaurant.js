import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import "./form.css";

class AddRestaurant extends Component {
  state = {
    geometry: this.props.latLng.geometry,
    name: "",
    rating: 1,
    vicinity: "Adress",
    id: new Date().getTime(),
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
    errors: {}
  };

  validate = data => {
    const errors = {};
    if (!data.name) errors.name = "Please, enter a place name";
    if (!data.vicinity) errors.vicinity = "Please, enter an address";
    return errors;
  };

  onSubmit = event => {
    event.preventDefault();

    const errors = this.validate(this.state);

    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      this.props.newPlace(this.state);
      this.props.closeModal();
    }
  };

  render() {
    return (
      <div className="modalWindow">
        <form>
          <button
            className="btn btn-danger float-right"
            onClick={() => this.props.closeModal()}
          >
            &times;
          </button>
          <h3>Add Restaurant</h3>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="email"
              className={`form-control ${!!this.state.errors.name &&
                "is-invalid"}`}
              id="name"
              name="name"
              onChange={event => this.setState({ name: event.target.value })}
              value={this.state.name}
              placeholder="Enter your name"
            />
            {!!this.state.errors.name && (
              <div className="invalid-feedback">{this.state.errors.name}</div>
            )}
          </div>
          <div className="form-group">
            <StarRatings
              rating={this.state.rating}
              numberOfStars={5}
              changeRating={rating => this.setState({ rating })}
              starRatedColor="red"
              starDimension="20px"
              starSpacing="1px"
            />
          </div>
          <div className="form-group">
            <label htmlFor="vicinity">Address</label>
            <textarea
              name="text"
              id="vicinity"
              className={`form-control ${!!this.state.errors.vicinity &&
                "is-invalid"}`}
              onChange={event =>
                this.setState({ vicinity: event.target.value })
              }
              value={this.state.vicinity}
            />
            {!!this.state.errors.vicinity && (
              <div className="invalid-feedback">
                {this.state.errors.vicinity}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-info"
            onClick={this.onSubmit}
          >
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default AddRestaurant;
