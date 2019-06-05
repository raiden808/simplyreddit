import React,{Component} from 'react'

class Pagination extends Component{

	nextPage = () =>{
		alert("test");
	}

	render(){
		return(
			<div>
				<a href='#' onClick={this.nextPage}>
					Load Next
			    </a>
			</div>
		)
	}
}

export default Pagination