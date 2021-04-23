import React from 'react'


class Weather extends React.Component {

  render() {
   
    return (
      <>
      {/* <Card style={{width: '18rem', color: ''}} */}
        {this.props.weather.map((day, index) => (
          <span key={index}>
            <p>day: {day.time}</p>
            <p>description: {day.forecast}</p>
          </span>
        )
        )};
      </>
    )
  }
}

export default Weather;

