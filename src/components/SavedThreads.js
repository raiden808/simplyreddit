import React from "react"

const ReturnThreads = props => {
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
			renderText : [], // thread content goes here
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

			return this.setState(
				{ 
					renderText: [...this.state.renderText,returnedData[0].data.children[0].data]
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
	}

	//handle button release on long press
	handleButtonPress (index) {
    	this.buttonPressTimer = setTimeout(() => 
    		this.props.removeSaveThread(index)
    	, 1500);
	}

	handleButtonRelease (subreddit) {
		clearTimeout(this.buttonPressTimer);
	}

	render(){
		
		const saveThread = this.props.savedThread;
		let   renderLayout = "";

		let subredditPosts;

		if (saveThread.length != 0){
			subredditPosts = saveThread.map((key,index)  => {
				return(
					<li key={key.threadObject.id}>
		            	<button 
		            		data-url={key.threadObject.url}
		            		onClick={this.handleThreadClick}

		            		onTouchStart={ () => { this.handleButtonPress(index)}} 
					        onTouchEnd={ () => { this.handleButtonRelease(index)}} 
					        onMouseDown={ () => { this.handleButtonPress(index)}} 
					        onMouseUp={ () => { this.handleButtonRelease(index)}} 
					        onMouseLeave={ () => { this.handleButtonRelease(index)}}
		            	>
		            		{key.threadObject.title}
		            	</button>
		            </li>
				)
			});
		}

		else{
			subredditPosts  = 
				<div>
					<p>No saved thread.</p>
				</div>
		}

		

		if(this.state.renderText != ""){
			renderLayout = 
				<div>
					<div className='activeSub'>
			        	<h3>{this.state.renderText[0].title}</h3>
			        </div>
					<div 
						dangerouslySetInnerHTML={{__html: this.renderSelfText(this.state.renderText[0].selftext_html)}}>
					</div>
					<ReturnThreads handleReturnThread={this.handleReturnThread} />
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
						<div className='subDesc'><small>Longpress to remove thread.</small></div>
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