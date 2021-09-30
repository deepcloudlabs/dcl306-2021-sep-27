import React, { Component } from 'react';
import Table from './Table';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class World extends Component {
  constructor(props){
    super(props);
    this.state = {
        continents: [],
        countries: [],
        continent: "Asia"
    };
    this.list= this.list.bind(this);
  }

  componentDidMount() {
      fetch("http://localhost:7070/world/api/continents")
         .then(response=> response.json())
         .then((continents) =>this.setState({continents: continents.sort()}));
  }

  componentWillUnmount() {
  }

  list(){
      fetch("http://localhost:7070/world/api/countries?continent=Asia")
          .then(response=> response.json())
          .then((countries) => {
               this.state.countries.splice(0);
               countries.forEach( country => this.state.countries.push(country));
               this.setState({countries: this.state.countries})})
          ;
  }

  render() {
    return (
        <div className="container" role="main">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3 className="panel-title">World Countries</h3>
            </div>
            <div className="panel-body">
                <div className="form-group">
                    <label htmlFor="continent"></label>
                    <select className="form-control">
                        { this.state.continents.map( (continent,i) =>
                               <option key={i} label={continent} value={continent}>{continent}</option>
                          )
                        }
                    </select>
                    <button  onClick={this.list}
                             className="btn btn-success">List</button>
                </div>
            </div>
          </div>
            <Table title="Countries"
                   columns="Code,Name,Population,Surface Area"
                   values={this.state.countries}
                   properties="code,name,population,surfaceArea"></Table>
        </div>
    );
  }
}

export default World;
