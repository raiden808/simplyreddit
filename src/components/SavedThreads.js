import React from "react"

class SavedThreads extends React.Component {

	constructor(props){
		super(props);
	}

	// retrive url on click
	handleThreadClick = e =>{

		let targetUrl =  e.target.dataset.url;

		this.state = {
			renderThread : "", // thread content goes here
		};

		console.log(targetUrl);

		this.fetchSavedThread(targetUrl);

		console.log(this.state.renderThread);

	}

	// will hold the saved thread components also in charge of rendering it.
	// change app.js state onclick of button
	// use specific thread function
	// render save thread
	fetchSavedThread = async (url) =>{
		try {
			const threadResponse = await fetch(
				`${url}.json`
			);

			if (!threadResponse.ok){
				return "Thread can't be found!";
			}

			const returnedData = await threadResponse.json();

			// return text
			return this.setState({ renderThread: returnedData[0].data.children[0].data.selftext});
		} 

		catch (error) {
			return "Thread can't be found!";
		}
	}

	render(){
		
		const saveThread = this.props.savedThread;

		const subredditPosts = saveThread.map(key  => {
			return(
				<li key={key.threadObject.id}>
	            	<button 
	            		data-url={key.threadObject.url}
	            		onClick={this.handleThreadClick}
	            	>
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