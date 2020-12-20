import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Default from './pages/Default'

import './assets/css/style.css'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import Post from './pages/Post'
import Contact from './pages/Contact'
import Category from './pages/Category'
import Categories from './pages/Categories'
import Search from './pages/Search'
import Login from './pages/Login'
import FullLoading from './components/loading/FullLoading'


class App extends React.Component {

  state = {
    authUser: false,
    loading: true
  }

  componentDidMount() {
    const tempToken = JSON.parse(localStorage.getItem('userToken'))
    const user = tempToken ? tempToken.token : null

    if(user) {
      this.setState({
        authUser: true,
        loading: false
      })
    } else {
      this.setState({
        authUser: false,
        loading: false
      })
    }
  }

  render() {

    const { authUser , loading } = this.state

    return loading ? <FullLoading /> : (
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />}/>

          
          <Route path="/search/result=:text" render={() => authUser ? <Search /> : <Redirect to="/login" />} />
          <Route path="/post/:slug"  render={() => authUser ? <Post /> : <Redirect to="/login" />} />
          <Route path="/category/:id" render={() => authUser ? <Category /> : <Redirect to="/login" />} />

          <Route path="/login" render={() => !authUser ? <Login /> : <Redirect to='/home' />} />
          <Route path="/home" render={() => authUser ? <Home /> : <Redirect to="/login" />} />
          <Route path="/about" render={() => authUser ? <About /> : <Redirect to="/login" />} />
          <Route path="/contact" render={() => authUser ? <Contact /> : <Redirect to="/login" />} />
          <Route path="/categories" render={() => authUser ? <Categories /> : <Redirect to="/login" />} />
          <Route render={() => authUser ? <Default /> : <Redirect to="/login" />} />
        </Switch>
      </Router>
    )
  }
}


export default App
