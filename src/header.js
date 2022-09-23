/*eslint-disable*/
import { Component } from "react"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default class header extends Component {
    render(){
    return (
        <div>
            <header>
                <div className='row'>
                    <div className="col-md-12 header" grid-area="header" style={{ width: "90%" , left :"190px"}}>
                        Crypto  <i data-test="fa" className="sc-gSAPjG vdkON fa fa-globe"></i>  Globe
                    </div>
                </div>
            </header>
        </div>
    );
}
}