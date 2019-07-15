import React from "react";
class Listing extends React.Component {

	constructor(props) {
	    super(props);

	    this.displayThread = this.displayThread.bind(this);
	}

	displayThread = (e) =>{

		const index = e.target.getAttribute('data-index');
		const subredditData = this.props.subreddit.data.children; 

		//convert and render text of subreddit
		const threadText = subredditData[index].data.selftext_html;
		const convert = this.map_convert(threadText.toString());
		this.props.specThreadChange(convert);
		


		// //Returns title and URL
		// const threadId    = subredditData[index].data.id;
		// const threadTitle = subredditData[index].data.title;
		// const threadUrl   = subredditData[index].data.url;

		// let threadDetails = [];

		// let threadObject = new Object();
		// threadObject.title = threadTitle;
		// threadObject.url   = threadUrl;

		// threadDetails[threadId] = threadObject;


		// multi dimensional array title and URL
		this.props.CurrentActiveThreadObject(this.activeThreadObject(subredditData[index].data));

		//console.log(subredditData[index].data);

		// update the menu status
		this.props.displayUI("threadView");
	}

	activeThreadText = (thread) =>{
		
	}

	activeThreadObject = (threadData) =>{
		//Returns title and URL
		const threadId    = threadData.id;
		const threadTitle = threadData.title;
		const threadUrl   = threadData.url;

		let threadDetails = [];

		// set title and url for 2d array
		// let threadObject = new Object();
		// threadObject.title = threadTitle;
		// threadObject.url   = threadUrl;

		// threadDetails[threadId] = threadObject;

		// let threadDetails = [];

		threadDetails.push(threadId);
		threadDetails.push(threadTitle);
		threadDetails.push(threadUrl);

		return threadDetails;
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
