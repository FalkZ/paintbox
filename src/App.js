import React, { Component } from 'react'

// Stylesheets
import './App.styl'
import github from './github.css'

// Components
import Header from './Components/Header'
import Paintbox from './Components/Paintbox'
import Footer from './Components/Footer'

const cursor = '<span id="cursor"/>'

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			zoom: 1,
			cursorpos: 0,
			tagselected: false,
			index: 0,
			text: '',
			markdownblocks: [
				`| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |`,
				'#  Kadersitzung ',
				'##  Schlauchboote ',
				'##  Standartenwettschiessen ',
				'  Wie gelaufen?\n  \n  Danke an Marius',
				'##  Kaderkurse ',
				'   Termin festlegen\n    \n   Nick Koordinaten, Ich Seilbrücke\n  \n  Kaderwochenende',
				'##  Nachtspektakel ',
				'   grober Ablauf von Marius und Finn\n    \n   Ich keine Aufgaben, kein Gangster',
				'##  Samstagsprogramme ',
				'  Zuteilen der Übungen'
			],
			markdownstring: '',
			inputValue: '',
			dropdownSelected: ' ',
			dropdownItems: [
				{
					name: 'Paragraph',
					tag: ' '
				},
				{
					name: 'Header 1',
					tag: '#'
				},
				{
					name: 'Header 2',
					tag: '##'
				},
				{
					name: 'Header 3',
					tag: '###'
				}
			]
		}
	}

	componentDidMount() {
		window.addEventListener('hashchange', function() {
			window.scrollTo(window.scrollX, window.scrollY - 100)
		})
		/*
		window.addEventListener('keydown', function(event) {
			if (event.ctrlKey && event.key == 'p') {
				event.preventDefault()
				var content = document.getElementById('markdown')
				var pri = document.getElementById('ifmcontentstoprint').contentWindow
				pri.document.open()
				pri.document.write(content.innerHTML)
				pri.document.close()
				pri.focus()
				pri.print()
			}
		})
		*/

		this.handleResize

		window.addEventListener('resize', this.handleResize)
	}

	handleResize = () => {
		let zoom = 2 / window.devicePixelRatio
		console.log(zoom)
		this.setState({ zoom })
	}

	handleDropdown = (event, index, value) =>
		this.setState(
			{
				dropdownSelected: value
			},
			this.processInput
		)

	handleSelect = event => {
		let index = Number.parseInt(event.target.id)
		if (Number.isInteger(index)) {
			this.setState({ index }, this.loadSelected)
		}
	}

	loadSelected = () =>
		this.setState(
			{
				text: this.state.markdownblocks[this.state.index]
					.split('\n')
					.map(val => val.trim())
					.join('\n')
					.split(cursor)
					.join(''),
				tagselected: false
			},
			this.getTag
		)

	handleKeydown = event => {
		if (this.state.cursorpos == 0) {
			this.setState({ tagselected: false })
		}
		switch (event.key) {
			case ' ':
				this.setState(
					{
						space: true
					},
					this.getTag
				)
				break
			case 'Tab':
				event.preventDefault()
				this.setState({
					index: this.state.index + 1,
					text: '',
					tagselected: false
				})
				break
			default:
				this.setState({ space: false, tab: false })
		}
	}

	handleInput = event =>
		this.setState(
			{
				text: event.target.value,
				cursorpos: event.target.selectionStart
			},
			this.processInput
		)

	getTag = () => {
		if (this.state.tagselected == false) {
			let tag = this.state.text.split(' ')[0]
			if (this.state.dropdownItems.map(({ tag }) => tag).indexOf(tag) >= 1) {
				this.setState(
					{
						space: false,
						tagselected: true,
						dropdownSelected: tag,
						text: this.state.text
							.split(tag)
							.join('')
							.trim()
					},
					this.processInput
				)
			} else {
				this.setState(
					{
						dropdownSelected: ' '
					},
					this.processInput
				)
			}
		}
	}

	processInput = () => {
		let markdowntext = ''
		let tag = this.state.dropdownSelected
		let text =
			this.state.text.substring(0, this.state.cursorpos) + cursor + this.state.text.substring(this.state.cursorpos)
		text = text.split('\n')
		switch (this.state.dropdownSelected) {
			case '#':
			case '##':
			case '###':
				markdowntext = tag + text.map(line => ` ${line} `).join('<br/>')
				break
			case ' ':
				markdowntext = tag + text.map(line => ` ${line} `).join('\n')
				break
			default:
				markdowntext = text.map(line => `${tag} ${line}`).join('\n')
		}
		if (this.state.tab) {
		}

		let tempmarkdownblocks = [...this.state.markdownblocks]
		tempmarkdownblocks = tempmarkdownblocks
			.join('SPACE281')
			.split(cursor)
			.join('')
			.split('SPACE281')
		tempmarkdownblocks[this.state.index] = markdowntext

		this.setState(
			{
				markdownblocks: tempmarkdownblocks
			},
			this.scrollToCursor
		)
	}

	scrollToCursor = () => (window.location.hash = this.state.index)

	render() {
		return (
			<div className="App" onKeyDown={this.handleCtrl}>
				<Header />
				<Paintbox />
				<Footer
					inputValue={this.state.text}
					handleInput={this.handleInput}
					handleKeydown={this.handleKeydown}
					handleDropdown={this.handleDropdown}
					dropdownSelected={this.state.dropdownSelected}
					dropdownItems={this.state.dropdownItems}
				/>
			</div>
		)
	}
}
