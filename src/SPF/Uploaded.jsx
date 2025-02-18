import React, { Component } from "react";
import SPFService from './api/SPFService';
import ReactPaginate from 'react-paginate';
import SideBar from './SideBar';
import up from './img/up.jpg';
import down from './img/down.jpg';
import del from './img/del.jpg';


class Uploaded extends Component {

	constructor(props) {
		//console.log('COnstructor')
		super(props);
		this.state = {
			files: [],
			fileSearch: '',
			offset: 0,
			data: [],
			perPage: process.env.REACT_APP_SPF_PAGE_SIZE,
			currentPage: 0,
			downloadErrorMsg: ''
		}
		this.sortFileAsc = this.sortFileAsc.bind(this);
		this.sortFileDesc = this.sortFileDesc.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.clearFileList = this.clearFileList.bind(this);
		this.handlePageClick = this.handlePageClick.bind(this);

	}
	componentDidMount() {
		console.log('componentDidMount')
		this.receivedData();
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
								<h5 className="card-title">Uploaded Files</h5>
								{this.state.downloadErrorMsg && (
									<p className="SPFError"> {this.state.downloadErrorMsg} </p>
								)}
								<form id="file-search-form">
									<div className="row">
										<label>
											Name:
											<input className="SPFInput" type="text" value={this.state.value} onChange={this.handleChange} />
										</label></div>
									<div className="Row" style={{ padding: 20 }}>
										<button type="submit" onClick={this.handleSubmit} >Search</button>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
										<button type="submit" onClick={this.clearFileList} >Clear</button>
									</div>
								</form>
							</div>
						</div>
						<div className="container">

							{this.state.postData}
							{this.state.postData && (
								<div style={{ padding: 20 }}>
									<ReactPaginate
										previousLabel={"prev"}
										nextLabel={"next"}
										breakLabel={"..."}
										breakClassName={"break-me"}
										pageCount={this.state.pageCount}
										marginPagesDisplayed={2}
										pageRangeDisplayed={8}
										onPageChange={this.handlePageClick}
										containerClassName={"pagination"}
										subContainerClassName={"pages pagination"}
										activeClassName={"active"}
									/></div>)}
						</div>

					</div></div>

			</>



		)
	}


	receivedData() {
		console.log('receivedData ');
		if (this.state.fileSearch === "") {
			this.loadAllFile();
		} else {
			this.searchFile();
		}
	}
	handlePageClick = (e) => {
		console.log('handlePageClick ' + e.selected);
		const selectedPage = e.selected;
		const offset = selectedPage * this.state.perPage;
		this.setState({
			currentPage: selectedPage,
			offset: offset
		}, () => {
			this.receivedData()
		});

	};

	loadAllFile() {
		SPFService.fetchAllUploaded()
			.then(res => {
				this.setState({ downloadErrorMsg: '' });
				this.setupFiles(res);
			}, () => {
				this.setState({ downloadErrorMsg: process.env.REACT_APP_SPF_NETWORK_ERROR });
			});
	}

	setupFiles(res) {
		const data = res.data;
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		const postData = <React.Fragment>
			<div className="row" style={{ padding: 20 }}> Found {data.length} records</div>
			<table className="table">
				<thead className="thead-dark">
					<tr>
						<th ></th>
						<th >File Name</th>
						<th >File Size</th>
						<th >File Id</th>
						<th >File From</th>
						<th >User Id</th>
						<th>Upload Date
							<a href="#" onClick={this.sortFileAsc}>
								<img src={up} alt="Sort UP" className="mr-2" width="15" height="15"></img></a>
							<a href="#" onClick={this.sortFileDesc}>
								<img src={down} alt="Sort Down" className="mr-2" width="15" height="15"></img>
							</a>

						</th>
					</tr>
				</thead>
				<tbody>
					{slice.map(x =>
						<tr key={x.fileId}>
							<td>
								<a href="#" onClick={() => this.deleteFile(x.fileId, x.fileName)}>
								{this.getDeleteImage('Delete file '+x.fileName)}</a>
							</td>
							<td >
								<a href="#" onClick={() => this.downloadFile(x.fileId, x.fileName)}>{x.fileName}</a>
							</td>
							<td >{Math.round(x.fileSize)}</td>
							<td >{Math.round(x.fileId)}</td>
							<td >{x.fileFrom}</td>
							<td >{x.userName}</td>
							<td >{x.uploadDate}</td>
							
						</tr>
					)}
				</tbody>



			</table>
		</React.Fragment>

		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),

			postData
		})
	}

	downloadFile = (fileId, fileName) => {
		fetch(process.env.REACT_APP_SPF_API_URL + '/download/'+sessionStorage.getItem('SPF_Authenticate_UserId')+"/"+fileName+"/" +fileName+"/" + Math.round(fileId))
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = fileName;
					a.click();
				});
				//window.location.href = response.url;
			});
	}

	deleteFile = (fileId, fileName) => {
		if (window.confirm('Are you sure you want to delete this file :' + fileName)) {
			console.log('delete '+fileId);
			SPFService.deleteFile(Math.round(fileId))
				.then(x => {
					if (x.data === 'OK') {
						console.log('delete successful : Now reloading the page');
						this.receivedData();
					}
				})
		} else {
			console.log('dont delete');
		}
	}

	sortFileAsc() {
		console.log('inside sortFileAsc : ' + this.state.fileSearch);
		if (this.state.fileSearch === "") {
			SPFService.fetchAllUploadedASC()
				.then(res => {
					this.setupFiles(res);
				});
		} else {
			SPFService.searchUploadedASC(this.state.fileSearch)
				.then(res => {
					this.setupFiles(res);
				});
		}
	}

	sortFileDesc() {
		if (this.state.fileSearch === "") {
			SPFService.fetchAllUploadedDESC()
				.then(res => {
					this.setupFiles(res);
				});
		} else {
			SPFService.searchUploadedDESC(this.state.fileSearch)
				.then(res => {
					this.setupFiles(res);
				});
		}
	}

	handleChange(event) {
		this.setState({ fileSearch: event.target.value });
	}

	clearFileList() {
		document.getElementById("file-search-form").reset();
		this.setState({ fileSearch: '' });
		SPFService.fetchAllUploaded()
			.then(res => {
				this.setupFiles(res);
			});


	}

	handleSubmit(event) {
		event.preventDefault();
		this.searchFile();
	}

	searchFile() {
		SPFService.searchUploaded(this.state.fileSearch)
			.then(res => {
				this.setupFiles(res);
			});
	}

	getDeleteImage(altText){
		
		return <img src={del} alt={altText} className="mr-2"
		width="25" height="25"></img>;
	}


}

export default Uploaded