import { Component } from 'react';
import moment from 'moment';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class Barchart extends Component {
    dateFormatter = (item) => { return moment(new Date(item)).format('MMM YY') }
    dateFormatter_1 = (item) => { return moment(new Date(item)).format('DD MMM YY') }
    render() {

        return (<div >
            <BarChart
                width={1000}
                height={600}
                data={this.props.data}
                margin={{
                    top: 190,
                    right: 30,
                    left: 50,
                    bottom: 5,
                }}
            >
                <XAxis dataKey="date" tickFormatter={this.dateFormatter} />
                <YAxis />
                <Tooltip labelFormatter={this.dateFormatter_1} formatter={(value, name) => (name === "priceUsd") ? parseInt(value) : value.toLocaleString()} />
                <Legend />
                <Bar dataKey="priceUsd" fill="#8884d8" />
            </BarChart>

        </div>);
    }
}