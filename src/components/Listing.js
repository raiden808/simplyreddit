import React from "react";
class Listing extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {showThread:"no"};
	}

	displayThread = (e) =>{
		//specific index of array.
		const index = e.target.getAttribute('data-index');
		const subredditData = this.props.subreddit.data.children; 
		const threadText = subredditData[index].data.selftext_html;
		const threadContainer = document.querySelector(".single_thread");

		//this.setState({ showThread: "yes"  });

		console.log(this.state.showThread);


		const convert = this.map_convert(threadText);
		//use html code inside selftext
		threadContainer.innerHTML = decodeURIComponent(convert.toString());

    	this.backButton();
	}

	map_convert = (escapedHTML) => {
	  return escapedHTML.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
	}

	backButton = () =>{
		const threadContainer = document.querySelector(".single_thread");
		const returnButton = document.createElement('a');

    	returnButton.innerText = 'back';
    	returnButton.setAttribute('href','#');
    	returnButton.className = 'returnThread';
    	returnButton.onclick = this.returnListing(returnButton);
    	//start
    	threadContainer.appendChild(returnButton)
    	//end
    	threadContainer.insertBefore(returnButton, threadContainer.firstChild)
	}

	returnListing = (elem) =>{
		//elem.innerHTML = "";

		console.log(elem.className)
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
