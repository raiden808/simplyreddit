import React from "react";

class Search extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			inputText: "", //allows textbox state change
		};

		this.handlePressEnter = this.handlePressEnter.bind(this)
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
			this.props.addSub(this.state.inputText)

			//clears text input
			this.setState({
		      inputText: ''
		    });
		}
	};

	render() {
		return (
			<div class="header">
				<span>A text-based subreddit reader: </span>
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