import React from "react";

class Search extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			inputText: "", // data from API goes here
		};
	}

	//handles input text change
	handleInputValue = e => {
		const inputText = e.target.value;
		this.setState({
			inputText: inputText
		});
	};

	handlePressEnter = e => {
		const inputText = e.target.value;
		if (e.key === "Enter") {
			this.props.searchSub(this.state.inputText)
		}
	};

	render() {
		return (
			<div>
				<p>Search a subreddit:</p>
				<input
					value={this.state.inputText}
					onChange={this.handleInputValue}
					onKeyDown={this.handlePressEnter}
				/>
			</div>
		);
	}

}

export default Search;