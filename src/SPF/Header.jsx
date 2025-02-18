import logo from "./img/vglogo.gif";
import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {SPF_WelcomeMessage} from './SPF-Constant';
import Banner from './Banner'
import vglogo from '../assets/images/welcomeSPF.gif'
import SPFService from "./api/SPFService";


class HeaderComponent extends Component {
	constructor(props) {
		super(props);
		this.populateWelcomeMessage = this.populateWelcomeMessage.bind(this);
		this.state = {
			welcomeMessage: ''
		}
	}
	componentDidMount() {
		this.populateWelcomeMessage();
	}
	render() {
		return (

			<>
			<div className="header_section">
			<Banner />
			<header className="ma__header_slim__header container_padding rm_decorater" id="header">
                    <div style={{ padding: '0px 0px', height: '50px' }} className="ma__header_slim__header-container ma__container">
                        <a href="/" title="Home" style={{ zIndex: 1, marginTop: '30px' }}
                            rel="noopener noreferrer"  >
                            <img
                                className="ma__image"
                                src={vglogo}
                                alt="Massachusetts state seal"
                                width="75"
                                height="75"
                                padding="2"
                            />

                        </a>
                        <div className='header_title' >File Transfer Services</div>
                    </div>
                </header>
				<div className="d-flex flex-column h-100">
        <div className='main_container applicationPublic navbar-light bg-light' >
          <div className='wrapper' style={{ paddingTop: 20 }}>
            <div className='page_container'>
              <div className='bs_login_info'>
                <div >
                  <div>
                    <span className="strong mr-2" > {this.formatDate(new Date())}</span>
                    {/* <span className="strong mr-2" >welcome Message rama</span>*/}

                  </div>
                  <div>
                    <span className="small mr-auto" > {this.state.welcomeMessage}</span>
                    {/* <span className="small mr-auto" >last login at</span>*/}
                  </div>
                </div></div>
				</div></div></div></div></div>

				
			</>

		)
	}

	populateWelcomeMessage(){
		if (window.sessionStorage.getItem(SPF_WelcomeMessage)=== null){			
			SPFService.getWelcomeMessage()
			.then(res => {
				console.log('Hey::  '+res.data);
				this.setState({
					welcomeMessage : res.data
				})
				console.log('No Data found. fetched from server'+res.data);
				window.sessionStorage.setItem(SPF_WelcomeMessage,res.data);
			},() =>{
				console.log(' Network error!');
				this.setState({
					welcomeMessage : ''
				})
			})
		}else{
			console.log(' Data found. Fetched from session');
			this.setState({
				welcomeMessage : window.sessionStorage.getItem(SPF_WelcomeMessage)
			})
		}
	}

	
	formatDate(newDate) {
		const months = {
		  0: 'January',
		  1: 'February',
		  2: 'March',
		  3: 'April',
		  4: 'May',
		  5: 'June',
		  6: 'July',
		  7: 'August',
		  8: 'September',
		  9: 'October',
		  10: 'November',
		  11: 'December',
		}
		const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
		const d = newDate
		const year = d.getFullYear()
		const date = d.getDate()
		//const monthIndex = d.getMonth()
		const monthName = months[d.getMonth()]
		//const dayName = days[d.getDay()] // Thu
		const formatted = `${monthName} ${date}  ${year}`
		return formatted.toString()
	  }
}

export default HeaderComponent