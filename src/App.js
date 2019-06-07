import React from "react";
import Search from "./components/Search.js";
import Listing from "./components/Listing";
import Pagination from "./components/Pagination";

class App extends React.Component {
	state = {
		currentSub: "popular", // this is the subreddit the user is currently on, it defaults to r/popular
		subreddit: "" // data from API goes here
	};
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
			if (!redditAPIResponse.ok)
				return this.handleFetchError(redditAPIResponse.statusText);
			const returnedData = await redditAPIResponse.json();
			return this.setState({ subreddit: returnedData });
		} catch (error) {
			return this.handleFetchError(error);
		}
	};
	handleFetchError = err => {
		alert(
			"An error ocurred. That subreddit probably doesn't exist. Reverting to r/popular"
		);
		this.searchSub("popular"); // after error, we go back to default sub
	};
	nextPage = () => {
		// this constant is the post after which the new posts are fetched,
		// the return function includes a parameter with the URI component with the next page constant
		const currentSub = this.state.currentSub;
		const nextPageConstant = this.state.subreddit.data.after;
		return this.fetchPosts(currentSub, `&after=${nextPageConstant}`);
	};
	searchSub = subreddit => {
		this.setState({
			currentSub: subreddit
		});
		this.fetchPosts(subreddit);
	};
	render() {
		// when data from Reddit successfully loads
		if (this.state.subreddit.data) {
			return (
				<ul className="container">
					<Search search={subreddit => this.searchSub(subreddit)} />
					<Listing subreddit={this.state.subreddit} />
					<Pagination nextPage={this.nextPage} />
				</ul>
			);
		}
		// if data hasn't loaded yet, don't put anything on the page
		return null;
	}
}
export default App;
