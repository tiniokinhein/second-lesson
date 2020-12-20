import React, { Component } from 'react'
import axios from 'axios'
import { EMB, POSTS_URL } from '../config/apiService'
import { Link, withRouter } from 'react-router-dom'
import ClockLoader from "react-spinners/ClockLoader"
import Layout from '../components/layout/Layout'

class Search extends Component {

    state = {
        searchText: '',
        posts: [],
        loading: false
    }

    getSearch = () => {

        if(this.props.location.state) {
            const list = this.props.location.state.searchText

            this.setState({
                loading: true
            })

            axios
            .get(POSTS_URL + EMB)
            .then(res => {

                const lists = res.data

                this.setState({
                    searchText: list,
                    posts: lists.filter(fr => 
                        fr.title.rendered.toLowerCase().includes(list.toLowerCase()) ||
                        fr.content.rendered.toLowerCase().includes(list.toLowerCase()) ||
                        fr._embedded['wp:term'][0][0].name.toLowerCase().includes(list.toLowerCase()) 
                    ),
                    loading: false
                })
            })
            .catch(err => console.log(err))
        }

    }

    componentDidMount() {
        this.getSearch()
    }

    componentDidUpdate(prevProps) {
        if(prevProps.location.state.searchText !== this.props.location.state.searchText) {
            this.getSearch()
        }
    }

    render() {

        const { searchText , posts , loading } = this.state

        const titleResult = (
            <h4>Search Result: {searchText}</h4>
        )

        const dataLists = posts.length ? (
            posts.map(p => (
                <div key={p.id}>
                    <div className="d-flex mb-3">
                        <img 
                            src={p._embedded['wp:featuredmedia'][0].source_url}
                            alt=""
                            width="50"
                        />
                        <h4 className="pl-3"><Link to={`/post/${p.slug}`}>{p.title.rendered}</Link></h4>
                    </div>
                </div>
            ))   
        ) : <p>Not Founding</p>


        return loading ? (
            <Layout>
                <div 
                    className="mx-auto container d-flex justify-content-center"
                    style={{
                        paddingTop: '10rem',
                        paddingBottom: '10rem'
                    }}
                >
                    <ClockLoader size={50} />
                </div>
            </Layout>
        ) : (
            <Layout>
                <div className="py-5">
                    <div className="container">
                        {titleResult}
                        {dataLists}
                    </div>
                </div>
            </Layout>
        )
    }
}


export default withRouter(Search)