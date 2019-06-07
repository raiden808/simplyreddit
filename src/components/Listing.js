import React from "react";
class Listing extends React.Component {

	displayThread = (e) =>{
		//no use?
		const threadID = e.target.className;
		//specific index of array.
		const index = e.target.getAttribute('data-index');
		const subredditData = this.props.subreddit.data.children; 


		const threadText = subredditData[index].data.selftext;
		//console.log();
		var element = document.querySelector("#root");
		var child = document.createElement("p");
		child.innerHTML = threadText;

		element.appendChild(child);
	}


	render() {
		const subredditData = this.props.subreddit.data.children;
		console.log(subredditData);
		const subredditPosts = subredditData.map(({ data }, index) => {
			return (
				<li key={index}>
					<a href="#" data-index={index} className={data.name} onClick={this.displayThread}>
						{data.title}
					</a>
				</li>
			)
		});
		return subredditPosts;
	}
}
export default Listing;
