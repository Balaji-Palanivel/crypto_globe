/*eslint-disable*/
import { Component } from "react"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from './header';
import Sidebar from "./Sidebar";
import $ from 'jquery';



export default class All_table extends Component {

    constructor(props) {
        super(props)

        this.state = {
            Lib: [],
            empty: '--',
            author_detail: [],
            check: 0,
            load: false,
            work_count: [],
            order: "Asc",
            searchInput: "",
            FilteredTable: []
        };

   
        this.searchByName = this.searchByName.bind(this);
    }

    componentWillMount() {
        this.setState({ load: true })
        $.ajax({
            url: "https://api.coincap.io/v2/assets/",
            contentType: "application/json"
        })                                                                                      //Ajax Call for main table
            .done(
                function (data) {
                    this.setState({ Lib: data.data, FilteredTable: [] });
                    $("#loading").hide();
                    console.log(data.data);
                }.bind(this)
            )
            .fail(
                function (datas) {
                    $("#loading").hide();
                }.bind(this)
            );


    }

    findvalid(Val) {

        const detail = (Val === null) ? "--" : parseInt(Val);                                        //findvalid() for data valid or not
        return detail;
    }

    sorting_table(event, sortKey) {
        const data = this.state.Lib;
        if (sortKey == "name") {
            if (this.state.order == "Asc") {
                data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
                this.setState({ Lib: data, order: "Dec" })
            }
            if (this.state.order == "Dec") {
                data.sort((a, b) => b[sortKey].localeCompare(a[sortKey]))
                this.setState({ Lib: data, order: "Asc" });                                          //Sortong_table for sorting

            }

        }
        else if (sortKey == "work_count") {

            if (this.state.order == "Asc") {
                data.sort((a, b) => a[sortKey] - b[sortKey])
                this.setState({ Lib: data, order: "Dec" })
            }
            if (this.state.order == "Dec") {
                data.sort((a, b) => b[sortKey] - a[sortKey])
                this.setState({ Lib: data, order: "Asc" });
            }

        }
    }

    searchByName(val) {
        this.setState(() => ({ searchInput: val.target.value }));
        let a = this.state.Lib.filter(value => value.name.toLowerCase().includes(val.target.value.toLowerCase()));
        console.log(a, 'aaa')
        this.setState(() => ({ FilteredTable: a }))
    }

    render() {
        return (
            <div>
            <div><Header /></div>
            <div><Sidebar /></div>
                <div >
                    <br/><br/><br/><br/><center>

                        {this.state.Lib.length > 0 ? <div style={{ top: "100px", left: "1500px" ,position : "fixed"}} ><br />
                            <input type="text" className='form-control mb-3' placeholder="Searh By Coin" onChange={(e) => this.searchByName(e)} />
                        </div>
                            : ""}
                    </center>                    
                </div>
                {this.state.load == true ? <div id="loading">
                    <div className="centerdiv">
                        <img src="https://acegif.com/wp-content/uploads/loading-25.gif" style={{ width: '50px', height: '50px' }} />
                        <span>   Loading...</span>
                    </div>
                </div> : " "}

                <div id="Table" className="table_style table100 ver5" style={{width: "1550px", height: "780px",right:"100px"}}>
                    {
                        this.state.Lib.length > 0 ? <table className="table">
                            <thead>
                                <tr>
                                    <td>S.No </td>
                                    <td >Symbol <i onClick={e => this.sorting_table(e, "name")} className="fa fa-fw fa-sort"></i></td>
                                    <td>Name </td>
                                    <td>Price </td>
                                    <td >Max Supply <i onClick={e => this.sorting_table(e, "work_count")} className="fa fa-fw fa-sort"></i></td>
                                    <td>Change Persent</td>
                                    <td>Explorer</td>
                                </tr>
                            </thead>
                            <tbody>{this.state.searchInput.length > 0 ? this.state.FilteredTable.map((author, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{author.symbol}  </td>
                                    <td>{author.name}</td>
                                    <td>{parseInt(author.priceUsd)}</td>
                                    <td >{this.findvalid(author.maxSupply)}</td>
                                    <td>{author.changePercent24Hr}</td>
                                    <td>{author.explorer}</td>
                                </tr>
                            ) : this.state.Lib ? this.state.Lib.map((author, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{author.symbol}</td>
                                    <td>{author.name}</td>
                                    <td>{parseInt(author.priceUsd)}</td>
                                    <td >{this.findvalid(author.maxSupply)}</td>
                                    <td>{author.changePercent24Hr}</td>
                                    <td>{author.explorer}</td>
                                </tr>
                            ) : " "}
                            </tbody>
                        </table> : " "}

                </div>


            </div>
        );
    }
}

