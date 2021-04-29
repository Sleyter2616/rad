import React from 'react'
import {Draggable} from 'react-beautiful-dnd'

const TableRow = ({children, id, index}) => {
	return (
		<Draggable draggableId={'draggable-' + id} index={index}>
			{(provided) => (
				<tr
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					innerRef={provided.innerRef}
					draggable='true'
				>
					{children}
					{provided.placeholder}
				</tr>
			)}
		</Draggable>
	)
}

export default TableRow
