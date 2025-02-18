import React, { Component } from "react";
import SideBar from './SideBar';
import SPFService from "./api/SPFService";
class Upload extends Component {

	constructor(props) {
		//console.log('COnstructor')
		super(props);
		this.state = {
			file: null,
			selectedOption: '',
			uploadErrorMsg: '',
			uploadSuccessMsg: '',
			uploadInProgress: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleOptionChange = this.handleOptionChange.bind(this);

	}
	handleChange(event) {
		this.setState({
			file: event.target.files[0]
		})
	}


	handleSubmit(event) {
		event.preventDefault();
		var formData = new FormData();
		var location = this.state.selectedOption;
		console.log(this.state.file);
		if (this.state.file === null) {
			this.setState({ uploadErrorMsg: 'Please select a file to proceed' });
		} else {
			if (this.state.file === undefined) {
				this.setState({ uploadErrorMsg: 'Please select a file to proceed' });
			} else {
				if (location === '') {
					this.setState({ uploadErrorMsg: 'Please select a location to proceed' });
				} else {
					this.setState({ uploadInProgress: 'File upload in progress. Please wait ........' });
					formData.append("file", this.state.file);
					SPFService.uploadFile(formData, location)
						.then(response => {
							console.log('response ' + response.data.uploadMsg + '  ' + response.data.uploadCode);
							if (response.data.uploadCode === '0') {
								this.setState({
									uploadErrorMsg: response.data.uploadMsg,
									uploadSuccessMsg: '',
									uploadInProgress: ''
								})
							} else {
								this.setState({
									uploadSuccessMsg: response.data.uploadMsg,
									uploadErrorMsg: '',
									uploadInProgress: ''
								})
							}
						}, () => {
							this.setState({ uploadErrorMsg: process.env.SPF_NETWORK_ERROR });
						});
				}
			}
		}
		/*{const url = 'http://localhost:3000/uploadFile';
		const formData = new FormData();
		formData.append('file', file);
		formData.append('fileName', file.name);
		const config = {
			headers: {
				'content-type': 'multipart/form-data',
			},
		};
		axios.post(url, formData, config).then((response) => {
			console.log(response.data);
		});}*/

	}


	handleOptionChange(changeEvent) {
		this.setState({
			selectedOption: changeEvent.target.value
		});
	}

	render() {

		return (
			<>
				<div className="row">
					<div className="col-lg-2 ">
						<SideBar></SideBar>

					</div>
					<div className="col-lg-10">
						<div className="card">
							<div className="card-body">
								<h5 className="card-title">Upload File to Mail box</h5>

								<form >
									<div className="row" style={{ padding: 10 }}>
										<div className="col-3">
											<label htmlFor="uploadfield">
												Select a file to upload:   </label></div><div className="col-3">
											<input type="file" id="uploadfield" onChange={this.handleChange}>

											</input></div></div>
									<div className="row" style={{ padding: 10 }}>
										<div className="col-3">
											<label>Select Location: </label>
										</div>
										<div className="col-3">
											<div className="radio">
												<label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
													<input type="radio" value="HIPAA837I"
														checked={this.state.selectedOption === 'HIPAA837I'}
														onChange={this.handleOptionChange} />
													HIPAA837I
												</label>
											</div>
											<div className="radio">
												<label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
													<input type="radio" value="HIPAA837P"
														checked={this.state.selectedOption === 'HIPAA837P'}
														onChange={this.handleOptionChange} />
													HIPAA837P
												</label>
											</div>
										</div></div>

								</form>
							</div>
						</div>
						{this.state.uploadInProgress && (
							<p className="SPFError"> {this.state.uploadInProgress} </p>
						)}
						{this.state.uploadErrorMsg && (
							<p className="SPFError"> {this.state.uploadErrorMsg} </p>
						)}
						{this.state.uploadSuccessMsg && (
							<p className="SPFSuccess"> {this.state.uploadSuccessMsg} </p>
						)}
						<div className="d-flex align-items-center justify-content-center" style={{padding:"10px"}}>
							<button type="submit" onClick={this.handleSubmit}>Upload File</button></div>
					</div></div></>
		);
	}
}

export default Upload