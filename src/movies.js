import React from 'react';


class Movies extends React.Component {

  render() {
    return (
      <>
        {
          this.props.movie.map((movie, index) => (
            <div>
              <h2>Title: {movie.title}.</h2>
              <p>Overview: {movie.overview}.</p>
              <p>Popularity: {movie.popularity}.</p>
              <p>Image: https://{movie.image}.</p>
              <p>Image: https://{movie.image}.</p>
            </div>
          ))
        }
      </>
    )
  }
}
export default Movies;

//   <h2>Title: {movie.title}.</h2>
//   <p>Overview: {movie.overview}.</p>
//   <p>Popularity: {movie.popularity}.</p>
//   <p>Image: https://{movie.image}.</p>
//   <p>Image: https://{movie.image}.</p>
// )
// )
// )
