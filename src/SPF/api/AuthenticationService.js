import SPFService from "./SPFService";


class AuthenticationService{
    constructor() {
        this.url = process.env.REACT_APP_SPF_API_URL;
        this.isLocal = process.env.REACT_APP_ENV_LOCAL;
        this.getReqHeaderURL = process.env.REACT_APP_GETHEADERS_URL;
        this.getReqHeaderParam = process.env.REACT_APP_GETHEADER_PARAM;
        this.getReqHeaderOrgIdParam = process.env.REACT_APP_GETHEADER_ORGID;
      }
      isUserLoggedIn(){
        console.log("Inside isUserLoggedIn:: "+this.isLocal);
        if(this.isLocal==='true'){
          return true;
        }
        let user = sessionStorage.getItem('SPF_Authenticate_UserId');
        console.log('user Value from session : '+user);
        if(user === null){
          const fetchWebpage = async () => {
            try {
              const response = await fetch(this.getReqHeaderURL); // Replace with the URL of the webpage you want to read
              const content =await response.text();
              let user = this.findValInJSON(JSON.parse(content), this.getReqHeaderParam);
              let orgId = this.findValInJSON(JSON.parse(content), this.getReqHeaderOrgIdParam);
              console.log('### the value is: ' + user+' orgId '+orgId);
              sessionStorage.setItem('SPF_Authenticate_UserId',user);
              sessionStorage.setItem('SPF_Authenticate_OrgId',orgId);
              this.populateWelcomeMessage(user,orgId);
            } catch (error) {
                console.error('Error fetching webpage:', error);
                return false;
              }
            };
        
            fetchWebpage();
        }else{
          return true;
        }
    }
    findValInJSON (jsonObj, searchKey){
      const key = 'reqName';
      const val = 'reqValue';
      //const index =0;
      for (var index in jsonObj) {
        let row = jsonObj[index];
        if (row[key] === searchKey) {
        return row[val];
        }
      }
    }

    populateWelcomeMessage(user,orgId){
      if (window.sessionStorage.getItem('WelcomeMessage')=== null){			
        SPFService.getWelcomeMessageWithParam(user,orgId)
        .then(res => {
          window.sessionStorage.setItem('WelcomeMessage',res.data);
        },() =>{
          console.log(' Network error!');
        })
      }else{
        console.log(' Data found. Fetched from session');
      }
    }
  

}

export default new AuthenticationService()