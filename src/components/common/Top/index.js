import React, { Component } from 'react'
import { Avatar } from 'antd'
import history from '../../../utils/history'
import Style from './index.less'
class Top extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  } 
  componentWillMount () {
    Style.use()
  }
  render () {
    return (
      <div className='header-top'>
        <a className='user-icon-wrapper'>
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </a>
      </div>
    )
  }
  goback () {
    history.goBack()
  }
}
export default Top