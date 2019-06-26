import React from "react";

class ChangeSubreddit extends React.Component{
	constructor() {
    	super()
    	//this binding enables access to state and other params
	    this.handleButtonPress = this.handleButtonPress.bind(this)
		this.handleButtonRelease = this.handleButtonRelease.bind(this)
	}

	//set long press function 
	handleButtonPress (subreddit) {
    	this.buttonPressTimer = setTimeout(() => this.props.removeSub(subreddit), 1500);
	}

	handleButtonRelease (subreddit) {
		clearTimeout(this.buttonPressTimer);
	}

	//saved subreddits render
	render(){
		const subredditData = this.props.displaySubs;
		return(
			<div className='bookmark_subs'>
				<ul>
					{subredditData.map(item => (
	            		<li key={item}>
	            			<button
	            				onClick={() => { this.props.searchSub(item)}}

	            				onTouchStart={ () => { this.handleButtonPress(item)}} 
						        onTouchEnd={ () => { this.handleButtonRelease(item)}} 
						        onMouseDown={ () => { this.handleButtonPress(item)}} 
						        onMouseUp={ () => { this.handleButtonRelease(item)}} 
						        onMouseLeave={ () => { this.handleButtonRelease(item)}}
	            			>
	            				{ 
	            					/*if state change to undefined*/
	            					(typeof item !== 'undefined') ? "r/" + item : ""
	            				}
	            			</button>
	            		</li>
	          		))}
          		</ul>
          		<div className='subDesc'><small>Longpress to remove sub</small></div>
			</div>
		)
	}
}

export default ChangeSubreddit