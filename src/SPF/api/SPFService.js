import axios from "axios";

class SPFService{
    constructor() {
        this.url = process.env.REACT_APP_SPF_API_URL;
        this.userName = sessionStorage.getItem('SPF_Authenticate_UserId');
        this.orgId = sessionStorage.getItem('SPF_Authenticate_OrgId');
      }
    
    deleteFile(fileDestId){
        console.log('Hi deleteFile'+ fileDestId)
        return axios.delete(`${this.url}/deleteFile/${this.userName}/${fileDestId}`); 
    }

    getWelcomeMessage(){
        console.log('API URL = '+this.url+' userName:'+this.userName+'   '+this.orgId);
        return axios.get(`${this.url}/welcomeMessage/${this.userName}/${this.orgId}`);
    }

    getWelcomeMessageWithParam(user,orgId){
        console.log('getWelcomeMessageWithParam :'+user);
        return axios.get(`${this.url}/welcomeMessage/${user}/${orgId}`);
    }


    
    fetchAllDownloads(){
        return axios.get(`https://xg1jbysjaa.execute-api.us-east-1.amazonaws.com/Dev/mylist`,{
            headers : {
                "Content-Type" : "application/json",
                "x-api-key" : "5qsXKU54Os3KxyIjVTfgY8BWUHpzwpIK5Nf3V9Hd"
            },
        });
    }
    fetchAllDownloadsDESC(){
        return axios.get(`${this.url}/download/${this.userName}/getAllDownloadableFile/DESC`);
    }
    fetchAllDownloadsASC(){
        return axios.get(`${this.url}/download/${this.userName}/getAllDownloadableFile/ASC`);
    }
    searchDownloads(fileName){
        return axios.get(`${this.url}/download/${this.userName}/${fileName}/searchFile`);
    }
    searchDownloadsASC(fileName){
        return axios.get(`${this.url}/${this.userName}/download/${fileName}/searchFile/ASC`);
    }
    searchDownloadsDESC(fileName){
        return axios.get(`${this.url}/${this.userName}/download/${fileName}/searchFile/DESC`);
    }

   
   
    fetchAllUploaded(){
        return axios.get(`${this.url}/uploaded/${this.userName}/getAllUploadedFile`);
    }
    fetchAllUploadedDESC(){
        return axios.get(`${this.url}/uploaded/${this.userName}/getAllUploadedFile/DESC`);
    }
    fetchAllUploadedASC(){
        return axios.get(`${this.url}/uploaded/${this.userName}/getAllUploadedFile/ASC`);
    }
    searchUploaded(fileName){
        return axios.get(`${this.url}/uploaded/${this.userName}/${fileName}/searchFile`);
    }
    searchUploadedASC(fileName){
        return axios.get(`${this.url}/uploaded/${this.userName}/${fileName}/searchFile/ASC`);
    }
    searchUploadedDESC(fileName){
        return axios.get(`${this.url}/uploaded/${this.userName}/${fileName}/searchFile/DESC`);
    }

    uploadFile(formData,location){
        return axios.post(`${this.url}/upload/${this.userName}/${location}/${this.orgId}`, formData, {
			headers: {
			  'Content-Type': 'multipart/form-data'
			}
		});

    }


}

export default new SPFService()