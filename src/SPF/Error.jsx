
import React, { Component } from "react";
import {Link} from 'react-router-dom';

class SPFError extends Component {
	render() {
		return (
			<><div className="row"><div className="row">
				<div className="col-lg-2 ">
					
				</div>
				
				<div className="col-lg-10" style={{}} > Welcome to SPF. Please click on continue button to proceed</div>
				</div><div className="row">
				<div className="col-lg-2 ">
					
					</div>
					<div className="col-lg-10" style={{}} > 
				<Link to='/download'>
				<button className="btn  btn-info" type="button">Continue</button>
									</Link></div>
				</div>
			</div>
			</>
		)
	}
}

export default SPFError