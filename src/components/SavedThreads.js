import React from "react"

class SavedThreads extends React.Component {

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
	// display using this: https://medium.com/javascript-in-plain-english/how-to-loop-through-arrays-in-react-3eaa8a14445
	render(){
		const menuStatus = this.props.menuStatus;
		let renderLayout;

		switch (menuStatus) {
			case "threadView":
				renderLayout = 
					<div>
						<span>Save Thread</span>
					</div>;
				break;
			default:
				renderLayout = 
					<div>
						<span>Display Threads</span>
					</div>;
				break;
		}

		console.log(menuStatus);

		return(
			<div>{renderLayout}</div>
		)
	}

}

export default SavedThreads;