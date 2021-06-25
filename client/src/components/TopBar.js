/*---------------------------------\
      Components to wear         
\----------------------------------*/
import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Logout from './Logout';
import logo from "../assets/images/logo.png"

/*---- Declared component ----------*/
function TopBar(){
	const {user} = useAuth0();
    return(
        <React.Fragment>
			
				<nav className="navbar navbar-expand-lg navbar-light bg-dark mb-4 shadow">
  					<div className="container-fluid">
					  	<img width="50" className="rounded-circle ms-4 mx-4" src={logo} alt="logo" />
						  <h4 className="h4 text-white">Dashboard</h4>
    					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
     					 	<span className="text-white p-2"><i className="bi bi-person-circle"></i></span>
    					</button>
    				<div className="collapse navbar-collapse text-white" id="navbarSupportedContent">
      					<ul className="navbar-nav ms-auto b-2 mb-lg-0 align-items-end">
        			
        					<li className="nav-item">
							<span className="nav-link">
								<span className="mr-2 text-white small">{user.name}</span>
							</span>
							</li>
							<li className="nav-item">
								<span className="nav-link">	
								<img width="50" className="rounded-circle" src={user.picture} alt={user.name} />
								</span>
								</li>
							<li className="nav-item">
								<span className="nav-link"><Logout /></span>
							</li>
							</ul>
    					</div>
  					</div>
				</nav>
	
        </React.Fragment>
    )
}
export default TopBar;