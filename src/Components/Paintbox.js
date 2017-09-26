import React, { Component } from 'react'

import './Paintbox.styl'

import Paintblock from './Paintblock'

export default class Paintbox extends Component {
	constructor(props) {
		super(props)

		this.state = {
			colors: [],
			darkcolors: []
		}
	}
	componentWillMount = () => {
		this.fetchColors()
	}

	fetchColors = () => {
		fetch('https://raw.githubusercontent.com/FalkZ/paintbox/master/colors.json')
			.then(response => {
				return response.json()
			})
			.then(fetchedcolors => {
				console.log(fetchedcolors)
				this.getValues(fetchedcolors)
			})
	}

	getHSL = color => {
		let r = parseInt(color.substr(1, 2), 16) // Grab the hex representation of red (chars 1-2) and convert to decimal (base 10).
		let g = parseInt(color.substr(3, 2), 16)
		let b = parseInt(color.substr(5, 2), 16)
		r /= 255
		g /= 255
		b /= 255
		var max = Math.max(r, g, b),
			min = Math.min(r, g, b)
		var h,
			s,
			l = (max + min) / 2

		if (max === min) {
			h = s = 0 // achromatic
		} else {
			var d = max - min
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0)
					break
				case g:
					h = (b - r) / d + 2
					break
				case b:
					h = (r - g) / d + 4
					break
				default:
			}
			h /= 6
		}

		return [h, s, l]
	}

	getValues = fetchedcolors => {
		let colors = []

		fetchedcolors.map(color => {
			let hsl = this.getHSL(color)
			colors.push({ hexCode: color.toUpperCase(), h: hsl[0], s: hsl[1], l: hsl[2] })
		})
		this.sortColors(colors)
	}

	sortColors = colors => {
		console.log(colors)
		colors.sort(function(a, b) {
			return parseFloat(a.h) - parseFloat(b.h)
		})

		let darkcolors = []
		colors.map(function(color, index) {
			if (color.s * color.l < 0.12) {
				colors.splice(index, 1)
				darkcolors.push(color)
			}
		})

		this.setState({ colors, darkcolors })
	}

	render() {
		return (
			<span>
				<div className="Paintbox">
					{this.state.colors.map(({ hexCode }, index) => <Paintblock hexCode={hexCode} key={index} />)}
				</div>
				<div className="Paintbox">
					{this.state.darkcolors.map(({ hexCode }, index) => <Paintblock hexCode={hexCode} key={index} />)}
				</div>
			</span>
		)
	}
}
