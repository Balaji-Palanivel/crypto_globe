import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import moment from 'moment';
import Dropdown from 'react-bootstrap/Dropdown';
import Barchart from './Barchart';
import AreaChart from './Areachart';
import LineChart from './Linechart';
import Header from './header';

export default class Chart extends Component {
    constructor(props) {
        super(props);

        this.state = {          
            chart_data: [],
            topvalue: 0,
            Bar: true, Area: false, Line: false
        };
      
    }
   
    setBar() { this.setState({ Bar: true, Area: false, Line: false }) }
    setLine() { this.setState({ Bar: false, Area: false, Line: true }) }
    setArea() { this.setState({ Bar: false, Area: true, Line: false }) }
    dateFormatter = (item) => { return moment(new Date(item)).format('MMM YY') }
    render() {
        return (
            <div className='grid-container'>
                <div><Header /></div>

                <div className='row' >        
                <div className="col-md-6" style={{ position: "fixed", fontSize: "44px", left: "74px", top: "100px" }}> {this.props.Coin_Name + " - " + this.props.Coin_Symbol}</div>          
                <div style={{ position: "fixed", fontSize: "40px", left: "549px", top: "100px" }}>
                        <Dropdown >
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Chart
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={(e) => this.setLine(e)}>Line Chart</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.setBar(e)}> Barchart </Dropdown.Item>
                                <Dropdown.Item onClick={(e) => this.setArea(e)}>Area Chart</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    </div>
                    {this.state.Bar == true ? <div  style={{position: "fixed"}} ><Barchart data={this.props.Chart_Data} /> </div> : " "}
                    {this.state.Area == true ? <div style={{position: "fixed"}}><AreaChart data={this.props.Chart_Data} /></div> : " "}
                    {this.state.Line == true ? <div style={{position: "fixed"}}><LineChart data={this.props.Chart_Data} /> </div> : " "}

                    <div className="row "  style={{position: "fixed" , bottom : "75px"}}>                       
                        <div className="col-md-4 card " style={{ height: "200px", width: "400px", left: "110px", top: "40px", backgroundColor: "#E2DCC8", textAlign: "center"}}>
                            <span>Latest Value</span>
                            <div className="featuredMoneyContainer">
                                <span className="featuredMoney">$ {parseInt(this.props.Topvalue)}</span>
                            </div>
                        </div>

                    </div>
                

            </div>

        );
    }
}