import React, { Component } from 'react'

// Stylesheets
import './App.styl'

// Components
import Header from './Components/Header'
import Paintbox from './Components/Paintbox'

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<div className="App">
				<Header />
				<Paintbox />
			</div>
		)
	}
}
