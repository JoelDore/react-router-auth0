import React, { Component } from 'react'
import history from './history'
import * as ACTIONS from '../store/actions/actions'
import { connect } from 'react-redux'

class AuthCheck extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated()) {
            this.props.login_success()
            history.replace('/')
        } else {
            this.props.login_failure()
            history.replace('/')
        }
    }
    
    render() {
        return (
            <div></div>
        )
    }
}

function mapStateToProps (state) {
    return {

    }
}

function mapDispatchToProps (dispatch) {
    return {
        login_success: () => dispatch(ACTIONS.login_success()),
        login_failure: () => dispatch(ACTIONS.login_failure()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthCheck)
