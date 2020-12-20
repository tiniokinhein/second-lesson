import React, { Component } from 'react'
import axios from 'axios'
import { POSTS_URL } from '../config/apiService'
import { Link, withRouter } from 'react-router-dom'
import { AiOutlineReload } from 'react-icons/ai'
import Layout from '../components/layout/Layout'
import FullLoading from '../components/loading/FullLoading'

class Category extends Component {

    state = {
        items: [],
        name: undefined,
        sText: '',
        loading: false
    }

    getItems = () => {
        const { id } = this.props.match.params
        const state = this.props.location.state

        this.setState({
            loading: true
        })

        axios
        .get(POSTS_URL + `?_embed=1&categories=${id}`)
        .then(res => {
            this.setState({
                items: res.data,
                loading: false
            })

            if(state) {
                this.setState({
                    name: state.title
                })
            }
        })
        .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getItems()
        window.scrollTo(0,0)
    }

    render() {

        const { items , name } = this.state


        const inputSearch = (
            <div className="d-flex shadow mt-5 mb-4 rounded-lg overflow-hidden">
                <input 
                    type="text"
                    className="form-control shadow-none rounded-0 border-0"
                    style={{
                        height: '50px'
                    }}
                    value={this.state.sText}
                    onChange={(e) => this.setState({
                        sText: e.target.value
                    })}
                    placeholder="Search news"
                />

                {
                    this.state.sText.length >= 3 ? (
                        <button 
                            className="btn btn-dark py-0 px-5 border-0 shadow-none rounded-0"
                            style={{
                                height: '50px'
                            }}
                            onClick={() => this.setState({
                                sText: ''
                            })}
                        >
                            <AiOutlineReload size="1.3rem" color="#fff" />
                        </button>
                    ) : null
                }
            </div>
        )


        const itemLists = items.filter(fr => fr.title.rendered.toLowerCase().indexOf(this.state.sText.toLowerCase()) !== -1 )

        const lists = itemLists.length ? (
            <div className="row">
                {
                    itemLists.map(p => (
                        <div
                            key={p.id}
                            className="col-12 col-sm-6 col-md-3 mb-3"
                        >
                            <div className="shadow rounded overflow-hidden">
                                <img 
                                    src={p._embedded['wp:featuredmedia'][0].source_url}
                                    alt=""
                                    className="w-100"
                                    style={{
                                        height: '220px',
                                        objectFit: 'cover',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => {
                                        this.props.history.push(`/post/${p.slug}`)
                                    }}
                                />
                                <div className="bg-white p-4">
                                    <h4
                                        className="overflow-hidden mb-3"
                                        style={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => {
                                            this.props.history.push(`/post/${p.slug}`)
                                        }}
                                    >
                                        {p.title.rendered}
                                    </h4>
                                    <p 
                                        className="overflow-hidden"
                                        style={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical'
                                        }}
                                        dangerouslySetInnerHTML={{__html: p.excerpt.rendered}} 
                                    />
                                    <Link to={`/post/${p.slug}`} className="text-decoration-none text-dark">Read More</Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        ) : <h1>Not found anything yet!</h1>

        return (
            <Layout>
                <div className="py-5 bg-light">
                    <div className="container">
                        <h4 className="mb-4">
                            {name}
                        </h4>

                        {inputSearch}

                        {
                            this.state.loading ? <FullLoading /> : lists
                        }
                    </div>
                </div>
            </Layout>
        )
    }
}

export default withRouter(Category)