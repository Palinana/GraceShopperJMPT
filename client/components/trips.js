import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody } from 'reactstrap';
import { fetchAllTrips, search } from '../store/trips';
import Sidebar from './sidebar';


function searchingFor(search){
  return function(x){
    return x.name.toLowerCase().includes(search.toLowerCase() || !search)
  }
}

class Trips extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      isDirty: false
    };

    this.searchHandler = this.searchHandler.bind(this);
  }

  searchHandler(e){
    this.setState({
      search: e.target.value,
    })
  }

  componentDidMount(){
    this.props.getAllTrips();
  }

  trips(){
    const { where = () => true } = this.props
    return this.props.trips.filter(where)
  }

  render() {
    let searchLength = this.state.search.length;

    let isDirty = searchLength ? true : false;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="menu col-md-2 mt">
            <Sidebar />
          </div>
          <div className="menu col-md-10 mt">
          <div className="row">
          <div className="col-sm-offset-3 col-sm-6 search">
            <form onSubmit={this.handleSubmit} className="form-horizontal">
              <span className="icon"><i className="fa fa-search"></i></span>
              <input className="form-control" type="search" id="search" placeholder="Search..." value={this.state.search} onChange={this.searchHandler}/>
            </form>
            </div>
            </div>

            {isDirty ? <div className="wrap">
            {  this.trips().filter(searchingFor(this.state.search)).length ?
              (this.trips().filter(searchingFor(this.state.search)).map(trip => {
                return (
                  <div className="trips"  key={trip.id}>
                  <Link to={`/trips/${trip.id}`} className='trips'>
                    <img className="trips-images"src={trip.imageUrl} />
                    <h3 className='trip-info'>{trip.name}</h3>
                    <h5 className='trip-info'>{trip.location}</h5>
                    <h5 className='trip-info'>{`$${trip.price}`}</h5>
                  </Link>
                  </div>
                )
              })) : <p className='no-match'>No Match</p>
            }
            </div> : <div className="wrap">
            {
              this.trips().map(trip => {
                const im = `/images/luggage.png/~text?txtsize=33&txt=318%C3%97180&w=318&h=180`
                return (
                  <div key={trip.id}>
                    <CardDeck>
                      <Card>
                        <CardImg top width="100%" className="trip-image" src={trip.imageUrl}alt="Card image cap" />
                        <CardBody>
                        <Link to={`/trips/${trip.id}`} className='trips'>
                          <CardTitle className='trip-info'>{trip.name}</CardTitle>
                          <CardSubtitle >{trip.location}</CardSubtitle>
                          <CardText className='trip-info'>{`$${trip.price}`}</CardText>
                          </Link>
                        </CardBody>
                      </Card>
                    </CardDeck>
                  </div>
                )
            })
        }
        </div> }
      </div>
      </div>
    </div> 
    )
  }
}

const mapState = state => {
  return {
    trips: state.trips,
  }
}

const mapDispatch = dispatch => {
 return {
    getAllTrips: () => {
      dispatch(fetchAllTrips());
    }
 }
}

export default connect(mapState, mapDispatch)(Trips)
