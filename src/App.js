import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import HomeScreen from './Screens/HomeScreen'
import TableScreen from './Screens/TableScreen'
import Sidebar from './components/Sidebar'

const App = () => {
	return (
		<BrowserRouter>
			<Sidebar />
			<div className='main'>
				<Route path='/' exact component={HomeScreen} />
				<Route path='/table' component={TableScreen} />
			</div>
		</BrowserRouter>
	)
}

export default App
