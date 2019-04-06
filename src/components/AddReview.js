import React, { Component } from "react";
import StarRatings from "react-star-ratings";

class AddReview extends Component {
  state = {
    author_name: "",
    text: "",
    rating: 1,
    time: new Date().getTime(),
    profile_photo_url:
      "https://pngimage.net/wp-content/uploads/2018/06/no-avatar-png.png",
    errors: {}
  };

  validate = data => {
    const errors = {};
    if (!data.author_name) errors.name = "Please, enter your name";
    if (!data.text) errors.comments = "Please, enter a comment";
    return errors;
  };

  onSubmit = event => {
    event.preventDefault();

    const errors = this.validate(this.state);

    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      this.props.submit(this.state);
    }
  };

  render() {
    return (
      <div>
        <form>
          <h3>Add Review</h3>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="email"
              className={`form-control ${!!this.state.errors.name &&
                "is-invalid"}`}
              id="name"
              name="author_name"
              onChange={event =>
                this.setState({ author_name: event.target.value })
              }
              value={this.state.author_name}
              placeholder="Enter your name"
            />
            {!!this.state.errors.name && (
              <div class="invalid-feedback">{this.state.errors.name}</div>
            )}
          </div>
          <div className="form-group">
            <StarRatings
              rating={this.state.rating}
              numberOfStars={5}
              changeRating={rating => this.setState({ rating })}
              starRatedColor="orange"
              starDimension="20px"
              starSpacing="1px"
            />
          </div>
          <div className="form-group">
            <label htmlFor="comments">Comments</label>
            <textarea
              name="text"
              id="comments"
              className={`form-control ${!!this.state.errors.comments &&
                "is-invalid"}`}
              onChange={event => this.setState({ text: event.target.value })}
              value={this.state.text}
            />
            {!!this.state.errors.comments && (
              <div class="invalid-feedback">{this.state.errors.comments}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-info mb-4"
            onClick={this.onSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default AddReview;
