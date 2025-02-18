import React from "react"
import FooterSlim from "./FooterSlim";
import Header from "./Header"
class SPFLayout extends React.Component {
  render(){
    //const SPFLinksWithNavigation = withNavigation(SPFLinks);
    return (
      <>
      
        <Header />
        
        <main className="main_section">{this.props.children}</main>
        <FooterSlim />
      </>
    )
  }
}
export default SPFLayout;