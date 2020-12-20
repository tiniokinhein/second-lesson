import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import LOGO from '../../assets/images/logo.png'
import { COLOR } from '../colors/Color'
import { RiSearchLine } from 'react-icons/ri'

class Header extends Component {

    state = {
        searchText: ''
    }

    handleKeyUp = e => {
        e.preventDefault()

        if(e.key === 'Enter' && e.keyCode === 13) {
            this.handleButtonClick()
        }
    }

    handleButtonClick = () => {

        if(this.state.searchText) {
            const text = this.state.searchText

            this.setState({
                searchText: ''
            })

            this.props.history.push({
                pathname: `/search/result=${text}`,
                state: {
                    searchText: text
                }
            })
        }
    }

    handleOnSubmit = e => e.preventDefault()

    handleLogOut = () => {
        localStorage.removeItem('userToken')
        window.location.reload()
    }

    render() {

        return (
            <div
                style={{
                    background: COLOR.Fourth
                }}
                className="py-3"
            >
                <div className="container">
                    <div className="d-flex align-items-center justify-content-between">
                        <Link
                            to="/"
                        >
                            <img
                                src={LOGO}
                                alt="Easy Peasy"
                                width="50"
                            />
                        </Link>

                        <div className="position-relative">
                            <form 
                                autoComplete="off"
                                className="form-inline my-2 my-lg-0 bg-white rounded-pill" 
                                onSubmit={this.handleOnSubmit}
                            >
                                <input 
                                    className="form-control border-0 rounded-0 shadow-none bg-transparent px-3" 
                                    type="text" 
                                    placeholder="Search"  
                                    name="searchText"
                                    value={this.state.searchText}
                                    onChange={(e) => this.setState({
                                        searchText: e.target.value
                                    })}
                                    onKeyUp={this.handleKeyUp}
                                />
                                <button 
                                    className="btn rounded-0 border-0 shadow-none px-3" 
                                    onClick={this.handleButtonClick}
                                >
                                    <RiSearchLine size="1.5rem" />
                                </button>
                            </form>
                        </div>

                        <div className="">
                            <ul
                                className="m-0 p-0 list-unstyled"
                            >
                                <li
                                    className="d-inline-block"
                                >
                                    <Link
                                        to="/"
                                        className="text-white text-decoration-none px-3"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li
                                    className="d-inline-block"
                                >
                                    <Link
                                        to="/about"
                                        className="text-white text-decoration-none px-3"
                                    >
                                        About
                                    </Link>
                                </li>
                                <li
                                    className="d-inline-block"
                                >
                                    <Link
                                        to="/categories"
                                        className="text-white text-decoration-none px-3"
                                    >
                                        Categories
                                    </Link>
                                </li>
                                <li
                                    className="d-inline-block"
                                >
                                    <Link
                                        to="/contact"
                                        className="text-white text-decoration-none px-3"
                                    >
                                        Contact
                                    </Link>
                                </li>
                                <li
                                    className="d-inline-block text-white"
                                    style={{
                                        cursor: 'pointer'
                                    }}
                                    onClick={this.handleLogOut}
                                >
                                        Logout
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)