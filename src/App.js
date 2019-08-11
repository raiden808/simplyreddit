import React from "react"
import Listing from "./components/Listing"
import Pagination from "./components/Pagination"
import Search from "./components/Search"
import {Helmet} from 'react-helmet'
import ChangeSubreddit from './components/ChangeSubreddit'
import Menu from './components/Menu'
import SavedThreads from './components/SavedThreads'
import SaveThread from './components/SaveThread'


const ReturnListing = props => {
  return(
    <a href="#" className="smpl_btn read_btn" onClick={props.returnListing} >Back</a>
  )
}

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			subreddit            : "", // data from API goes here
			singleThread         : "", // thread content goes here
			currentSub           : "TalesFromTechSupport",// active sub
			savedSub             : [], //bookmark subs
			menuStatus           : "home",
			savedThread          : [],
			singleThreadDetails  : {},
		};
	}

	//initially load data
	componentDidMount() {
		const defaultSubreddit = this.state.currentSub;
		this.fetchPosts(defaultSubreddit);

		let getSavedSub      = JSON.parse(localStorage.getItem('localSub'));
		let getSavedThread   = JSON.parse(localStorage.getItem('savedThread'));

		//assign saved thread and sub on page load
		if(localStorage.getItem('localSub') === null){
			this.setState({ 
				savedSub: ["TalesFromTechSupport","MaliciousCompliance","IDontWorkHereLady"]
			});
		}
		else{
			this.setState({ 
				savedSub: getSavedSub
			});
		}

		if(localStorage.getItem('localSub') !== null){
			this.setState({ 
				savedThread:getSavedThread
			})
		}
	}

	/*
	* Subreddit Rending Area
	*/
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
	

	//navigation and individual thread rendering
	nextPage = () => {
		//last subreddit in the listing
		const nextPageConstant = this.state.subreddit.data.after;
		return this.fetchPosts(this.state.currentSub, `&after=${nextPageConstant}`);
	};


	/*
	* Thread Rendering area
	*/
	specThreadChange = thread =>{
		this.setState({ singleThread:thread})
	}

	returnListing = () =>{
		this.setState({ singleThread:""})
		//return home
		this.setState({menuStatus:"home"});
	}

	/*
	* Sub Manipulation Area
	*/ 
	searchSub = (subreddit) =>{
		this.setState({ currentSub:subreddit})
		this.fetchPosts(subreddit);
		//return home
	  	this.setState({menuStatus:"home"});
	}

	addSub = subreddit => {
		this.setState({ savedSub:[...this.state.savedSub,subreddit] })

		let newSub = [...this.state.savedSub,subreddit]
		//update local storage
		localStorage.setItem("localSub",JSON.stringify(newSub))
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

	/*
	* Save Thread Area
	*/ 
	// save current active thread id,title and url
	// save to local storage
	SaveThread = threadObject =>{

		let getSavedThread   = JSON.parse(localStorage.getItem('savedThread'));

		// save thread object using spread
		getSavedThread = [...getSavedThread,threadObject];

		//updates local storage
	 	localStorage.setItem("savedThread",JSON.stringify(getSavedThread));

		this.setState({ 
			savedThread:getSavedThread
		})
	}

	
	// store active thread into state
	CurrentActiveThreadObject = data =>{

		let threadObject = new Object();
		
		threadObject.id = data[0];
		threadObject.title = data[1];
		threadObject.url = data[2];

		this.setState({ singleThreadDetails:{...this.state.singleThreadDetails,threadObject }})

	}

	//remove saved thread
	removeSaveThread = index =>{

		// retrieves local storage
		let getSavedThread   = JSON.parse(localStorage.getItem('savedThread'));

		// retrieves save thread state
		const SaveThread = this.state.savedThread;

		// delete thread index on click
		const valueToRemove = index;
		const filteredItems = SaveThread.filter(function(item,key) {
			// remove array index via key
			console.log(key)
		  return key !== valueToRemove
		})

		//updates local storage
	 	localStorage.setItem("savedThread",JSON.stringify(filteredItems));

	 	this.setState({ 
			savedThread:filteredItems
		})

	}

	/*
	* Menu Page Rendering Area
	*/ 
	displayUI = (status) =>{
		this.setState({
			menuStatus:status,
		});
	}

	render() {
		// when data from Reddit successfully loads
		if (this.state.subreddit) {

			const singleThreadStatus = this.state.singleThread === '';
			const menuStatus = this.state.menuStatus;

			let renderLayout;


			//TODO: 
			// Display slug of thread and add .json on url end
			// Create new component to save sub
			// display url on console.log first
			switch (menuStatus) {
				case "home":
					renderLayout = 
						<div>
			        		<div className='activeSub'>
			        			<h3>{"r/"+this.state.currentSub}</h3>
			        		</div>
			        		<ul className='listings'>
								<Listing 
									subreddit={this.state.subreddit} 
									specThreadChange={this.specThreadChange} 
									displayUI={this.displayUI}
									CurrentActiveThreadObject={this.CurrentActiveThreadObject}
								/>
							</ul>
							<Pagination 
								nextPage={this.nextPage} 
							/>
						</div>;
					break;
				case "search":
					renderLayout = 
						<Search 
				        	searchSub={this.searchSub} 
				        	addSub={this.addSub} 
				        />;
					break;
				case "subreddits":
					renderLayout = 
						<ChangeSubreddit  
				        	searchSub={this.searchSub} 
				        	displaySubs={this.state.savedSub}
				        	removeSub={this.removeSub}
				        />;
					break;
				case "threadView":
					renderLayout = 
						<div className="single_thread">
							<div className='activeSub'>
					        	<h3>{this.state.singleThreadDetails.threadObject.title}</h3>
					        </div>
							<div 
								dangerouslySetInnerHTML={{__html: this.state.singleThread}}>
							</div>
							{/*Set a current thread url here. add it like a state.*/}
							<ReturnListing  
								returnListing={this.returnListing} 
							/>
							<SaveThread
								menuStatus={menuStatus}
								SaveThread={this.SaveThread}
								singleThreadDetails={this.state.singleThreadDetails}
							/>
						</div>;
					break;
				case "threads":
					renderLayout = 
						<SavedThreads  
							savedThread={this.state.savedThread}
							removeSaveThread={this.removeSaveThread}
						/>
					break;
			}
			return(
				<div className="container">
					<Helmet>
			        	<title>SimplyReddit</title>
			      	</Helmet>
			      	<Menu displayUI={this.displayUI} />
			      	{renderLayout}
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
