import React from "react"

class SavedThreads extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			savedThreads : ""
		}

	}

	// will hold the saved thread components also in charge of rendering it.
	render(){
		return(
			<div>
				<h2>test</h2>
			</div>
		)
	}

}

export default SavedThreads;