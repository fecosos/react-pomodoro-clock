import React, { Component } from 'react';
import 'Styles/normalize.css'
import 'Styles/Pomodoro.css';

class Pomodoro extends Component {
	state = {
		breakMinutes: 5,
		workMinutes: 25,
		timer: 25,
		timerStatus: 'Start'
	}
	render() {
		return (
			<div id="Pomodoro" className="Pomodoro">
				<h1>Pomodoro clock</h1>
				<div className="TimeSetter-wrapper">
					<TimeSetter timeKind="Break" minutes={this.state.breakMinutes} />
					<TimeSetter timeKind="Work" minutes={this.state.workMinutes}/>
				</div>
				<TimerDisplay timer={this.state.timer} timerStatus={this.state.timerStatus} />
			</div>
		);
	}
}

const TimeSetter = (props) => {
	return (
		<div className="TimeSetter">
			<h3>{props.timeKind}</h3>
			<div className="buttonNDisplay">
				<button>-</button>
				<span>{props.minutes}</span>
				<button>+</button>
			</div>
		</div>
	)
}

const TimerDisplay = (props) => {
	return(
		<div className="TimerDisplay">
			<div className="circle">
				<p className="timer">{props.timer}</p>
				<p className="timer-status">{props.timerStatus}</p>
			</div>
		</div>
	)
}
export default Pomodoro;
