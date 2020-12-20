import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div className="py-5 bg-dark">
                <div className="container">
                    <p
                        className="text-white"
                    >
                        &copy; Copyright 2019 - {(new Date().getFullYear())}
                    </p>
                </div>
            </div>
        )
    }
}
