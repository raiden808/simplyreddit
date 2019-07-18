import React from "react"





class SavedThreads extends React.Component {

	//display saved threads here
	constructor(props){
		super(props);
	}

	// will hold the saved thread components also in charge of rendering it.
	// change app.js state onclick of button
	// use specific thread function
	render(){
		
		const saveThread = this.props.savedThread;

		console.log(saveThread)

		const subredditPosts = saveThread.map(key  => {
			// console.log(key.threadObject.id)
			console.log(key.threadObject.url)
			return(
				<li key={key.threadObject.id}>
	            	<button data-url={key.threadObject.url}>
	            		{key.threadObject.title}
	            	</button>
	            </li>
			)	
		});

		return(
			<div>
				<div className="activeSub">
					<h3>
						Save threads
					</h3>
				</div>
				<div className='bookmark_subs'>
					<ul>	
						{subredditPosts}
					</ul>
				</div>
			</div>
		)
	}

}

export default SavedThreads;