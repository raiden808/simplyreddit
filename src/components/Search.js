import React from "react";
class Search extends React.Component {
	state = {
		inputText: ""
	};
	handleInputValue = e => {
		const inputText = e.target.value;
		this.setState({
			inputText: inputText
		});
	};
	handlePressEnter = e => {
		const inputText = e.target.value;
		if (e.key === "Enter") {
			this.props.search(inputText);
			this.setState({ inputText: "" });
		}
	};
	render() {
		return (
			<>
				<p>Search a subreddit:</p>
				<input
					value={this.state.inputText}
					onChange={this.handleInputValue}
					onKeyDown={this.handlePressEnter}
				/>
			</>
		);
	}
}
export default Search;
