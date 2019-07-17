import React from "react"





class SavedThreads extends React.Component {

	//display saved threads here
	constructor(props){
		super(props);
	}

	// will hold the saved thread components also in charge of rendering it.
	// use conditional display for saving here. render dpending on status of the nav 
	// menu
	// display using this: https://medium.com/javascript-in-plain-english/how-to-loop-through-arrays-in-react-3eaa8a14445
	render(){
		
		const saveThread = this.props.savedThread;

		const subredditPosts = saveThread.map(key  => {
			console.log(key.threadObject.id)
		});

		return(
			<div></div>
		)
	}

}

export default SavedThreads;