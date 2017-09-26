import React, { Component } from 'react'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import FontIcon from 'material-ui/FontIcon'
import TabIcon from 'material-ui/svg-icons/hardware/keyboard-tab'
import SelectIcon from 'material-ui/svg-icons/editor/wrap-text'
import './Footer.styl'
export default class Footer extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	dropdownItems = this.props.dropdownItems.map(({ name, tag }, index) => (
		<MenuItem key={index} value={tag} primaryText={name} />
	))
	render() {
		return (
			<Toolbar
				style={{
					zoom: this.props.zoom
				}}
				className="Footer"
			>
				<IconButton touch={true}>
					<TabIcon />
				</IconButton>
			</Toolbar>
		)
	}
}
