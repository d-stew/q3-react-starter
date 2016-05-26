import React, { Component } from 'react'
import { connect } from 'react-redux'
import { verifyUser } from '../redux/actions'

import JWT from '../helpers/jwt_helper'
import SpeakBox from '../components/SpeakBox';

class Dashboard extends Component{
  componentWillMount(){
    if(!JWT.fetch()){
      this.context.router.replace('/');
    } else {
      return this.props.verifyUser().then(res =>{
        if(!res.payload.data.user){
          this.context.router.replace('/');
        }
      })
    }
  }
  render(){
    return (
      <div >
        <h1>{this.props.user.name}</h1>
        {this.props.children}
        <SpeakBox />
      </div>
    )
  }
}

Dashboard.contextTypes = {
  router: React.PropTypes.object
};

function mapStateToProps(state) {
  return {user: state.user.cred}
}

export default connect(mapStateToProps, {
  verifyUser
})(Dashboard);