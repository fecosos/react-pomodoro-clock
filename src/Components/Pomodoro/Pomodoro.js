import React from 'react';
import 'Styles/normalize.css'
import 'Styles/Pomodoro.css';
import { setInterval } from 'core-js';

class Pomodoro extends React.Component {
	state = {
		breakMinutes: 5,
		workMinutes: 25,
		timerMinutes: 25,
		timerSeconds: 0,
		timerRunning: false,
		whatTimer: 'work',
		interval: ''
	}
	setTimer(event, operation, whatMinutes){
		const newTMinutes = operation === '+' ? this.state[whatMinutes] + 1 : this.state[whatMinutes] - 1
		if(newTMinutes > 0) {
			this.setState({
				[whatMinutes]: newTMinutes
			})
		}
	}
	

	componentDidMount(){
		const interval = setInterval(()=> {
			this.timer()
		}, 1000)
		this.setState({interval: interval})
	}
	componentWillUnmount(){
		clearInterval(this.state.interval)
	}
	timer(){
		if (this.state.timerRunning) {
			if(this.state.timerSeconds === 0){
				this.setState({
					timerSeconds: 59,
					timerMinutes: this.state.timerMinutes - 1
				})
			}
			if (this.state.timerMinutes === 0 && this.state.timerSeconds === 1) {
				const whatTimer = this.state.whatTimer === 'work' ? 'break' : 'work'
				const nextMinutes = this.state[`${whatTimer}Minutes`]
				console.log(`Starting ${whatTimer}`)
				this.setState({
					whatTimer: whatTimer,
					timerSeconds: 0,
					timerMinutes: nextMinutes
				})
			}
			else{
				const seconds = this.state.timerSeconds - 1
				this.setState({timerSeconds: seconds})
			}
		}
	}
	togglePlay(){
		this.setState({
			timerRunning: !this.state.timerRunning,
			timerMinutes: this.state.workMinutes,
			timerSeconds: 0,
		})
	}

	render() {
		this.setTimer = this.setTimer.bind(this)
		this.togglePlay = this.togglePlay.bind(this)
		let progress
		if(this.state.timerRunning){
			const secondsLeft = (this.state.timerMinutes * 60) + (this.state.timerSeconds)
			const secondsTotal = this.state[this.state.whatTimer === 'work' ? 'workMinutes' : 'breakMinutes'] * 60
			progress = Math.ceil((secondsLeft * 100 / secondsTotal))
		}
		else{
			progress = 100
		}
		return (
			<div id="Pomodoro" className="Pomodoro">
				<h1>Pomodoro'Clock</h1>
				<div className="TimeSetter-wrapper">
					<TimeSetter text="Work" whatMinutes="workMinutes" minutes={this.state.workMinutes} setTimer={this.setTimer} />
					<TimeSetter text="Break" whatMinutes="breakMinutes" minutes={this.state.breakMinutes} setTimer={this.setTimer} />
				</div>
				<TimerDisplay
					togglePlay={this.togglePlay}
					timerRunning={this.state.timerRunning}
					timerMinutes={this.state.timerMinutes}
					timerSeconds={this.state.timerSeconds}
					currSession={this.state.whatTimer}
					progress={progress}
				/>
			</div>
		);
	}
}

const TimeSetter = (props) => {
	const whatMinutes = props.whatMinutes
	const minutes = props.minutes
	return (
		<div className="TimeSetter">
			<h3>{props.text}</h3>
			<div className="buttonNDisplay">
				<button onClick={(e) => props.setTimer(e, '-', whatMinutes)}>-</button>
				<span>{minutes}</span>
				<button onClick={(e)=> props.setTimer(e,'+',whatMinutes)}>+</button>
			</div>
		</div>
	)
}

const TimerDisplay = (props) => {
	const TimerText = props.timerRunning  ? 'Reset' : 'Start'
	const minutes = props.timerMinutes < 10 ? `0${props.timerMinutes}` : props.timerMinutes
	const seconds = props.timerSeconds < 10 ? `0${props.timerSeconds}` : props.timerSeconds
	const currSession = props.currSession === 'work' ? 'Work' : 'Break'
	return(
		<div className="TimerDisplay">
			<div className="circle" onClick={props.togglePlay} >
				<p className="session">{currSession} session</p>
				<p className="timer">
					<span className="timerMinutes">{minutes}</span>
					<span className="dots">:</span>
					<span className="timerSeconds">{seconds}</span>
				</p>
				<p className="timer-status">{TimerText}</p>
				<div className="fill" style={{top: `${props.progress}%`}} ></div>
			</div>
		</div>
	)
}
export default Pomodoro;
