
import React, { Component } from "react";
import SideBar from './SideBar';

class SPFWelcome extends Component {
	render() {
		return (
			<><div className="row">
				<div className="col-lg-2 ">
					<SideBar></SideBar>
				</div>
				<div className="col-lg-10" style={{}} > Welcome to SPF</div>
			</div>
			</>
		)
	}
}

export default SPFWelcome