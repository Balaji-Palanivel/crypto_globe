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
                        <tr><th>Currency</th></tr>
                    </thead>
                    <tbody >{this.props.All_assests ? this.props.All_assests.map((coin, index) =>
                        <tr key={index}>
                            <td onClick={(e) => this.props.SetCoin(coin.id,coin.name,coin.symbol)}>{coin.symbol +" - "+ coin.name} </td>
                        </tr>
                    ): ""}
                    </tbody>
                </table>
            </div>
            
        );
    }
}
