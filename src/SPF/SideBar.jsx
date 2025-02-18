import React, { Component } from "react";

class SideBar extends Component {	
    constructor(props) {
        super(props);
    }

    render() {
        const logoutSPF = () => {
            console.log("logout clicked");
            //if (confirm("Are you sure you want to logout from SPF?") == true) {
                console.log('value removed! Value from session :: '+window.sessionStorage.getItem('WelcomeMessage'));
                sessionStorage.clear('WelcomeMessage');
                sessionStorage.clear('SPF_Authenticate_UserId');
                sessionStorage.clear('SPF_Authenticate_OrgId');
                window.open("about:blank", "_self");
                window.close();
           /* } else {
                console.log('cancelled action!')
            }*/
          }
        return (

            <>
                <div className="sidenav">

                    <div className="sidenavHeading">SPF: File Transfer Service</div>
                    <div className="spfLinkHeading">List of Files :</div>
                    <ul className="list-group">

                        <li className="list-group-item"><a href="/SPF-Web/download" >Downloadable file</a></li>
                        <li className="list-group-item"><a href="/SPF-Web/uploaded" >Uploaded file</a></li></ul>
                    <div className="spfLinkHeading">Action :</div>
                    <ul className="list-group">
                        <li className="list-group-item"><a href="/SPF-Web/upload" >Upload a file</a></li>
                        <li className="list-group-item">
                            <a href="#" onClick={logoutSPF}>logout</a>
                        </li>
                    </ul>
                </div>
            </>
        )
    }
}
export default SideBar