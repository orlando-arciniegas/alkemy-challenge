/*---------------------------------\
      Components to wear         
\----------------------------------*/
import React from 'react';
import Table from './Table';
//import {Route, Switch} from 'react-router-dom';

function Content(){

    return(
        <React.Fragment>

			{/* Main Content */}
			<div id="content-wrapper" className="d-flex flex-column">
                
                <div id="content">

                <h1 className="h3 text-gray-800 text-center">List of operations.</h1>
                <hr/>

                <Table />
                
                </div>
                
            </div>    
            {/* End Main Content */}
            
        </React.Fragment>
    )

}
export default Content;