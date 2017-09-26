import React, { Component } from 'react'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'

import MarkdownSections from './MarkdownSections'

import './Markdown.styl'

export default class Markdown extends Component {
	constructor(props) {
		super(props)

		this.state = {
			items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
		}
	}

	componentDidMount() {
		/*
    let zoom = document.body.clientWidth/700;
     this.setState({zoom});
    window.addEventListener("resize", this.handleResize);
    */
	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState({
			items: arrayMove(this.state.items, oldIndex, newIndex)
		})
	}

	render() {
		return (
			<div className="markdown" id="markdown" onClick={this.props.handleSelect}>
				<MarkdownSections items={this.props.source} onSortEnd={this.onSortEnd} />
			</div>
		)
	}
}
