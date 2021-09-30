import React from "react";
import {Line} from "react-chartjs-2"
import io from "socket.io-client"

export default class Market extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isMonitoring: false,
            trades: [],
            movingAveragePrice: [],
            windowSize: 25,
            totalVolume: 0,
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'BTC-USDT',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: []
                    },
                    {
                        label: 'BTC-USDT (Moving Average)',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(0,0,200,0.6)',
                        borderColor: 'rgba(0,0,200,0.5)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(0,0,200,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(0,0,200,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: []
                    }
                ]
            }
        }
    }

    listenTicker = async (trade) => {
        if (!this.state.isMonitoring) return;
        let trades = [...this.state.trades];
        let movingAveragePrice = [...this.state.movingAveragePrice];
        trade.volume = Number(trade.price) * Number(trade.quantity);
        trades.push(trade);
        if (trades.length > this.state.windowSize) {
            let index = trades.length - this.state.windowSize;
            trades = trades.slice(index);
        }
        let averagePrice = trades.reduce((sum, trade) => sum + Number(trade.price), 0) / trades.length;
        movingAveragePrice.push(averagePrice);
        if (movingAveragePrice.length > this.state.windowSize) {
            let index = movingAveragePrice.length - this.state.windowSize;
            movingAveragePrice = movingAveragePrice.slice(index);
        }
        let newData = {...this.state.data}
        newData.datasets[0].data = trades.map(trade => trade.price);
        newData.datasets[1].data = movingAveragePrice;
        newData.labels.push(new Date(trade.timestamp).toLocaleTimeString());
        if (newData.labels.length > this.state.windowSize) {
            let index = newData.labels.length - this.state.windowSize;
            newData.labels = newData.labels.slice(index);
        }
        if (newData.datasets[0].data.length > this.state.windowSize) {
            let index = newData.datasets[0].data.length - this.state.windowSize;
            newData.datasets[0].data = newData.datasets[0].data.slice(index);
            newData.datasets[1].data = newData.datasets[1].data.slice(index);
            newData.labels = newData.labels.slice(index);
        }
        this.setState({trades, movingAveragePrice, data: newData});
    }

    componentDidMount = () => {
        this.socket = io("ws://localhost:5555")
        this.socket.on('ticker', this.listenTicker)
    }

    startMonitoring = () => {
        this.setState({
            isMonitoring: true
        });
    }

    pauseMonitoring = () => {
        this.setState({
            isMonitoring: false
        });
    }

    handleWindowSizeChange = (event) => {
        this.setState({windowSize: Number(event.target.value)});
    }

    render = () => {
        let monitoringButton = "";
        if (this.state.isMonitoring) {
            monitoringButton =
                <button onClick={this.pauseMonitoring} className="btn btn-warning">Pause Monitoring</button>;
        } else {
            monitoringButton =
                <button onClick={this.startMonitoring} className="btn btn-success">Start Monitoring</button>
        }

        return (
            <div className="container">
                <p></p>
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Market Panel</h4>
                        <div className="form-group">
                            <label className="form-label" htmlFor="windowSize">Window size:</label>
                            <select className="form-control-sm"
                                    onChange={this.handleWindowSizeChange}
                                    id="windowsSize"
                                    name="windowSize"
                                    value={this.state.windowSize}>
                                <option>25</option>
                                <option>50</option>
                                <option>100</option>
                            </select>
                            {monitoringButton}
                        </div>
                    </div>
                    <div className="card-body">
                        <Line redraw
                              data={this.state.data}
                              width={600}
                              height={480}
                              options={{maintainAspectRatio: false, animation: false}}></Line>
                    </div>
                </div>
                <p></p>
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Market Data</h4>
                    </div>
                    <div className="card-body">
                        <table className="table table-hover table-bordered table-striped">
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Volume</th>
                                <th>Timestamp</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.trades.map((trade, i) => {
                                    return (<tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{trade.price}</td>
                                            <td>{trade.quantity}</td>
                                            <td>{trade.volume.toFixed(0)}</td>
                                            <td>{new Date(trade.timestamp).toLocaleTimeString()}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}