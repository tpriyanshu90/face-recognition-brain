import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
	return (
		<div className="center">
			<div className="mt2 relative">
				{(imageUrl !=="")?<img id="inputImage" 
								  width="500px"
								  height="auto" 
								  alt="yourPhoto"
								  src={imageUrl}/>:null
				}
				<div className="bounding-box" style={{top: box.topRow, right: box.rightCol, left: box.leftCol, bottom: box.bottomRow}}>
				</div>		
			</div>
		</div>  
	);
}

export default FaceRecognition;