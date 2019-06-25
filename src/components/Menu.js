import React from "react"

class Menu extends React.Component{
	//https://codepen.io/riogrande/full/emdjLR
	constructor() {
		super();
		this.handleClick = this.handleClick.bind(this);
	}

	handleToggle = () =>{
		document.querySelector('.toggle-slider').classList.toggle('closed');
		//arrow transition
		if ( document.querySelector(".menu-toggle a .fa").classList.contains('fa-angle-double-down') ){
			document.querySelector(".menu-toggle a .fa").classList.remove('fa-angle-double-down');
			document.querySelector(".menu-toggle a .fa").classList.add('fa-angle-double-up');
		}else{
			document.querySelector(".menu-toggle a .fa").classList.remove('fa-angle-double-up');
			document.querySelector(".menu-toggle a .fa").classList.add('fa-angle-double-down');
		}
	}

	handleClick = e => {
		//retrieve parent class !child
		let target = e.currentTarget.className;

		this.props.displayUI(target);
	}


	render(){
		return(
			<div className="menuContainer">
			<div className="menu toggle-slider closed">
				<ul>
					<a href="#" onClick={this.handleClick} className="search">
						<li>
							<i className="fa fa-search"></i>
						</li>
					</a>
					<a href="#" onClick={this.handleClick} className="home">
						<li>Home</li>
					</a>
					<a href="#" onClick={this.handleClick} className="subreddits">
						<li>Your Subreddits</li>
					</a>
					<a href="#" onClick={this.handleClick} className="threads">
						<li>Saved Threads</li>
					</a>
				</ul>
			</div>
			<div className="menu-toggle">
				<a href="#" onClick={()=>{this.handleToggle()}}><i className="fa fa-angle-double-down"></i></a>
			</div>
			</div>
		)
	}
}

export default Menu;