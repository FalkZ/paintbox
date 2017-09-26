import React, { Component } from 'react'

import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import FontIcon from 'material-ui/FontIcon'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import BrushIcon from 'material-ui/svg-icons/image/brush'

import './Header.styl'

export default class Header extends Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	handleChange = (event, index, value) => this.setState({ value })

	logChange(val) {
		console.log('Selected: ' + JSON.stringify(val))
	}

	render() {
		return (
			<Toolbar style={{ zoom: this.props.zoom }} className="Header">
				<ToolbarGroup className="Title">
					paint<span>BOX</span>
				</ToolbarGroup>

				<IconButton touch={true}>
					<SettingsIcon />
				</IconButton>
			</Toolbar>
		)
	}
}
