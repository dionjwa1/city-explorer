import React from 'react'
import WeatherDay from './component/WeatherDay';

class Weather extends React.Component {



  render() {

    return (
      <>
        {/* <Card style={{width: '18rem', color: ''}} */}
        {this.props.weather.map((day, index) => (
          <WeatherDay
          key={index}
            weatherSend={day}
            number={index}
          />
        )
        )};
      </>
    )
  }
}

export default Weather;

