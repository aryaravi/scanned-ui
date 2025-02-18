import React, { Component } from "react";

class FooterComponent extends Component{
    render(){
        return(
		
           <footer id="footerSPF"
		   className="container-fluid mt-auto shadow bg-light text-center small">
 
		<div className="row border-top p-1">
			<div className="col-sm-12 col-md-6 justify-content-lg-start text-start">
				<span>© 2023 Commonwealth of Massachusetts</span>
			</div>
			<div className="col-sm-12 col-md-6 ">
				<a className="mr-3" title="About Virtual Gateway" style={{padding:10}}
					href="https://www.mass.gov/topics/virtual-gateway"
					target="_blank">Feedback &raquo;</a> <a className="mr-3"
					title="EoHHS Policies"
					href="https://www.mass.gov/lists/eohhs-site-policies" style={{padding:10}}
					target="_blank">Site Policies &raquo;</a> <a className="mr-3"
					title="Contact EOHHS"
					href="https://www.mass.gov/forms/executive-office-of-health-and-human-services-contact-form" style={{padding:10}}
					target="_blank">Contact Us &raquo;</a> <a className="mr-3"
					title="Contact EOHHS"
					href="https://www.mass.gov/forms/executive-office-of-health-and-human-services-contact-form" style={{padding:10}}
					target="_blank">Help Us &raquo;</a>
			</div>
		</div>
	</footer>

        )
    }
}

export default FooterComponent