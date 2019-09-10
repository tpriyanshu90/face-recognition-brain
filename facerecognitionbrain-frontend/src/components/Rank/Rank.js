import React from 'react';

const Rank = ({ userProfile }) => {
	return (
		<div>
			<div className="white f3">
				{userProfile.name+', your current rank is...'}
			</div>
			<div className="white f3">
				{ userProfile.entries }
			</div>
		</div>
	);
}

export default Rank;