import React, {useState} from 'react'
import axios from 'axios'
import {Table, Form, Button} from 'react-bootstrap'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

const TableScreen = () => {
	const apiURL = 'https://jsonplaceholder.typicode.com/todos'

	const [userId, setUserId] = useState(0)
	const [title, setTitle] = useState('')
	const [completed, setCompleted] = useState(false)
	const [results, setResults] = useState([])
	const [error, setError] = useState([])

	const callApi = async () => {
		const {data} = await axios.get(apiURL)

		setResults(data)
	}
	const submitHandler = (e) => {
		e.preventDefault()
		if (title === '') {
			setError('Cannot leave title empty')
		} else if (results.length > 0) {
			setError('')
			const newId = results[results.length - 1].id + 1
			const newResult = {userId, title, completed, id: newId}
			let newResults = results
			newResults.push(newResult)

			setResults(newResults)
			setUserId(0)
			setTitle('')
			setCompleted(false)
		}
	}
	const onDragEnd = (param) => {
		const sourceIndex = param.source.index
		const destinationIndex = param.destination.index
		let res = results
		res.splice(destinationIndex, 0, res.splice(sourceIndex, 1)[0])
		setResults(res)
	}

	return (
		<div>
			{results.length === 0 && (
				<Button onClick={callApi}>Call API</Button>
			)}
			{error !== '' && <h2>{error}</h2>}
			{results.length > 0 && (
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='userId'>
						<Form.Label>UserId</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter UserId'
							value={userId}
							onChange={(e) => setUserId(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='title'>
						<Form.Label>Title</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter Title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='completed'>
						<Form.Label>Completed</Form.Label>
						<Form.Check
							type='checkbox'
							placeholder='Enter Completed'
							value={completed}
							onChange={(e) => setCompleted(e.target.value)}
						></Form.Check>
					</Form.Group>
					<Button type='submit' variant='primary'>
						Add to results
					</Button>
				</Form>
			)}
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
