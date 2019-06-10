import React from "react";
import Listing from "./components/Listing";
import Pagination from "./components/Pagination";


const ReturnListing = props => {
  return(
    <a href="#" onClick={props.returnListing} >Back</a>
  )
}

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			subreddit: "", // data from API goes here
			singleThread: ""
		};
	}

	componentDidMount() {
		// this is the default sub-reddit provided
		this.fetchPosts("nosleep");
	}
	fetchPosts = async (subreddit, nextPage = "") => {
		// fetch posts for the provided subreddit, then save them to the state
		const redditAPI = await fetch(
			`https://www.reddit.com/r/${subreddit}/hot.json?limit=10&count=5${nextPage}`
		);
		const returnedData = await redditAPI.json();
		return this.setState({ subreddit: returnedData });
	};
	nextPage = () => {
		// this constant is the post after which the new posts are fetched,
		// the return function includes a parameter with the URI component with the next page constant
		const nextPageConstant = this.state.subreddit.data.after;
		return this.fetchPosts("nosleep", `&after=${nextPageConstant}`);
	};

	specThreadChange = thread =>{
		this.setState({ singleThread:thread})
	}

	returnListing = () =>{
		this.setState({ singleThread:""})
	}


	render() {
		// when data from Reddit successfully loads
		if (this.state.subreddit) {

			if(this.state.singleThread != ""){
				return(
					<div className="container">
						<div className="single_thread">
							<ReturnListing  returnListing={this.returnListing} />
								<div dangerouslySetInnerHTML={{__html: this.state.singleThread}}></div>
							<ReturnListing  returnListing={this.returnListing} />
						</div>
					</div>
				)
			}

			else{
				return(
					<div className="container">
						<Listing subreddit={this.state.subreddit} specThreadChange={this.specThreadChange} singleThread={this.state.singleThread} />
						<Pagination nextPage={this.nextPage} />
					</div>
				)
			}
		}
		// if data hasn't loaded yet, don't put anything on the page
		return null;
	}
}
export default App;
