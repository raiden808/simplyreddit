import React from "react"
import Listing from "./components/Listing"
import Pagination from "./components/Pagination"
import Search from "./components/Search"
import {Helmet} from 'react-helmet'
import AddSubreddit from './components/AddSubreddit'


const ReturnListing = props => {
  return(
    <a href="#" onClick={props.returnListing} >Back</a>
  )
}

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			subreddit    :   "",    // data from API goes here
			singleThread :   "",    // thread content goes here
			currentSub   :   "tifu",// active sub
			savedSub     :   ["talesfromtechsupport","tifu","IDontWorkHereLady"]
		};
	}

	//initially load data
	componentDidMount() {
		const defaultSubreddit = this.state.currentSub;
		this.fetchPosts(defaultSubreddit);
	}
	fetchPosts = async (subreddit, nextPage = "") => {
		try {
			// fetch posts for the provided subreddit, then save them to the state
			const redditAPIResponse = await fetch(
				`https://www.reddit.com/r/${subreddit}/hot.json?limit=10&count=5${nextPage}`
			);
			if (!redditAPIResponse.ok){
				return this.handleFetchError(redditAPIResponse.statusText);
			}
			const returnedData = await redditAPIResponse.json();
			return this.setState({ subreddit: returnedData });
		} 

		catch (error) {
			return this.handleFetchError(error);
		}

	};
	nextPage = () => {
		// this constant is the post after which the new posts are fetched,
		// the return function includes a parameter with the URI component with the next page constant
		const nextPageConstant = this.state.subreddit.data.after;
		return this.fetchPosts(this.state.currentSub, `&after=${nextPageConstant}`);
	};

	specThreadChange = thread =>{
		this.setState({ singleThread:thread})
	}

	handleFetchError = err => {
		alert(
			"An error ocurred. That subreddit probably doesn't exist. Reverting to r/popular"
		);
		this.searchSub("tifu"); // after error, we go back to default sub
	};

	returnListing = () =>{
		this.setState({ singleThread:""})
	}

	searchSub = (subreddit) =>{
		this.setState({ currentSub:subreddit})
		this.fetchPosts(subreddit);
	}

	displaySubs = (subreddits) => {

	}


	render() {
		// when data from Reddit successfully loads
		if (this.state.subreddit) {


			const singleThreadStatus = this.state.singleThread === '';

			console.log(singleThreadStatus);

			return(
				<div className="container">
					<Helmet>
			        	<title>SimplyReddit</title>
			      	</Helmet>

			      	{ singleThreadStatus
				        ? 	
				        	<div>
				        		<Search 
				        			searchSub={this.searchSub} 
				        		/>
				        		<AddSubreddit  />
								<Listing 
									subreddit={this.state.subreddit} 
									specThreadChange={this.specThreadChange} 
									singleThread={this.state.singleThread} 
								/>
								<Pagination 
									nextPage={this.nextPage} 
								/>
							</div>
				        : 	
				        	<div className="single_thread">
								<ReturnListing  
									returnListing={this.returnListing} 
								/>
								<div 
									dangerouslySetInnerHTML={{__html: this.state.singleThread}}>
								</div>
								<ReturnListing  
									returnListing={this.returnListing} 
								/>
							</div>
				    }
				</div>
			)

		}
		// if data hasn't loaded yet, don't put anything on the page
		else{
			return null;
		}
		
	}
}
export default App;
