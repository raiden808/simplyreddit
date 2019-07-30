import React from "react"

const ReturnThreads = props =>{
  	return(
		<a 
			href="#" 
			className="smpl_btn read_btn" 
			onClick={props.handleReturnThread}
		>
			Back
		</a>
	)
}

class SavedThreads extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			renderText : "", // thread content goes here
		};
	}

	// retrive url on click
	handleThreadClick = e =>{

		let targetUrl =  e.target.dataset.url;

		// save thread to state
		this.fetchSavedThread(targetUrl);
	}

	//properly convert html tags
	renderSelfText = (textHtml) =>{
		return textHtml.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
	}

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
			return this.setState(
				{ 
					renderText: this.renderSelfText(
						returnedData[0].data.children[0].data.selftext_html
					)
				}
			);
		} 

		catch (error) {
			return "Thread can't be found!";
		}
	}

	// reset state
	handleReturnThread = () =>{
		this.setState({ renderText:""});
		alert("test");
		console.log("update");
	}

	render(){
		
		const saveThread = this.props.savedThread;
		let   renderLayout = "";

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

		if(this.state.renderText != ""){
			renderLayout = 
				<div>
					<ReturnThreads />
					<div 
						dangerouslySetInnerHTML={{__html: this.state.renderText}}>
					</div>
				</div>
		} else{
			renderLayout = 
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
				</div>;
		}

		return(
			<div>
				{renderLayout}
			</div>
		)
	}

}

export default SavedThreads;