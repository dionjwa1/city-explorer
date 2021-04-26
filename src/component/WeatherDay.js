import React from 'react'


class WeatherDay extends React.Component {


  
  render() {
   console.log(this.props.weatherSend);
    return (
 <span>
   <p>
   {this.props.weatherSend.time}
   {this.props.weatherSend.forecast}
   </p>
 </span>
    )
  }
}
export default WeatherDay;