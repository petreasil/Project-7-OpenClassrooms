import React from "react";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";

export default ({ places, onChangeRating, filter }) => {
  return (
    <div style={{ height: "calc(100vh - 56px)", overflow: "auto" }}>
      <ul className="list-group">
        <li
          className="list-group-item active bg-info position-sticky border-0"
          style={{
            right: 0,
            top: 0
          }}
        >
          <h4 className="mb-0 d-flex justify-content-between">
            <span>Nearby Places</span>
            <StarRatings
              rating={filter}
              numberOfStars={5}
              changeRating={rating => onChangeRating(rating)}
              starRatedColor="red"
              starDimension="20px"
              starSpacing="3px"
            />
          </h4>
        </li>
        {places.map(place => (
          <li key={place.id} className="list-group-item">
            {place.place_id ? (
              <Link to={place.place_id}>
                <h5 className="nameList">{place.name}</h5>
                <div>
                  <span
                    className="badge badge-secondary position-relative mr-2"
                    style={{ bottom: "-3px" }}
                  >
                    {(place.rating * 1).toFixed(1)}
                  </span>
                  <StarRatings
                    rating={place.rating}
                    numberOfStars={5}
                    starRatedColor="red"
                    starDimension="20px"
                    starSpacing="3px"
                  />
                </div>
              </Link>
            ) : (
              <div>
                <h5>{place.name}</h5>
                <div>
                  <span
                    className="badge badge-secondary position-relative mr-2"
                    style={{ bottom: "-3px" }}
                  >
                    {(place.rating * 1).toFixed(1)}
                  </span>
                  <StarRatings
                    rating={place.rating}
                    numberOfStars={5}
                    starRatedColor="red"
                    starDimension="20px"
                    starSpacing="3px"
                  />
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
