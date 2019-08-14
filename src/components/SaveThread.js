import React from "react";

class SaveThread extends React.Component{
	constructor(props){
		super(props);	

		this.state = {
			saveThread: "no"
		}

		this.handleClick = this.handleClick.bind(this);
	}

	// saves activeThreadURL 
	handleClick = e => {
		e.preventDefault();
		
		//save thread via props
		this.props.SaveThread(this.props.singleThreadDetails);

		this.setState({
			saveThread:"yes"
		})
	}

	render(){

		let btnClass = (this.state.saveThread == "yes") ? "smpl_btn simpl_btn_invert" : "smpl_btn read_btn";
		let btnText = (this.state.saveThread == "yes") ? "Saved" : "Read Later";

		return(
			<a href="#" onClick={this.handleClick} className={btnClass}>{btnText}</a>
		);
	}
} 

export default SaveThread;