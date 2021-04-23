import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
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
      this.setState({ location, isError: false});

    } catch (error) {
      console.log(error);
      const updatedState = {
        error,
        isError: true
      }
      this.setState(updatedState);
      
    }
  this.getWeather();  
  this.getMovies();


  }

  getWeather = async (e) => {
    try {
      const weather = `http://localhost:3001/weather?lat=${this.state.location.lat}&lon=${this.state.location.lon}&q${this.state.location}`;

      const response = await axios.get(weather);
      this.setState({isError: false, weather: response.data });


    } catch (error) {
      console.log('Find Better Weather: Page not Found');

    }
  }

  getMovies = async () => {
    try {
      const movies = `http://localhost:3001/movies?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&movieLocation=${this.state.searchQuery}`;

      const response = await axios.get(movies);

      this.setState({ movie: response.data, isError: false });
  
    } catch (error) {
      console.log('Movie Error');
    }
  }

  render() {

    const img_url = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.location.lat},${this.state.location.lon}&size=${window.innerWidth}x300&format=jpg&zoom=12`;

    console.log(this.state.weather);

    return (
      <>
        <input onChange={(e) => this.setState({ searchQuery: e.target.value })} placeholder="search for a city"></input>
        <button onClick={this.getLocation}>Explore!</button>
        {this.state.location.place_id &&

          <h2>The city is: {this.state.location.display_name}</h2>}
        {this.state.location.place_id && <h3>Latitude {this.state.location.lat}</h3>}
        {this.state.location.place_id && <h3>Longitude {this.state.location.lon}</h3>}
        {this.state.location.error && <p>Error {this.state.errorMessage}</p>}
        <img src={img_url} alt="location" />
        <Weather weather={this.state.weather}> </Weather>
        <Movies movie={this.state.movie} />


      </>
    )
  }
}

export default App;
