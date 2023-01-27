import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      minutes: 25,
      seconds: 0,
      session: 25,
      break: 5,
      mode: 'Session'
    }
    this.nonStop = 0
    this.intervalId = 0
    this.change = false
    this.stopWatch = this.stopWatch.bind(this)
    this.stop = this.stop.bind(this)
    this.start = this.start.bind(this)
    this.reset = this.reset.bind(this)
    this.up = this.up.bind(this)
    this.down = this.down.bind(this)
  }

  stopWatch() {
    this.nonStop = true
    if(this.state.seconds <= 0) {
      if(this.state.minutes === 0) {
        let audio = new Audio('https://www.pacdv.com/sounds/interface_sound_effects/sound10.mp3')
        this.setState({
          minutes: this.state.break
        })
        this.change = !this.change
        if(this.change) {
          audio.play()
          this.setState({
            mode: 'Break',
            minutes: this.state.break
          })
        } else {
          audio.play()
          this.setState({
            mode: 'Session',
            minutes: this.state.session
          })
        }
        return this.start()
      }
      this.setState({ minutes: this.state.minutes - 1 })
    }
    
    this.setState({
      seconds: this.state.seconds - 1
    })
    if(this.state.seconds <= 0) {
      this.setState({ seconds: 59 })
    }
  }

  up(event) {
    if(this.nonStop === true) return
    if(this.state.session === 60 || this.state.break === 60) return
    clearInterval(this.intervalId)
    if(event.target.parentElement.value === 'break'){
      this.setState({
        break: this.state.break + 1
      })
    }
    if(event.target.parentElement.value === 'session'){
      this.setState({
        minutes: this.state.minutes + 1,
        seconds: 0,
        session: this.state.minutes + 1
      })
    }
  }

  down(event) {
    if(this.nonStop === true) return
    // this.running = true
    clearInterval(this.intervalId)
    if(event.target.parentElement.value === 'break'){
      if(this.state.break === 1) return
      this.setState({
        break: this.state.break - 1
      })
    }
    if(event.target.parentElement.value === 'session'){
      if(this.state.session === 1) return
      this.setState({
        minutes: this.state.minutes - 1,
        seconds: 0,
        session: this.state.minutes - 1
      })
    }
  }

  start() {
    if(this.running) return
    clearInterval(this.intervalId)
    this.intervalId = setInterval(this.stopWatch, 1000)
    setInterval(this.intervalId)
  }

  stop() {
    this.nonStop = false
    clearInterval(this.intervalId)
  }

  reset() {
    this.nonStop = false
    clearInterval(this.intervalId)
    this.setState({
      minutes: 25,
      seconds: 0,
      session: 25,
      break: 5,
      mode: 'Session'
    })
  }
  
  render() {

    
    return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <div className='lengths'>
        <div id='break-Length'>
          <h3>Break Length</h3>
          <button className='btn-small deep-purple lighten-2' onClick={this.down} value='break'>
            <i className='material-icons' value='break'>arrow_downward</i>
          </button>
          <div>{this.state.break}</div>
          <button className='btn-small deep-purple lighten-2' onClick={this.up} value='break'>
            <i className='material-icons'>arrow_upward</i>
          </button>
        </div>
        <div id='session-Length' className=''>
          <h3>Session Length</h3>
          <button className='btn-small deep-purple lighten-2' onClick={this.down} value='session'>
            <i className='material-icons' value='session'>arrow_downward</i>
          </button>
          <div>{this.state.session}</div>
          <button className='btn-small deep-blue lighten-2' onClick={this.up} value='session'>
            <i className='material-icons'>arrow_upward</i>
          </button>
        </div>
      </div>
      <div className='minutes'>
        <div>{this.state.mode}</div>
        <div>{`${this.state.minutes.toString().padStart(2, 0)} : ${this.state.seconds.toString().padStart(2, 0)}`}</div>
      </div>
      <div className='buttons'>
        <button className='btn-watch' onClick={this.start}>Play</button>
        <button className='btn-watch' onClick={this.stop}>Pause</button>
        <button className='btn-watch' onClick={this.reset}>Reset</button>
      </div>
    </div>
  );
  }
}

export default App;
