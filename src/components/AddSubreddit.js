import React from "react";

class AddSubreddit extends React.Component{
	render(){

		const subredditData = this.props.displaySubs;

		return(
			<div className='bookmark_subs'>
				{subredditData.map(item => (
            		<span key={item}><a href="#">r/{item} </a></span>
          		))}
			</div>
		)
	}
}

export default AddSubreddit;