import React, { Component } from 'react'
import { connect } from 'react-redux'

class Lesson extends Component {
  
  render() {
    return (
      <div>Lesson</div>
    )
  }
}

export default connect()(Lesson)
