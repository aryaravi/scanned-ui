
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import withNavigation from "./WithNavigation.jsx";
import ListDownloadable from "./ListDownloadable.jsx"
import Upload from './Upload.jsx'
import Uploaded from './Uploaded.jsx';
import SPFWelcome from './SPF-Welcome.js'
import SPFError from './Error.jsx';
import './css/spf.css';
import AuthenticateRoute from "./AuthenticateRoute.jsx";
import ListFiles from "./ListFiles.jsx";


class SPFApp extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		const ListDownloadableWithNavigation = withNavigation(ListDownloadable);
		const UploadedWithNavigation = withNavigation(Uploaded);
		const UploadWithNavigation = withNavigation(Upload);
		const SPFWelcomeWithNavigation = withNavigation(SPFWelcome);
		const SPFErrorWithNavigation = withNavigation(SPFError);
		const ListFilesWithNavigation = withNavigation(ListFiles);

		return (
			<>
				<Router basename="/SPF-Web/"> 				
					<Routes>
						<Route path="/welcome" element={<SPFErrorWithNavigation></SPFErrorWithNavigation>} />
						
						<Route path="/" element={
							<AuthenticateRoute>
								<SPFWelcomeWithNavigation></SPFWelcomeWithNavigation>
							</AuthenticateRoute>} />
						
						
						<Route path="/download" element={
							<AuthenticateRoute>
								<ListDownloadableWithNavigation></ListDownloadableWithNavigation>
							</AuthenticateRoute>} />

							<Route path="/listings" element={
								<AuthenticateRoute>
									<ListFilesWithNavigation></ListFilesWithNavigation>
								</AuthenticateRoute>
							}/>

						
						<Route path="/uploaded" element={
							<AuthenticateRoute>
								<UploadedWithNavigation></UploadedWithNavigation>
							</AuthenticateRoute>} />
						
						<Route path="/upload" element={
							<AuthenticateRoute>
								<UploadWithNavigation></UploadWithNavigation>
							</AuthenticateRoute>} />
					</Routes>
				</Router>
			</>
		)
	}
	

}

export default SPFApp