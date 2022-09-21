import { Component } from "react"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from './header';
import Sidebar from "./Sidebar";

export default class header extends Component {
    render(){
    return (
        <div>
              <div><Header /></div>
              <div><Sidebar /></div>
        </div>
    );
}
}