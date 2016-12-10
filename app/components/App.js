import React, { Component } from 'react'
import { fetchJSON } from '../helpers/fetch'
import { makeCancelable } from '../helpers/promise'
import styles from './App.css'
import img from './icon.png'

class App extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    this.cancelablePromise = makeCancelable(
      fetchJSON('https://www.reddit.com/r/programming.json')
    )

    this.cancelablePromise.promise
      .then(json => {
        const posts = json.data.children.map(item => item.data)
        this.setState({ posts })
      })
      .catch(err => {
        if(err.isCanceled) { console.debug('promise canceled.') }
      })
  }

  componentWillUnmount() {
    this.cancelablePromise.cancel()
  }

  render() {
    return (
      <div className={styles.app}>
        <img src={img}/>
        <ul>
          {this.state.posts.map(post => {
            return (
              <li key={post.id}>
                <a href={post.url}>{post.title}</a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default App
