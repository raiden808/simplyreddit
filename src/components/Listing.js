import React from "react";
class Listing extends React.Component {

	displayThread = (e) =>{
		//specific index of array.
		const index = e.target.getAttribute('data-index');
		const subredditData = this.props.subreddit.data.children; 
		const threadText = subredditData[index].data.selftext_html;

		var element = document.querySelector(".container");

		var convert = this.map_convert(threadText);

		//use html code inside selftext
		element.innerHTML = decodeURIComponent(convert.toString());


	}

	 map_convert = (escapedHTML) => {
	  return escapedHTML.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
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
