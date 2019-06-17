import React from "react";

class ChangeSubreddit extends React.Component{
	constructor() {
    	super()
	    this.handleButtonPress = this.handleButtonPress.bind(this)
		this.handleButtonRelease = this.handleButtonRelease.bind(this)
	}

	//index 
	handleButtonPress (subreddit) {
    	this.buttonPressTimer = setTimeout(() => alert(subreddit), 1500);
	}

	handleButtonRelease (subreddit) {
		clearTimeout(this.buttonPressTimer);
	}

	render(){
		const subredditData = this.props.displaySubs;

		//use () => {function name} to pass the function on click
		return(
			<div className='bookmark_subs'>
				{subredditData.map(item => (
            		<span key={item}>
            			<a 
            				href="#" 
            				onClick={() => { this.props.searchSub(item)}}

            				onTouchStart={ () => { this.handleButtonPress(item)}} 
					        onTouchEnd={ () => { this.handleButtonRelease(item)}} 
					        onMouseDown={ () => { this.handleButtonPress(item)}} 
					        onMouseUp={ () => { this.handleButtonRelease(item)}} 
					        onMouseLeave={ () => { this.handleButtonRelease(item)}}
            			>
            				r/{item}
            			</a>
            		</span>
          		))}
			</div>
		)
	}
}

export default ChangeSubreddit