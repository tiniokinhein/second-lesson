import React, { Component } from 'react'
import axios from 'axios'
import { AUTH_LOGIN } from '../config/apiService'
import { withRouter } from 'react-router-dom'
import FullLoading from '../components/loading/FullLoading'

class Login extends Component {

    state = {
        username: '',
        password: '',
        loading: false
    }

    handleOnChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleOnSubmit = e => {
        e.preventDefault()

        this.setState({
            loading: true
        })

        const data = {
            username: this.state.username,
            password: this.state.password
        }

        axios
        .post(AUTH_LOGIN, data)
        .then(res => {
            localStorage.setItem('userToken', JSON.stringify(res.data))
            this.setState({
                loading: false
            })
            window.location.reload()
        })
        .catch(err => console.log(err)) 
    }

    render() {

        return (
            <div className="">
                <div className="container">
                    <div className="d-table w-100 h-100">
                        <div className="d-table-cell align-middle" style={{height:'600px'}}>
                            <div className="col-12 col-sm-6 col-md-4 mx-auto">
                                <form onSubmit={this.handleOnSubmit.bind(this)} autoComplete="off">
                                    <div className="form-group">
                                        <input 
                                            type="text"
                                            name="username"
                                            placeholder="Username"
                                            className="form-control shadow-none rounded-0"
                                            value={this.state.username}
                                            onChange={this.handleOnChange}
                                            required
                                            style={{
                                                height: '50px'
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            className="form-control shadow-none rounded-0"
                                            value={this.state.password}
                                            onChange={this.handleOnChange}
                                            required
                                            style={{
                                                height: '50px'
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button 
                                            className="w-100 btn btn-dark text-white p-3 border-0 shadow-sm rounded-0"
                                        >
                                            Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>  
                </div>

                {
                    this.state.loading && 
                    <FullLoading />
                }

            </div>
        )
    }
}

export default withRouter(Login)