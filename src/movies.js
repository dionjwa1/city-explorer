import React from 'react';


class Movies extends React.Component {

  render() {
    return (
      <>
        {
          this.props.movie.map((movie, index) => (
            <div key={index}>
              <h2>Title: {movie.title}.</h2>
              <p>Overview: {movie.overview}.</p>
              <p>Popularity: {movie.popularity}.</p>
              <img src={movie.img_Url} alt={movie.title} />
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
