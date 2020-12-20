import React, { Component } from 'react'
import Slider from '../components/posts/Slider'
import Layout from '../components/layout/Layout'

export default class Home extends Component {

    render() {

        return (
            <Layout>
                <Slider />
            </Layout>
        )
    }
}
