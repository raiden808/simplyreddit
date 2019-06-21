import React from "react"
import Listing from "./components/Listing"
import Pagination from "./components/Pagination"
import Search from "./components/Search"
import {Helmet} from 'react-helmet'
import ChangeSubreddit from './components/ChangeSubreddit'
import Menu from './components/Menu'


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
			currentSub   :   "TalesFromTechSupport",// active sub
			savedSub     :   [] //bookmark subs
		};
	}

	//initially load data
	componentDidMount() {
		const defaultSubreddit = this.state.currentSub;
		this.fetchPosts(defaultSubreddit);

		let retrievedObject = JSON.parse(localStorage.getItem('localSub'));

		//if no local storage
		if(localStorage.getItem('localSub') === null){
			this.setState({ 
				savedSub: ["TalesFromTechSupport","MaliciousCompliance","IDontWorkHereLady"]
			});
		}
		else{
			this.setState({ 
				savedSub: retrievedObject
			});
		}
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

	//render textContent on click of subreddit
	specThreadChange = thread =>{
		this.setState({ singleThread:thread})
	}

	handleFetchError = err => {
		alert(
			"An error ocurred. That subreddit probably doesn't exist. Reverting to r/TalesFromTechSupport"
		);
		this.searchSub("TalesFromTechSupport"); // after error, we go back to default sub

		//remove not working sub
		let savedSub  = this.state.savedSub
		this.setState({
		      savedSub: this.state.savedSub.map((sub, index) => {
		        if (savedSub.length-1 !== index) {
		            return sub // not the sub we are targeting, don't change it
		        }
		    })
	  	})

		//force render of changes
	  	this.setState(this.state);
	};

	//re render listing
	returnListing = () =>{
		this.setState({ singleThread:""})
	}

	/*
	* Subreddit Manipulations
	*/
	searchSub = (subreddit) =>{
		this.setState({ currentSub:subreddit})
		this.fetchPosts(subreddit);
	}

	//removes sub on long press
	removeSub = index => {
		const savedSub  = this.state.savedSub

	  	this.setState({
		    savedSub: savedSub.filter((i) => {
		      	return i !== index
		    }),
	  	})

	  	//updates local storage
	  	localStorage.setItem("localSub",JSON.stringify(this.state.savedSub))
	}

	addSub = subreddit => {
		this.setState({ savedSub:[...this.state.savedSub,subreddit] })

		let newSub = [...this.state.savedSub,subreddit]
		//update local storage
		localStorage.setItem("localSub",JSON.stringify(newSub))
	}
	

	render() {
		// when data from Reddit successfully loads
		if (this.state.subreddit) {


			const singleThreadStatus = this.state.singleThread === '';

			return(
				<div className="container">
					<Helmet>
			        	<title>SimplyReddit</title>
			      	</Helmet>
			      	<Menu />

			      	{ singleThreadStatus
				        ? 	
				        	<div>
				        		{/*Active Sub*/}
				        		<div className='activeSub'>
				        			<h3>{"r/"+this.state.currentSub}</h3>
				        		</div>
				        		<ul className='listings'>
									<Listing 
										subreddit={this.state.subreddit} 
										specThreadChange={this.specThreadChange} 
										singleThread={this.state.singleThread} 
									/>
								</ul>
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
