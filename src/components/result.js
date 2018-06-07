import React, { Component } from 'react'
import Style from './result.less'

class Result extends Component {
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
      <div className='result-content'>
        <p className='title'>
          校验结果： 
        </p>
        <div className='result'>
          {this.props.valid !== undefined ? this.props.valid ? '正确' : '错误' : '未校验' }
        </div>
      </div>
    )
  }
  componentWillUnmount () {
    Style.Unuse()
  }
}

export default Result
