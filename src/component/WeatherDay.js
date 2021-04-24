import React from 'react'


class WeatherDay extends React.Component {


  
  render() {
   console.log(this.props.weatherSend);
    return (
 <span>
   
   ${this.props.weatherSend.time}
   ${this.props.weatherSend.forecast}

 </span>
    )
  }
}
export default WeatherDay;