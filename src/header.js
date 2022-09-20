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
                    <div className="col-md-12 header" grid-area="header" style={{ width: "85%" }}>
                        Crypto  <i data-test="fa" class="sc-gSAPjG vdkON fa fa-globe"></i>  Globe
                    </div>
                </div>
            </header>
        </div>
    );
}
}