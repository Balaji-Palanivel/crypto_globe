import { Component } from "react";
import Chart from './Chart';
import { Button } from "bootstrap";

export default class Table_1 extends Component {
    constructor(props) {
        super(props);
      this.state = this.props;
    }

    render() {
        return (

            <div className="currency">
                <table className="table table-hover table-light">
                    <thead>
                        <tr><td>Currency</td></tr>
                    </thead>
                    <tbody >{this.props.All_assests ? this.props.All_assests.map((author, index) =>
                        <tr key={index}>
                            <td onClick={(e) => this.props.SetCoin(author.id,author.name,author.symbol)}>{author.symbol +" - "+ author.name} </td>
                        </tr>
                    ): ""}
                    </tbody>
                </table>
            </div>
            
        );
    }
}

