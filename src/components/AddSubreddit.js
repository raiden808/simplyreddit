import React from "react";

class AddSubreddit extends React.Component{
	render(){

		const subredditData = this.props.displaySubs;

		console.log(subredditData)

		return(
			<div>
				<p>Hello</p>
			</div>
		)
	}
}

export default AddSubreddit;