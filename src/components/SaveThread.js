import React from "react";

class SaveThread extends React.Component{
	constructor(props){
		super(props);	

		this.state = {
			fontColor: ""
		}

		this.handleClick = this.handleClick.bind(this);
	}

	// saves activeThreadURL 
	handleClick = e => {
		e.preventDefault();
		//save thread via props
		this.props.SaveThread(this.props.singleThreadDetails);
	}

	render(){

		let bgColor = this.state.fontColor;

		return(
			<a href="#" onClick={this.handleClick} className="smpl_btn read_btn">Read Later</a>
		);
	}
} 

export default SaveThread;