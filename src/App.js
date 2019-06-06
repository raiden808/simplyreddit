import React from 'react';
import Listing from './components/Listing';

class App extends React.Component {
    state = {
        subreddit: ''
    }
    componentDidMount() {
        // this is the default sub-reddit provided
        this.fetchPosts('nosleep');
    }
    fetchPosts = async (subreddit) => {
        // fetch posts for the provided subreddit, then save them to the state
        const redditAPI = await fetch(`http://www.reddit.com/r/${subreddit}/hot.json?limit=10&count=5`);
        const returnedData = await redditAPI.json();
        return this.setState({ subreddit: returnedData });
    }
    render() {
        // when data from Reddit successfully loads
        if (this.state.subreddit) {
            return (
                <ul className='container'>
                	<Listing subreddit={this.state.subreddit} />
        		</ul>
            )
        }
        // if data hasn't loaded yet, don't put anything on the page
        return null;
    }
}
export default App;