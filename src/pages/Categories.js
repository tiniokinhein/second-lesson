import React, { Component } from 'react'
import axios from 'axios'
import { CATEGORIES_URL, EMB } from '../config/apiService'
import { withRouter } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import FullLoading from '../components/loading/FullLoading'

class Categories extends Component {

    state = {
        items: [],
        loading: false
    }

    getItems = () => {
        this.setState({
            loading: true
        })

        axios
        .get(CATEGORIES_URL + EMB)
        .then(res => {
            this.setState({
                items: res.data,
                loading: false
            })
        })
        .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getItems()
        window.scrollTo(0,0)
    }


    render() {

        const { items , loading } = this.state

        const lists = items.length ? (
            <div className="row">
                {
                    items.sort((a,b) => {
                        if(a.name > b.name) return -1  

                        return 0                  
                    }).map(p => (
                        <div 
                            key={p.id}
                            className="col-12 col-sm-6 col-md-3 mb-3"
                        >
                            <div className="shadow rounded overflow-hidden position-relative">
                                <img
                                    src={p.acf.category_images}
                                    alt=""
                                    className="w-100"
                                    style={{
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => {
                                        this.props.history.push({
                                            pathname: `/category/${p.id}`,
                                            state: {
                                                title: p.name
                                            }
                                        })
                                    }}
                                />
                                <div 
                                    className="position-absolute"
                                    style={{
                                        bottom: '15px',
                                        left: '15px',
                                        right: '15px'
                                    }}
                                >
                                    <button
                                        onClick={() => {
                                            this.props.history.push({
                                                pathname: `/category/${p.id}`,
                                                state: {
                                                    title: p.name
                                                }
                                            })
                                        }}

                                        className="btn rounded-0 border-0 shadow-none p-0 text-white"
                                    >
                                        {p.name}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        ) : null

        return (
            <Layout>
                <div className="py-5 bg-light">
                    <div className="container">
                        <h4 className="mb-4">Categories</h4>
                        {
                            loading ? <FullLoading /> : lists
                        }
                    </div>
            </div>
            </Layout>
        )
    }
}

export default withRouter(Categories)