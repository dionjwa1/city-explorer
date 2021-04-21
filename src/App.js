import './App.css';
import './index.css'
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      error: {},
      isError: false,
    }
  }

  getLocation = async (e) => {
    e.preventDefault();
    try {
      const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchQuery}&format=json`;

      const response = await axios.get(API);
    
      const location = response.data[0];

      const backendAPI = `http://localhost:3001/weather?lat=${location.lat}&lon=${location.lon}`
      const serverResponse = await axios.get(backendAPI);

      console.log(serverResponse);
      this.setState({ location:response.data[0], weather:serverResponse.data, isError:false });
    } catch (error) {
      console.log(error);
      const updatedState = {
        error,
        isError: true
      }
      this.setState(updatedState);
    }
  }
  render() {

    const img_url = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.location.lat},${this.state.location.lon}&size=${window.innerWidth}x300&format=jpg&zoom=12`;

    console.log(img_url);

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
      </>
    )
  }
}

export default App;
