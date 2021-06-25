/*---------------------------------\
      Components to wear         
\----------------------------------*/
import React, {Component} from "react";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url = "http://localhost:4000/api/";

class Table extends Component{

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          modalInsert: false,
          modalDelete: false,
          form:{
              concept: '',
              amount: '',
              type: '',
              tipoModal: ''
            },
          operationsList: [],
        };
      }
     
      requestGet = () => {

        axios.get(url)
        .then(res =>{
          let operations = res.data
          this.setState({
            operationsList: operations.data,
          });
        }).catch(error => {
          console.log(error.message);
        })
      }
        
      requestPost = async () => {

         delete this.state.form.id;
         await axios.post(url,this.state.form)
         .then(res => {
            this.modalInsert();
            this.requestGet();
        }).catch(error=>{
            console.log(error.message);
        })
      }
        
      requestPut = () => {

        axios.put(url+this.state.form.id, this.state.form)
          .then(res => {
            this.modalInsert();
            this.requestGet();
        }).catch(error => {
          console.log(error.message);
        })
      }
        
      requestDelete = () => {

          axios.delete(url+this.state.form.id)
          .then(res => {
            this.setState({modalDelete: false});
            this.requestGet();
        }).catch(error=>{
            console.log(error.message);
        })
      }
        
      modalInsert = () => {
          this.setState({modalInsert: !this.state.modalInsert});
      }
        
      selectOperation = (operation) => {
        
          this.setState({
            tipoModal: 'update',
            form: {
              id: operation.id,
              concept: operation.concept,
              amount: operation.amount,
              type: operation.type
            }
          })
        }
        
        handleChange = async (e) =>{
        e.persist();
        await this.setState({
          form:{
            ...this.state.form,
            [e.target.name]: e.target.value
          }
        });
        }
        
        componentDidMount() {
          this.requestGet();
        }
        
    render(){

      let totalBalance = this.state.operationsList.reduce((sum, value) => (sum + value.amount), 0)
      let entries = this.state.operationsList.filter(operation => operation.type === 'Entry').reduce((sum, value) => (sum + value.amount), 0)
      let egresses = this.state.operationsList.filter(operation => operation.type === 'Egress').reduce((sum, value) => (sum + value.amount), 0)

    return(
      
        <React.Fragment>
        
        <div className="row justify-content-center">
          <div className="col-md-4 mb-4">
              <div className="card text-white bg-danger mb-3 mx-auto" style={{maxWidth: "18rem"}}>
                <div className="card-header">Total Egresses:</div>
                  <div className="card-body">
                  <h5 className="card-title text-center">
                  {new Intl.NumberFormat("en-EN").format(egresses)}    
                  </h5>
                  </div>
                </div>
          </div>

          <div className="col-md-4 mb-4">
          <div className="card text-white bg-primary mb-3 mx-auto" style={{maxWidth: "18rem"}}>
            <div className="card-header">Total Balance:</div>
              <div className="card-body">
              <h5 className="card-title text-center">
                {new Intl.NumberFormat("en-EN").format(totalBalance)}
                </h5>
            </div>
          </div>
          </div>
          
          <div className="col-md-4 mb-4">
          <div className="card text-white bg-success mb-3 mx-auto" style={{maxWidth: "18rem"}}>
            <div className="card-header">Total Entries:</div>
              <div className="card-body">
              <h5 className="card-title text-center">
              {new Intl.NumberFormat("en-EN").format(entries)} 
              </h5>
            </div>
          </div>
          </div> 

        </div>
				  <button className="btn btn-success d-flex mx-auto mb-4" onClick={()=>{this.setState({form: null, tipoModal: 'insert'}); this.modalInsert()}}>Add Operation</button>
					{/*<!-- Table -->*/}
					<div className="card shadow mb-4 ml-4 mr-4">
						<div className="card-body">
							<div className="table-responsive" style={{width: "100%", margin: "0 auto"}}>
								<table className="table table-bordered" id="dataTable" cellSpacing="0">
									<thead>
										<tr>
                        <th>Concept</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Actions</th>
										</tr>
									</thead>
                  
                  {this.state.operationsList.map((operation,index)=>{ 
                    return( 
                      <tbody key={index}>
                    <tr>
                      <td>{operation.concept}</td>
                      <td>{new Intl.NumberFormat("en-EN").format(operation.amount)}</td>
                      <td>{operation.createdAt.slice(0, 10)}</td>
                      <td>{operation.type}</td>
                      <td>
                        <button className="btn btn-primary mx-1" onClick={()=>{this.selectOperation(operation); this.modalInsert()}}><i className="bi bi-pencil"></i></button>
                        <button className="btn btn-danger ms-1" onClick={()=>{this.selectOperation(operation); this.setState({modalDelete: true})}}><i className="bi bi-trash"></i></button>
                      </td>
                    </tr>
                    </tbody>
                     )
                  })}
                
								</table>
                <div className="badge bg-primary d-flex mx-auto" style={{width: "6rem"}}>
                <i className="bi bi-arrow-left-right"></i>
                </div>
							</div>
						</div>
					</div>
          <Modal isOpen={this.state.modalInsert}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsert()}>x</span>
                </ModalHeader>
                <ModalBody>
             
                  <div className="form-group">
                    <label htmlFor="id">ID</label>
                    {this.state.tipoModal==='insert'? 
                    <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value="ID auto generated" disabled/>
                    :
                    <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={this.state.form? this.state.form.id : ''}/> }
                    <br />
                    <label htmlFor="concept">Concept</label>
                    <input className="form-control" type="text" name="concept" id="concept" onChange={this.handleChange} value={this.state.form? this.state.form.concept: ''}/>
                    <br />
                    <label htmlFor="amount">Amount</label>
                    <input className="form-control" type="text" name="amount" id="amount" onChange={this.handleChange} value={this.state.form? this.state.form.amount: ''}/>
                    <br />
                    <label htmlFor="type">Type</label>
                    {this.state.tipoModal==='insert'?  
                    <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" name="type" id="type" onChange={this.handleChange} value={this.state.form? this.state.form.type: ''}>
                    <option defaultValue>Open this select type</option>
                    <option value="Entry">Entry</option>
                    <option value="Egress">Egress</option>
                    </select>
                    : <input className="form-control" type="text" name="type" id="type" readOnly onChange={this.handleChange} value={this.state.form? "You can't change the type of operation": ''} disabled/>  } 
                    <br />
                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal==='insert'?
                    <button className="btn btn-success" onClick={()=>this.requestPost()}>
                    Insert
                  </button>: <button className="btn btn-primary" onClick={()=>this.requestPut()}>
                    Update
                  </button>
                  }
                    <button className="btn btn-danger" onClick={()=>this.modalInsert()}>Cancel</button>
                </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.modalDelete}>
            <ModalBody>
              Are you sure do you want to delete the operation "{this.state.form && this.state.form.concept}" ?
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.requestDelete()}>Yes</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalDelete: false})}>No</button>
            </ModalFooter>
          </Modal>
         
        </React.Fragment>
        )
	}
}
export default Table;