import React, { Component } from 'react'
import axios from 'axios'
import { POSTS_URL } from '../config/apiService'
import { Link, withRouter } from 'react-router-dom'
import { COLOR } from '../components/colors/Color'
import Layout from '../components/layout/Layout'

class Post extends Component {

    state = {
        p: null,
        posts: [],
        loading: false
    }

    getPost = () => {
        const slug = this.props.match.params.slug

        this.setState({
            loading: true
        })

        axios
        .get(POSTS_URL + `?slug=${slug}&_embed=1`)
        .then(res => {
            this.setState({
                p: res.data[0],
                loading: false
            })
        })
        .catch(err => console.log(err))

        window.scrollTo(0,0)
    }

    getPosts = () => {
        axios
        .get(POSTS_URL + '?_embed=1')
        .then(res => {
            this.setState({
                posts: res.data
            })
        })
        .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getPost()
        this.getPosts()
    }

    componentDidUpdate(prevProps) {
        const prev = prevProps.match.params.slug
        const next = this.props.match.params.slug
        if(prev !== next) {
            this.getPost()
        }
    }



    render() {

        const { p , posts , loading } = this.state 

        return (
            <Layout>
                <div>
                    <div className="container">
                        {
                            loading &&

                            <div 
                                className="position-fixed"
                                style={{
                                    left: 0,
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    textAlign: 'center',
                                    zIndex: 999999,
                                    background: COLOR.Second
                                }}
                            >
                                <div 
                                    className="d-table w-100 h-100"
                                >
                                    <div
                                        className="d-table-cell align-middle"
                                    >
                                        <p className="text-white">Loading ...</p>
                                    </div>
                                </div>
                            </div>

                        }

                        {
                            p ? (
                                <div key={p.id}>
                                    <img
                                        src={p._embedded['wp:featuredmedia'][0].source_url}
                                        alt=""
                                        width="100%"
                                    />
                                    <h4 className="pt-3 pb-3 mb-0">{p.title.rendered}</h4>
                                    <p
                                        dangerouslySetInnerHTML={{__html: p.content.rendered}}
                                    />

                                    <div>
                                        <small>
                                            Categories -
                                            {
                                                p._embedded['wp:term'][0].length <= 1 ? (
                                                    <button
                                                        onClick={() => {
                                                            this.props.history.push({
                                                                pathname: `/category/${p._embedded['wp:term'][0][0].id}`,
                                                                state: {
                                                                    title: p._embedded['wp:term'][0][0].name
                                                                }
                                                            })
                                                        }}
                                                        className="btn py-0 border-0 rounded-0 shadow-none px-2 text-info"
                                                    >
                                                        {p._embedded['wp:term'][0][0].name}
                                                    </button>
                                                ) : (
                                                    p._embedded['wp:term'][0].map(m => (
                                                        <button
                                                            onClick={() => {
                                                                this.props.history.push({
                                                                    pathname: `/category/${m.id}`,
                                                                    state: {
                                                                        title: m.name
                                                                    }
                                                                })
                                                            }}
                                                            key={m.id}
                                                            className="btn py-0 border-0 rounded-0 shadow-none cat-links px-2 text-info"
                                                        >
                                                            {m.name}
                                                        </button>
                                                    ))
                                                )
                                            }
                                        </small>
                                    </div>
                                </div>
                            ) : null
                        }

                        <div className="mt-5 pt-5 border-top">
                            <h4>Related Posts</h4>
                            <div className="row">
                                {
                                    posts
                                    .filter(f => (p ? p.id : null) !== f.id)
                                    .slice(0,4)
                                    .map((p) => (
                                        <div key={p.id} className="col-12 col-sm-6 col-md-3">
                                            <Link
                                                to={`/post/${p.slug}`}
                                                className="text-decoration-none"
                                            >
                                                <img
                                                    src={p._embedded['wp:featuredmedia'][0].source_url}
                                                    alt=""
                                                    width="100%"
                                                />
                                            </Link>
                                            <h4
                                                className="text-truncate"
                                                style={{
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => this.props.history.push(`/post/${p.slug}`)}
                                            >{p.title.rendered}</h4>
                                            <p
                                                dangerouslySetInnerHTML={{__html: p.excerpt.rendered.slice(0,46)}}
                                            />
                                            <Link
                                                to={`/post/${p.slug}`}
                                                className="text-info text-decoration-none"
                                            >
                                                Read More
                                            </Link>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default withRouter(Post)