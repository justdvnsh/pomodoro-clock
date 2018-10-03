class App extends React.Component {
  constructor() {
    super();
    this.state = {
      time: 1500,
      breakTime: 300
    };
    this.breakTime = 300;
    this.pomodoroStarted = false;
    this.breakStarted = false;
    this.isPaused = false;
    this.dev = false;
    this.audio = new 
Audio('https://res.cloudinary.com/lucedesign/video/upload/v1494560703/8bit-laser_z04j15.wav');
  }

  stopTimer = timer => {
    clearInterval(timer);
    timer = null;
  };

  handleStart = () => {
    if (!this.pomodoroStarted) {
      this.timer = setInterval(() => {
        this.setState({ time: this.state.time - 1 
});
      }, 1000);
      this.pomodoroStarted = 
!this.pomodoroStarted;
    }

    if (!this.time) {
      this.time = this.state.time;
      this.breakTime = this.state.breakTime;
    }
  };

  handlePause = () => {
    if (this.pomodoroStarted) {
      this.isPaused = true;
      this.setState(this.state);
      if (!this.breakStarted) {
        this.stopTimer(this.timer);
      }

      if (this.breakStarted) {
        this.stopTimer(this.breakTimer);
      }
    }
  };

  handleResume = () => {
    if (this.pomodoroStarted) {
      this.setState(this.state);
      this.isPaused = false;

      if (!this.breakStarted) {
        this.timer = setInterval(() => {
          this.setState({ time: this.state.time - 
1 });
        }, 1000);
      }

      if (this.breakStarted) {
        this.breakTimer = setInterval(() => {
          this.setState({ breakTime: 
this.state.breakTime - 1 });
        }, 1000);
      }
    }
  };

  handleReset = () => {
    this.setState({
      time: 1500,
      breakTime: 300
    });
    this.stopTimer(this.timer);
    this.pomodoroStarted = false;
    this.stopTimer(this.breakTimer);
    this.breakStarted = false;
    this.isPaused = false;
  };

  calculateTime = time => {
    return `${Math.floor(time / 60)}:${time % 60 
> 9 ? "" + time % 60 : "0" + time % 60}`;
  };

  increaseTime = () => {
    if (!this.pomodoroStarted) {
      this.setState({ time: this.state.time + 60 
});
    }
  };

  increaseBreakTime = () => {
    if (!this.pomodoroStarted) {
      this.breakTime = this.breakTime + 60;
      this.setState({ breakTime: 
this.state.breakTime + 60 });
    }
  };

  decreaseTime = () => {
    if (this.state.time > 60 && 
!this.pomodoroStarted) {
      this.setState({ time: this.state.time - 60 
});
    }
  };

  decreaseBreakTime = () => {
    if(this.breakTime > 60) {
      this.breakTime = this.breakTime - 60;
    }
    if (this.state.breakTime > 60 && 
!this.pomodoroStarted) {
      this.setState({ breakTime: 
this.state.breakTime - 60 });
    }
  };

  componentDidUpdate() {
    if (this.state.time < 1) {
      this.audio.play();
      var audio = new 
Audio('https://cdnjs.cloudflare.com/ajax/libs/ion-sound/3.0.7/sounds/branch_break.mp3');
audio.play();
      this.stopTimer(this.timer);
      //After the Pomodoro timer ends, set the 
time to the stored value set by the user
      this.setState({ time: this.time });
      if (!this.breakStarted) {
        this.startBreak();
        this.breakStarted = true;
      }
    }

    if (this.state.breakTime < 1) {
      this.audio.play();
      this.stopTimer(this.breakTimer);
      //After the break timer ends, set the time 
to the stored value set by the user
      this.setState({ breakTime: this.breakTime 
});
      this.pomodoroStarted = false;
      this.breakStarted = false;
      this.handleStart();
    }
  }

  startBreak() {
    this.breakTimer = setInterval(() => {
      this.setState({ breakTime: 
this.state.breakTime - 1 });
    }, 1000);
  }

  render() {
    return (
      <div>
        <div className="card" id="main-card">
          <div className="card-body">
              <h1><center>Pomodoro 
Clock</center></h1><br/>
        <div className="card" id="session">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4"> { /* 
col-md-3 start */ }
                <div>
                  <button 
onClick={this.increaseTime} className="btn btn-lg 
btn-primary">+</button>
                </div>
              </div> 
      
              <div className="col-md-4">
                <h2>
                  {this.breakStarted
                    ? 
this.calculateTime(this.state.breakTime)
                    : 
this.calculateTime(this.state.time)}
                </h2>  
              </div>

              <div className="col-md-4">
                <div>
                  <button 
onClick={this.decreaseTime} className="btn btn-lg 
btn-warning">-</button>
                </div>  
              </div>

            </div>
          </div>
        </div><br/>
        <div className="card" id="controls">
          <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                        <button 
onClick={this.handleStart} className="btn btn-lg 
btn-block btn-success">Start</button>
                  </div>  
                  <div className="col-md-4">
                    <button
              onClick={this.isPaused ? 
this.handleResume : this.handlePause}
              className="btn btn-lg btn-warning 
btn-block"
            >
              {this.isPaused ? "Resume" : 
"Pause"}
            </button>
                  </div>
                  <div className="col-md-4">
                    <button 
onClick={this.handleReset} className="btn btn-lg 
btn-block btn-danger">Reset</button>
                  </div>

                </div> <br/> 

              <div className="row">
                <div className="col-md-4">
                  <button 
onClick={this.increaseBreakTime} className="btn 
btn-lg btn-primary">+</button>
                </div>  

                <div className="col-md-4">
                  <h3 className="break-text">
                    
{this.calculateTime(this.breakTime)}
                  </h3>
                </div>

                <div className="col-md-4">
                    <button 
onClick={this.decreaseBreakTime} className="btn 
btn-lg btn-warning">-</button>
                </div>
              </div>

          </div>
        </div>
            
          </div>
        </div>
        <div>
          {this.dev
            ? <table>
                <tr>
                  <th>State</th>
                  <th>Value</th>
                </tr>
                <tr>
                  <td>this.state.time:</td>
                  <td>{this.state.time}</td>
                </tr>
                <tr>
                  <td>this.state.breakTime:</td>
                  <td>{this.state.breakTime}</td>
                </tr>
                <tr>
                  <td>This.time:</td>
                  <td>{this.time}</td>
                </tr>
                <tr>
                  <td>This.breakTime:</td>
                  <td>{this.breakTime}</td>
                </tr>
                <tr>
                  <td>This.pomodoroStarted:</td>
                  
<td>{this.pomodoroStarted.toString()}</td>
                </tr>
                <tr>
                  <td>breakStarted:</td>
                  
<td>{this.breakStarted.toString()}</td>
                </tr>
                <tr>
                  <td>isPaused:</td>
                  
<td>{this.isPaused.toString()}</td>
                </tr>
                <tr>
                  <td>This.timer:</td>
                  <td>{this.timer}</td>
                </tr>
                <tr>
                  <td>This.breakTimer:</td>
                  <td>{this.breakTimer}</td>
                </tr>
              </table>
            : ""}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, 
document.getElementById("root"));

