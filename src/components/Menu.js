import React from "react"

class Menu extends React.Component{
	render(){
		return(
			<div className="menuContainer">
			<div className="menu">
				<ul>
					<a href="#"><li>1. Home</li></a>
					<a href="#"><li>2. About</li></a>
					<a href="#"><li>3. Services</li></a>
					<a href="#"><li>4. Work</li></a>
					<a href="#"><li>5. Contact</li></a>
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