import React, { Component } from 'react'
import { POSTS_URL , EMB } from '../../config/apiService'
import axios from 'axios'
import Sliders from "react-slick"
import { COLOR } from '../colors/Color'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

export default class Slider extends Component {

    state = {
        sliders: []
    }

    getSliders = () => {
        axios
        .get(POSTS_URL + EMB)
        .then(res => {
            this.setState({
                sliders: res.data
            })
        })
        .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getSliders()
    }

    render() {

        const { sliders } = this.state

        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000
        }

        return (
            <div>
                <Sliders {...settings}>
                    {
                        sliders.map((l,index) => (
                            <div key={index} className="position-relative">
                                <img 
                                    src={l._embedded['wp:featuredmedia'][0].source_url} 
                                    alt="" 
                                    width="100%" 
                                    style={{
                                        height: '500px',
                                        objectFit: 'cover'
                                    }}
                                />
                                <div
                                    className="position-absolute"
                                    style={{
                                        left: 0,
                                        right: 0,
                                        bottom: '50px',
                                        zIndex: 999999999
                                    }}
                                >
                                    <div className="container">
                                        <div className="col-12 col-sm-8 col-md-6 px-0">
                                            <small className="text-white">
                                                <Moment format="dddd, MMMM YYYY, h:mm:ss a">{l.data}</Moment>
                                            </small>
                                            <h4
                                                className="text-uppercase mb-4"
                                                style={{
                                                    color: COLOR.Second,
                                                    fontSize: '2.5rem',
                                                    fontWeight: 900,
                                                    lineHeight: '1.2'
                                                }}
                                            >{l.title.rendered}</h4>
                                            <Link
                                                to={`/post/${l.slug}`}
                                                className="text-decoration-none text-white px-5 py-2 rounded-pill shadow d-inline-block"
                                                style={{
                                                    fontSize: '1.1rem',
                                                    background: COLOR.Second
                                                }}
                                            >
                                                Read More
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </Sliders>
            </div>
        )
    }
}
