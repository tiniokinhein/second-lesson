import React, { Component } from 'react'
import { COLOR } from '../components/colors/Color'
import axios from 'axios'
import Layout from '../components/layout/Layout'

const URL = 'https://yourdomain.com/form/contact.php'

export default class Contact extends Component {

    state = {
        name: '',
        email: '',
        message: '',
        error: null,
        mailSent: false
    }
    

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleOnSubmit = (e) => {
        e.preventDefault()

        axios({
            method: 'post',
            url: `${URL}`,
            headers: {
                'content-type': 'application/json'
            },
            data: this.state
        })
        .then(result => {
            this.setState({
                mailSent: result.data.sent
            })
        })
        .catch(err => {
            this.setState({
                error: err.message
            })
        })
        
    }

    resetForm = () => {
        this.setState({
            name: '',
            email: '',
            message: '',
            error: null,
            mailSent: false
        })
    }

    render() {
        return (
            <Layout>
                <div className="pt-5">
                    <div className="container">
                        <form
                            onSubmit={this.handleOnSubmit.bind(this)}
                        >
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    value={this.state.name}
                                    onChange={this.handleOnChange}
                                    name="name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.handleOnChange}
                                    name="email"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    className="form-control"
                                    placeholder="Message"
                                    rows="3"
                                    value={this.state.message}
                                    onChange={this.handleOnChange}
                                    name="message"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <button
                                    className="btn text-white rounded-sm border-0 py-2 px-5 shadow"
                                    style={{
                                        background: COLOR.Fourth
                                    }}
                                >
                                    Send Message
                                </button>
                            </div>

                            {
                                this.state.error &&
                                <p>
                                    You got error! Try again
                                    <button
                                        onClick={this.resetForm}
                                    >
                                        Close
                                    </button>
                                </p>
                            }

                            {
                                this.state.mailSent &&
                                <p>Send successfully!</p>
                            }

                        </form>
                    </div>
                </div>
            </Layout>
        )
    }
}
