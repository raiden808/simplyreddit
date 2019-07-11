import React from "react";
class Listing extends React.Component {

	constructor(props) {
	    super(props);
	}

	displayThread = (e) =>{

		const index = e.target.getAttribute('data-index');
		const subredditData = this.props.subreddit.data.children; 

		const threadText = subredditData[index].data.selftext_html;
		const convert = this.map_convert(threadText.toString());
		//set state of single thread view
		this.props.specThreadChange(convert);
		


		//for saving thread
		const threadTitle = subredditData[index].data.title;
		const threadUrl = subredditData[index].data.url;
		// multi dimensional array title and URL
		this.props.activeThreadUrl(threadUrl);

		console.log(subredditData[index].data);

		// update the menu status
		this.props.displayUI("threadView");
	}

	activeThreadObject = (thread) =>{


		return 
	}

	activeThreadText = (thread) =>{
		
	}

	//converts string html tags into readable text
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
