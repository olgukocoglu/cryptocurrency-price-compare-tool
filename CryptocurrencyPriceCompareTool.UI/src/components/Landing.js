import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class priceList extends Component {
  prices() {
    return this.props.cryptoPrices.map(crypto => {
      return (
        <tr key={crypto.name}>
          <td>{crypto.name}</td>
          <td>{crypto.bittrex}</td>
          <td>{crypto.poloniex}</td>
          <td>{crypto.binance}</td>
          <td>{crypto.percentage}</td>
        </tr>
      );
    });
  }

  renderContent() {
    switch (this.props.cryptoPrices) {
      case null:
        this.props.loaded();
        return (
          <div className="h-100">
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: '100%' }}
              />
            </div>
          </div>
        );
      default:
        return (
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Cryptocurrency</th>
                <th scope="col">Bittrex Price</th>
                <th scope="col">Poloniex Price</th>
                <th scope="col">Binance Price</th>
                <th scope="col">Percentage</th>
              </tr>
            </thead>
            <tbody>{this.prices()}</tbody>
          </table>
        );
    }
  }
  render() {
    return <div className="h-100">{this.renderContent()}</div>;
  }
}

function mapStateToProps(state) {
  return { cryptoPrices: state.loaded };
}

export default connect(mapStateToProps, actions)(priceList);
