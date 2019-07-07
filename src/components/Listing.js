import React from "react";
class Listing extends React.Component {

	constructor(props) {
	    super(props);
	}

	displayThread = (e) =>{

		const index = e.target.getAttribute('data-index');
		const subredditData = this.props.subreddit.data.children; 
		const threadText = subredditData[index].data.selftext_html;

		//for saving thread
		const threadUrl = subredditData[index].data.url;
		//console.log(threadUrl);
		
		//converts string html tags
		const convert = this.map_convert(threadText.toString());

		//set state of single thread view
		this.props.specThreadChange(convert);
		this.props.displayUI("threadView");
		this.props.activeThreadUrl(threadUrl);
	}


	map_convert = (escapedHTML) => {
	  return escapedHTML.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
	}

	render() {
		const subredditData = this.props.subreddit.data.children;
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
