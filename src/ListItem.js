import React, { Component } from 'react'

export default class ListItem extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.text !== this.props.text  
  }
  
  render() {
    let { text } = this.props
    return <li>{text}</li>
  }
}