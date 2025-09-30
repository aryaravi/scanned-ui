

class SPFService{
    constructor() {
        this.url = process.env.REACT_APP_SPF_API_URL;
        this.userName = sessionStorage.getItem('SPF_Authenticate_UserId');
        this.orgId = sessionStorage.getItem('SPF_Authenticate_OrgId');
      }
    
    async deleteFile(fileDestId){
        console.log('Hi deleteFile'+ fileDestId)
        const response = await fetch(`${this.url}/deleteFile/${this.userName}/${fileDestId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }

    async getWelcomeMessage(){
        console.log('API URL = '+this.url+' userName:'+this.userName+'   '+this.orgId);
        const response = await fetch(`${this.url}/welcomeMessage/${this.userName}/${this.orgId}`);
        return response;
    }

    async getWelcomeMessageWithParam(user,orgId){
        console.log('getWelcomeMessageWithParam :'+user);
        const response = await fetch(`${this.url}/welcomeMessage/${user}/${orgId}`);
        return response;
    }


    
    async fetchAllDownloads(){
        const response = await fetch(`https://xg1jbysjaa.execute-api.us-east-1.amazonaws.com/Dev/mylist`, {
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "5qsXKU54Os3KxyIjVTfgY8BWUHpzwpIK5Nf3V9Hd"
            }
        });
        return response;
    }
    async fetchAllDownloadsDESC(){
        const response = await fetch(`${this.url}/download/${this.userName}/getAllDownloadableFile/DESC`);
        return response;
    }
    async fetchAllDownloadsASC(){
        const response = await fetch(`${this.url}/download/${this.userName}/getAllDownloadableFile/ASC`);
        return response;
    }
    async searchDownloads(fileName){
        const response = await fetch(`${this.url}/download/${this.userName}/${fileName}/searchFile`);
        return response;
    }
    async searchDownloadsASC(fileName){
        const response = await fetch(`${this.url}/${this.userName}/download/${fileName}/searchFile/ASC`);
        return response;
    }
    async searchDownloadsDESC(fileName){
        const response = await fetch(`${this.url}/${this.userName}/download/${fileName}/searchFile/DESC`);
        return response;
    }

   
   
    async fetchAllUploaded(){
        const response = await fetch(`${this.url}/uploaded/${this.userName}/getAllUploadedFile`);
        return response;
    }
    async fetchAllUploadedDESC(){
        const response = await fetch(`${this.url}/uploaded/${this.userName}/getAllUploadedFile/DESC`);
        return response;
    }
    async fetchAllUploadedASC(){
        const response = await fetch(`${this.url}/uploaded/${this.userName}/getAllUploadedFile/ASC`);
        return response;
    }
    async searchUploaded(fileName){
        const response = await fetch(`${this.url}/uploaded/${this.userName}/${fileName}/searchFile`);
        return response;
    }
    async searchUploadedASC(fileName){
        const response = await fetch(`${this.url}/uploaded/${this.userName}/${fileName}/searchFile/ASC`);
        return response;
    }
    async searchUploadedDESC(fileName){
        const response = await fetch(`${this.url}/uploaded/${this.userName}/${fileName}/searchFile/DESC`);
        return response;
    }

    async uploadFile(formData, location){
        const response = await fetch(`${this.url}/upload/${this.userName}/${location}/${this.orgId}`, {
            method: 'POST',
            body: formData,
            headers: {
                // 'Content-Type': 'multipart/form-data' will be set automatically by the browser
            }
        });
        return response;
    }


}

export default new SPFService()