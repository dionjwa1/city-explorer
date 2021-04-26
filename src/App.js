import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Weather from './weather.js';
import Movies from './movies.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      error: {},
      isError: false,
      weather: [],
      movie: []
    }
  }



  getLocation = async (e) => {
    e.preventDefault();
    try {

      const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchQuery}&format=json`;

      const response = await axios.get(API);

      const location = response.data[0];
      this.setState({ location, isError: false });

    } catch (error) {
      console.log(error);

      const updatedState = {
        error,
        isError: true
      }
      this.setState(updatedState);


      this.setState(({ error, isError: true }));

    }
    this.getWeather();
    this.getMovies();


  }


  getWeather = async (e) => {
    try {
      const weather = `https://city-explorer-api-dion.herokuapp.com/weather?lat=${this.state.location.lat}&lon=${this.state.location.lon}&q${this.state.location}`;

      const response = await axios.get(weather);
      this.setState({ isError: false, weather: response.data });


    } catch (error) {
      console.log('Find Better Weather: Page not Found');

    }
  }

  getMovies = async () => {
    try {
      const movies = `https://city-explorer-api-dion.herokuapp.com/movies?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&location=${this.state.searchQuery}`;

      const response = await axios.get(movies);
      
      this.setState({ movie: response.data, isError: false });

    } catch (error) {
      console.log('Movie Error');
    }
  }


  render() {

    const img_url = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.location.lat},${this.state.location.lon}&size=${window.innerWidth}x300&format=jpg&zoom=12`;

    console.log(this.state.weather);
    console.log(this.state.movie);

    return (
      <>
        <input onChange={(e) => this.setState({ searchQuery: e.target.value })} placeholder="search for a city"></input>
        <button onClick={this.getLocation}>Explore!</button>

        {this.state.location.place_id && 
          <>
            <h2>The city is: {this.state.location.display_name}</h2>
            <h3>Latitude {this.state.location.lat}</h3>
            <h3>Longitude {this.state.location.lon}</h3>
            <img src={img_url} alt="location" />
          </>
        }
        {this.state.isError && <p>Error {this.state.errorMessage}</p>}
        <Weather weather={this.state.weather}> </Weather>
        <Movies movie={this.state.movie} />
      </>
    )
  }
}
// {this.state.location.place_id && 
export default App;
