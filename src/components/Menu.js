import React from "react"

class Menu extends React.Component{
	//https://codepen.io/riogrande/full/emdjLR

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


	render(){
		return(
			<div className="menuContainer">
			<div className="menu toggle-slider closed">
				<ul>
					<a href="#"><li><i className="fa fa-search"></i></li></a>
					<a href="#"><li>Home</li></a>
					<a href="#"><li>Your Subreddits</li></a>
					<a href="#"><li>Saved Threads</li></a>
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