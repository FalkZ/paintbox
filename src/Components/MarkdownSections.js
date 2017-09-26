import React, { Component } from 'react'
import Markdown from 'react-remarkable'
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc'

import github from '../github.css'
import './Markdown.styl'

const DragHandle = SortableHandle(() => <div className="markdowndrag" />)

const SortableItem = SortableElement(({ value }) => {
	return (
		<div className="markdownsection">
			{value.map((source, index) => (
				<div className="markdownblock" id={index} key={index}>
					<Markdown
						source={source}
						options={{
							html: true,
							xhtmlOut: true,
							linkify: true,
							typographer: true
						}}
						styles={github}
					/>
				</div>
			))}
			<DragHandle />
		</div>
	)
})

const SortableList = SortableContainer(({ items }) => {
	return (
		<div className="markdownwrapper">
			<SortableItem value={items} />
		</div>
	)
})

export default class MarkdownSections extends Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	render() {
		return (
			<SortableList
				helperClass="markdownhelper"
				useDragHandle={true}
				items={this.props.items}
				onSortEnd={this.props.onSortEnd}
			/>
		)
	}
}
