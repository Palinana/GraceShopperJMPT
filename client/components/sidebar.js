import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAllCategories } from '../store/categories';

class Sidebar extends Component {

  componentDidMount() {
    this.props.getAllCategories();
  }

  render() {
    const categories = this.props.categories
        return (
           <div className="sidenav">
              <div className='sidebar-category'>Categories:</div>
              {
                categories.map(category => {
                  return (
                    <div key={category.id}>
                      <Link className='sidebar-trips' to={`/trips/category/${category.id}`} >
                      <dl>
                          <dt className="sider">{category.name}</dt>
                          </dl>
                      </Link>
                    </div>  
                  )
                })
              }
           </div>
        )
  }
}

const mapState = (state) => {
  return {
    categories: state.categories
  }
}

const mapDispatch = (dispatch) => {
  return {
    getAllCategories: () => {
      dispatch(fetchAllCategories());
    }
  }
}

export default connect(mapState, mapDispatch)(Sidebar);

