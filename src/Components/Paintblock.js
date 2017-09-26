import React, { Component } from 'react'
import ntc from 'ntc'
import CopyToClipboard from 'react-copy-to-clipboard'

import './Paintblock.styl'

export default class Paintblock extends Component {
	constructor(props) {
		super(props)

		this.state = {}
	}
	componentWillMount() {
		const color = ntc.name(this.props.hexCode)
		let near = color[0]
		let name = color[1]
		let exact = color[2]
		this.setState({ near, name, exact })
	}

	getName = () => {
		if (this.state.exact) {
			return <div className="name">{this.state.name}</div>
		} else {
			return (
				<div className="preview" style={{ background: this.state.near }}>
					<div className="name">{this.state.name}</div>
					{this.getHexCode(this.state.near)}
				</div>
			)
		}
	}

	getHexCode = hexCode => {
		let hex = hexCode.split('')
		let r = hex[1] + '' + hex[2]
		let g = hex[3] + '' + hex[4]
		let b = hex[5] + '' + hex[6]
		return (
			<CopyToClipboard text={this.props.hexCode} onCopy={() => console.log('copyed')}>
				<div className="hexcode">
					#<span>{r}</span>
					<span>{g}</span>
					<span>{b}</span>
				</div>
			</CopyToClipboard>
		)
	}

	render() {
		return (
			<div className="Paintblock" style={{ background: this.props.hexCode }}>
				<CopyToClipboard text={this.state.near} onCopy={() => console.log('copyed')}>
					{this.getName()}
				</CopyToClipboard>

				{this.getHexCode(this.props.hexCode)}
			</div>
		)
	}
}
