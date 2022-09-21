/*eslint-disable*/
import { Component } from "react"
import './App.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from './header';
import Sidebar from "./Sidebar";
import Dropdown from 'react-bootstrap/Dropdown';
import {
    ComposedChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

export default class Chart_compare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            all_assests: [],
            drop_item: "Bitcoin",
            drop_item_1: "Ethereum",
            bit_coin: [], eth_coin: [],
            new_arr: []
        }
        this.arr_put = this.arr_put.bind(this);
        this.api_Call = this.api_Call.bind(this);
    }
    componentWillMount() {
        this.fun_2();
        this.api_Call();
    }
    fun_2() {
        $.ajax({
            url: "https://api.coincap.io/v2/assets",
            contentType: "application/json"
        })
            .done(
                function (abcd) {
                    this.setState({ all_assests: abcd.data });
                }.bind(this)
            )
            .fail(
                function (datas) {
                }
            );
        this.api_Call();
    }
    api_Call() {
        $.ajax({
            url: "https://api.coincap.io/v2/assets/bitcoin/history?interval=d1",
            contentType: "application/json"
        })
            .done(
                function (abc) {
                    this.setState({ bit_coin: abc.data });
                }.bind(this)
            )
            .fail(
                function (datas) {
                }
            );
        $.ajax({
            url: "https://api.coincap.io/v2/assets/ethereum/history?interval=d1",
            contentType: "application/json"
        })
            .done(
                function (abc1) {
                    this.setState({ eth_coin: abc1.data });
                }.bind(this)
            )
            .fail(
                function (datas) {
                }
            );
            this.arr_put();
    }

    arr_put() {
        let arr_1 = this.state.bit_coin.map(obj => {
            return obj.date;
        });
        let arr_2 = this.state.bit_coin.map(obj => {
            return obj.priceUsd;
        });
        let arr_3 = this.state.eth_coin.map(obj => {
            return obj.priceUsd;
        });
        let final_arr = [];
        arr_1.forEach((v, i) => final_arr = [...final_arr, { "date": arr_1[i], "priceUsd_1": arr_2[i], "priceUsd_2": arr_3[i] }])
        this.setState({ new_arr: final_arr });
    }

    render() {
        
        return (
            <div>
                <div><Header /></div>
                <div><Sidebar /></div>

                <div className="col-md-4" style={{ position: "fixed", left: "549px", top: "100px" }}>
                    <Dropdown >
                        <Dropdown.Toggle variant="info" style={{ width: "237px" }}>
                            {this.state.drop_item}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ height: "150px", overflow: "auto", position: "fixed" }}>
                            {this.state.all_assests ? this.state.all_assests.map((coin, index) =>
                                <Dropdown.Item key={index} onClick={(e) => this.setState({ drop_item: coin.name })}>{coin.symbol + " - " + coin.name}</Dropdown.Item>
                            ) : "No data"}

                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="col-md-1 btn btn-danger" style={{ position: "fixed", left: "924px", top: "200px" }}><i className="fa fa-chart" aria-hidden="true"></i>Compare</div>
                <div className="col-md-4" style={{ position: "fixed", left: "1194px", top: "100px" }}>
                    <Dropdown >
                        <Dropdown.Toggle variant="info" style={{ width: "237px" }}>
                            {this.state.drop_item_1}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ height: "150px", overflow: "auto", position: "fixed" }}>
                            {this.state.all_assests ? this.state.all_assests.map((coin, index) =>
                                <Dropdown.Item onClick={(e) => this.setState({ drop_item_1: coin.name })}>{coin.symbol + " - " + coin.name}</Dropdown.Item>
                            ) : "No data"}

                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div>
                    <ComposedChart
                        width={1150}
                        height={600}
                        data={this.state.new_arr}
                        margin={{
                            top: 290,
                            right: 390,
                            left: 450,
                            bottom: 20,
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis
                            dataKey="date"                           
                        />
                        <YAxis  />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="priceUsd_1" barSize={20} fill="#413ea" />
                        <Bar dataKey="priceUsd_2" barSize={20} fill="#413ea0" />

                    </ComposedChart>
                </div>
            </div>

        );
    }
}