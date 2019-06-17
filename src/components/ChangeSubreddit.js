import React from "react";

class ChangeSubreddit extends React.Component{

	render(){
		const subredditData = this.props.displaySubs;

		//use () => {function name} to pass the function on click
		return(
			<div className='bookmark_subs'>
				{subredditData.map(item => (
            		<span key={item}><a href="#" onClick={() => { this.props.searchSub(item)}}>r/{item} </a></span>
          		))}
			</div>
		)
	}
}

export default ChangeSubreddit