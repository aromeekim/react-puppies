import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, NavLink, useHistory } from 'react-router-dom';
import * as puppyAPI from '../../utilities/puppies-api';
import PuppyListPage from '../PuppyListPage/PuppyListPage';
import AddPuppyPage from '../AddPuppyPage/AddPuppyPage';
import PuppyDetailPage from '../PuppyDetailPage/PuppyDetailPage';
import EditPuppyPage from '../EditPuppyPage/EditPuppyPage';

function App(props) {
	const [puppies, setPuppies] = useState([]);
	const history = useHistory();

	useEffect(() => {
		// This is listening for each time puppies state is changed,
		// then will run our function below to reroute
		history.push('/');
	}, [puppies, history]);

	useEffect(() => {
		async function getPuppies() {
			const puppies = await puppyAPI.getAll();
			setPuppies(puppies);
		}
		getPuppies();
	}, []);

	async function handleAddPuppy(newPuppyData) {
		const newPuppy = await puppyAPI.create(newPuppyData);
		setPuppies([...puppies, newPuppy]);
	}

	async function handleUpdatePuppy(updatedPuppyData) {
		const updatedPuppy = await puppyAPI.update(updatedPuppyData);

		const newPuppiesArray = puppies.map(puppy => {
			return puppy._id === updatedPuppy._id ? updatedPuppy : puppy;
		});
		setPuppies(newPuppiesArray);
	}

	async function handleDeletePuppy(id) {
		console.log(id);
		await puppyAPI.deleteOne(id);
		setPuppies(puppies.filter(puppy => puppy._id !== id));
	}

	return (
		<div className='App'>
			<header className='App-header'>
				React Puppies CRUD
				<nav>
					<NavLink exact to='/'>
						PUPPIES LIST
					</NavLink>
					&nbsp;&nbsp;&nbsp;
					<NavLink exact to='/add'>
						ADD PUPPY
					</NavLink>
				</nav>
			</header>
			<main>
				<Route exact path='/'>
					<PuppyListPage
						puppies={puppies}
						handleDeletePuppy={handleDeletePuppy}
					/>
				</Route>
				<Route exact path='/add'>
					<AddPuppyPage handleAddPuppy={handleAddPuppy} />
				</Route>
				<Route exact path='/details'>
					<PuppyDetailPage />
				</Route>
				<Route exact path='/edit'>
					<EditPuppyPage handleUpdatePuppy={handleUpdatePuppy} />
				</Route>
			</main>
		</div>
	);
}

export default App;
