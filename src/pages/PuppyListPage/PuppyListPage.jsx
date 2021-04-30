import React from 'react';
import PuppyListItem from '../../components/PuppyListItem/PuppyListItem';
import './PuppyListPage.css';

function PuppyListPage(props) {
	return (
		<>
			<h1>Puppy List</h1>
			<div className='PuppyListPage-grid'>
				{props.puppies.map(puppy => (
					<PuppyListItem
						puppy={puppy}
						key={puppy._id}
						handleDeletePuppy={props.handleDeletePuppy}
					/>
				))}
			</div>
		</>
	);
}

export default PuppyListPage;
