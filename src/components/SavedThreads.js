import React from "react"

class SavedThreads extends React.Component{

	//display saved threads here
	constructor(props){
		super(props);

		this.state = {
			savedThreads : ""
		}

	}

	// will hold the saved thread components also in charge of rendering it.
	// use conditional display for saving here. render dpending on status of the nav 
	// menu
	render(){
		return(
			<div>
				<h2>test</h2>
			</div>
		)
	}

}

export default SavedThreads;