import React from "react";

class SaveThread extends React.Component{
	constructor(props){
		super(props);	
		this.handleClick = this.handleClick.bind(this);
	}

	// saves activeThreadURL 
	handleClick = e => {
		e.preventDefault();
		//save thread via props
		this.props.SaveThread(this.props.singleThreadDetails);
	}

	render(){
		return(
			<a href="#" onClick={this.handleClick} className="smpl_btn read_btn">Save</a>
		);
	}
} 

export default SaveThread;