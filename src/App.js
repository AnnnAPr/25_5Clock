import React from 'react';
import './App.css';

function App () {
  return ( 
    <Clock />
  );
}

class Clock extends React.Component {
  
  constructor (props) {
    super(props);
    
    this.state = {
      counterLength: 600,
      sessionLength: 25,
      breakLength: 5,
      timeLeft: '25:00',
      minutes: 25,
      seconds: 0,
      timerStatus: '',
      timerType: 'Session'
    }
    
    this.timerControl = this.timerControl.bind(this);
    this.reset = this.reset.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);     
    this.breakIncrement = this.breakIncrement.bind(this);  
    this.sessionDecrement = this.sessionDecrement.bind(this);     
    this.sessionIncrement = this.sessionIncrement.bind(this);  
    this.addZero = this.addZero.bind(this);
    this.breakStart = this.breakStart.bind(this);
    this.sessionStart = this.sessionStart.bind(this);
    this.breakCounter = this.breakCounter.bind(this);
  }
   
  breakDecrement () {
    if (this.state.timerStatus == 'running'  || this.state.timerStatus == 'paused') { return };
    const { breakLength } = this.state;    
    let newBreakLength = breakLength - 1;
    if (breakLength > 1) {
      this.setState({
          breakLength: newBreakLength
      });
    }
  }
  
  breakIncrement () {
    if (this.state.timerStatus == 'running'  || this.state.timerStatus == 'paused') { return };
    const { breakLength } = this.state;
    let newBreakLength = breakLength + 1;
    if (breakLength < 60) {
      this.setState({
          breakLength: newBreakLength
      });
    }
  }

  sessionDecrement () {
    if (this.state.timerStatus == 'running' || this.state.timerStatus == 'paused') { return };
    const { sessionLength, minutes } = this.state;    
    let newSessionLength = sessionLength - 1;
    if (sessionLength > 1) {
      this.setState({
          sessionLength: newSessionLength,
          minutes: newSessionLength,
      });
    }
  }
  
  sessionIncrement () {
    if (this.state.timerStatus == 'running' || this.state.timerStatus == 'paused') { return };
    const { sessionLength, minutes } = this.state;
    let newSessionLength = sessionLength + 1;
    if (sessionLength < 60) {
      this.setState({
          sessionLength: newSessionLength,
          minutes: newSessionLength,
      });
    }
  }
  
   timerControl () { 
     if (this.state.timerStatus === 'running') {
      clearInterval(this.timer);
      clearInterval(this.breakTimer); 
      this.setState({
        timerStatus: 'paused',
      })
      return;
     } else {
        this.setState({
          timerStatus: 'running'
        });
     }
     
     if (this.state.timerType === 'Session') {
       this.timer = setInterval(() => this.sessionStart(), 1000);
     } else if (this.state.timerType === 'Break') {
       
     }
     
     
   }
                         
  sessionStart () {
    const { seconds, minutes } = this.state
  
    if (seconds > 0) {
        this.setState(({ seconds }) => ({
            seconds: seconds - 1
        }))
      

    }
    if (seconds === 0) {
      let minutesDisplay = this.addZero(minutes);
      let secondsDisplay = '00'
        if (minutes === 0) {
            beep.play();
            clearInterval(this.timer)
            this.setState({
              timerStatus: ''
            });
            this.breakStart();
        } else {
            this.setState(({ minutes }) => ({
                minutes: minutes - 1,
                seconds: 59
            }))
        }
    } 
  }      

  breakStart () {
   let minutes = this.state.breakLength; 
   this.setState({
      timerType: 'Break',
      timerStatus: 'running',
      minutes: minutes
   });
     
     this.breakTimer = setInterval(() => this.breakCounter(), 1000);
       
  }
  
  breakCounter () {
    const { seconds, minutes } = this.state     
      
            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
              
            }
            if (seconds === 0) {
              let minutesDisplay = this.addZero(minutes);
              let secondsDisplay = '00'
                if (minutes === 0) {
                    beep.play();
                    clearInterval(this.breakTimer);
                    let sessionLength = this.state.sessionLength
                    this.setState({
                      timerType: 'Session',
                      seconds: 0,
                      minutes: sessionLength,
                      timerStatus: ''
                    });
         
                    this.timerControl();
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            } 
        }
  
  reset () {
    clearInterval(this.timer);
    clearInterval(this.breakTimer);
    beep.load();
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      minutes: 25,
      seconds: 0,
      timerStatus: '',
      timerType: 'Session'
    })
  }

   addZero (value) {
     return ("0" + value).slice(-2);
   }

  render () {
    
    return (
      <div class="container">
        
      <h1 class="container-heading">25+5 Clock</h1>
      
      <div class="controls">
        <div>
          <h2 id="break-label" class="controls-header">Break Length</h2>
        <div class="controls-inner">
          <div>
            <button class="button button-increment" id="break-decrement" onClick={this.breakDecrement}>
            <i class="fa fa-arrow-down fa-2x"></i>
            </button>
          </div>
          <div>
            <p id="break-length" class="controls-inner-length">{this.state.breakLength}</p>
          </div>
          <div>
            <button class="button button-increment" id="break-increment" onClick={this.breakIncrement}>
            <i class="fa fa-arrow-up fa-2x"></i>
            </button>
          </div>
        </div>
        </div>
      
      <div>
        <h2 id="session-label" class="controls-header">Session Length</h2>
                <div class="controls-inner">
        <div>
          <button class="button button-increment" id="session-decrement" onClick={this.sessionDecrement}>
          <i class="fa fa-arrow-down fa-2x"></i>
          </button>
        </div>
        <div>
          <p id="session-length" class="controls-inner-length">{this.state.sessionLength}</p>
        </div>
        <div>
          <button class="button button-increment" id="session-increment" onClick={this.sessionIncrement}>
          <i class="fa fa-arrow-up fa-2x"></i>
          </button>
        </div>
      </div>       
        </div>
        </div>

        <div class="session-container">
          <h3 id="timer-label" class="session-container-header">{this.state.timerType}</h3>
      
          <div id="time-left" class="session-container-timer">
            
            { this.state.minutes < 10 ? '0' + this.state.minutes : this.state.minutes}:{this.state.seconds < 10 ? '0' + this.state.seconds : this.state.seconds}
            </div>
         
          <div class="session-container-controls">
            
          <button class="button button-start-stop" id="start_stop" onClick={this.timerControl}>
            <i class="fa fa-play fa-2x"></i>
            <i class="fa fa-pause fa-2x"></i>
          </button>
        
          <button class="button button-start-stop" id="reset" onClick={this.reset}>
            <i class="fa fa-refresh fa-2x"></i>  
          </button>
        
          <audio ref="beepSound" id="beep" src="http://d-gun.com/files/sounds/RADAR1.WAV" />
          </div>
         </div>
       </div>
    )
  }
}


export default App;
