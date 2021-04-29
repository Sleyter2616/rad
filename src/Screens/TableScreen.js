import React, {useState} from 'react'
import axios from 'axios'
import {Table, Container} from 'react-bootstrap'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import TableRow from '../components/TableRow'

const TableScreen = () => {
	const apiURL = 'https://jsonplaceholder.typicode.com/todos'

	const [results, setResults] = useState({})
	const callApi = async () => {
		const {data} = await axios.get(apiURL)
		setResults(data)
	}
	const onDragEnd = (param) => {
		const sourceIndex = param.source.index
		const destinationIndex = param.destination.index
		let res = results
		res.splice(destinationIndex, 0, res.splice(sourceIndex, 1)[0])
		console.log(res)
		setResults(res)
	}
	return (
		<div>
			<button onClick={callApi}>Call API</button>
			<DragDropContext
				onDragEnd={(param) => {
					onDragEnd(param)
				}}
			>
				<Table striped bordered hover responsive>
					<thead>
						<tr>
							<th>Select</th>
							<th>UserId</th>
							<th>Id</th>
							<th>Title</th>
							<th>Completed</th>
						</tr>
					</thead>

					<Droppable droppableId='droppable-1'>
						{(provided, snapshot) => (
							<tbody
								ref={provided.innerRef}
								{...provided.droppableProps}
							>
								{results.length > 0 &&
									results.map((result, index) => (
										<Draggable
											draggableId={
												'draggable-' + result.id
											}
											key={result.id}
											index={index}
										>
											{(provided, snapshot) => (
												<tr
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													ref={provided.innerRef}
													style={{
														...provided
															.draggableProps
															.style,
														boxShadow: snapshot.isDragging
															? '0 0 .4rem #666'
															: 'none',
													}}
												>
													<td>
														<input type='checkbox' />
													</td>
													<td>{result.userId}</td>
													<td>{result.id}</td>
													<td>{result.title}</td>
													<td>
														{result.completed ===
														true
															? 'True'
															: 'False'}
													</td>
												</tr>
											)}
										</Draggable>
									))}
								{provided.placeholder}
							</tbody>
						)}
					</Droppable>
				</Table>
			</DragDropContext>
		</div>
	)
}

export default TableScreen

//
