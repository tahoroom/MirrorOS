import React from 'react'
import ReactDOM from 'react-dom'

const Home = React.createClass({

  updateClock: function(){
    const currentTime = new Date()
    let currentHours = currentTime.getHours()
    let currentMinutes = currentTime.getMinutes()
    let currentSeconds = currentTime.getSeconds()

    // Pad the minutes and seconds with leading zeros, if required
    currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes
    currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds
    // Choose either "AM" or "PM" as appropriate
    let timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";
    // Convert the hours component to 12-hour format if needed
    currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours
    // Convert an hours component of "0" to "12"
    currentHours = ( currentHours == 0 ) ? 12 : currentHours
    // Compose the string for display
    let currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay

    $("#time").html(currentTimeString)

  },

  updateDate: function(){
    // the format function is part of antoher plugin, should think up
    // a better way for doing this
    //$("#date").html(new Date().format('l, M. jS'))
  },

  componentDidMount: function(){
    this.updateDate()
    setInterval(this.updateClock, 1000)
    $.get('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places where text="NYC")&format=json', (data) => {
      if (data.query.results !== null) {
        console.log(data.query.results.channel)
        $('#weather').html('<i class="icon-' + data.query.results.channel.item.condition.code + '"></i> &nbsp; ' + data.query.results.channel.item.condition.text)
      }
    })
  },

  render: () => {
    return (
      <div>
        <span id="corner">
          <span id="date">Wednesday, Dec. 21st</span>
          <br/>
          <span id="time">8:00PM</span>
          <br/>
          <span id="weather"><img src="https://www.limkokwing.net/graphics/loading.gif" width="24px"/></span>
        </span>

        <div className="widget video">
          <video src="http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_10mb.mp4" loop autoPlay></video>
        </div>

        <div className="widget message">
          <div className="content">
            <div className="head">
              <img src="https://images.arcadis.com/media/9/4/6/%7B946E8B91-0816-4091-B620-620A24B2BD96%7DMOORE,%20KERRI_CV.jpg?width=240&height=240&mode=crop&anchor=top"/>
              <div className="desc"><span className="title">Enya Brennan</span>
              <span className="time">7:51 PM</span></div>
            </div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <div className="actions">
            <a href="#" className="action">Cancel</a>
            <a href="#" className="action highlight">Reply</a>
          </div>
        </div>

        <div className="widget dark message">
          <div className="content">
            <div className="head">
              <img src="https://images.arcadis.com/media/9/4/6/%7B946E8B91-0816-4091-B620-620A24B2BD96%7DMOORE,%20KERRI_CV.jpg?width=240&height=240&mode=crop&anchor=top"/>
              <div className="desc"><span className="title">Enya Brennan</span>
              <span className="time">7:51 PM</span></div>
            </div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <div className="actions">
            <a href="#" className="action">Cancel</a>
            <a href="#" className="action highlight">Reply</a>
          </div>
        </div>
      </div>
    )
  }
})

export default Home