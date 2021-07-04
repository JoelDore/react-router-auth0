import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Header extends Component {

    state = {
        nums: [
            { id: 1 },
            { id: 2 },
            { id: 3 },
        ],
        is_authenticated: this.props.auth.is_authenticated
    }

    render() { 
        return (
            <div>
                <Link to="/" style={{ padding: '5px' }}>
                    Home
                </Link>
                <Link to="/privateroute" style={{ padding: '5px' }}>
                    Private Route
                </Link>
                {/* {
                    !this.props.auth.is_authenticated ?  */}
                    <button onClick={() => this.props.auth.login()}>Login</button>
                    {/* : */}
                    <button onClick={() => this.props.auth.logout()}>Logout</button>
                {/* } */}
                {
                    this.state.nums.map(num=>(
                        <Link key={num.id} to={`/component/${num.id}`} style={{ padding: '5px' }}>
                            Component{num.id}
                        </Link>
                    ))
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        // is_authenticated: state.auth_reducer.is_authenticated
    }
}

export default connect(mapStateToProps)(Header)
