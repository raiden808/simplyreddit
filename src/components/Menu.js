import React from "react"

class Menu extends React.Component{
	//https://codepen.io/riogrande/full/emdjLR
	render(){
		return(
			<div className="menuContainer">
			<div className="menu">
				<ul>
					<a href="#"><li><i className="fa fa-search"></i></li></a>
					<a href="#"><li>Home</li></a>
					<a href="#"><li>Your Subreddits</li></a>
					<a href="#"><li>Saved Threads</li></a>
				</ul>
			</div>
			<div className="menu-toggle">
				<a href="#"><i className="fa fa-angle-double-down"></i></a>
			</div>
			</div>
		)
	}
}

export default Menu;