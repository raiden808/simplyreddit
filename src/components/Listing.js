import React from "react";
class Listing extends React.Component {
	render() {
		const subredditData = this.props.subreddit.data.children;
		const subredditPosts = subredditData.map(({ data }, index) => {
			return <li key={index}>{data.title}</li>;
		});
		return <>{subredditPosts}</>;
	}
}
export default Listing;
