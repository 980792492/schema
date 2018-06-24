import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import API from 'utils/API'
import findIndex from 'lodash/findIndex'
import { Table } from 'antd'

class Raprequest extends Component {
  constructor (props) {
    super(props)
    this.state = {
      Api: this.props.requestApi,
      formdata: {},
      disabled: false
    }
  }
  componentWillMount () {
    // Style.use()
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.requestApi !== nextProps.requestApi) {
      this.apiChange(nextProps.requestApi)
    }
  }
  componentWillUnmount () {
    // Style.unuse()
  }
  render () {
    console.log(this.state.requestList)
    const columns = [{
      title: '变量名',
      dataIndex: 'argument'
    }, {
      title: '含义',
      dataIndex: 'label'
    }, {
      title: '类型',
      dataIndex: 'type'
    }]
    return (
      <div className='rap-request-wrapper'>
        <div>request</div>
        <div className='rap-request'>
          <Table
            columns={columns}
            dataSource={this.state.requestList}
            pagination={false}
            bordered
          />
        </div>
      </div>
    )
  }
  apiChange (requestApi) {
    let index = findIndex(API, {key: requestApi})
    let urlObj = {}
    if (index > -1) {
      urlObj = API[index]
    }
    let requestJson = urlObj.value.request
    fetch(requestJson + '?data=' + encodeURIComponent(JSON.stringify({})))
      .then((res) => {
        return res.json()
      })
      .then((result) => {
        this.setState({
          requestList: result
        })
      })
  }
}

export default Raprequest
