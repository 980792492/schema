import React, { Component } from 'react'
import FormBox from 'components/Form'
import Result from 'components/result'
import fetch from 'isomorphic-fetch'
import Style from './schems.less'
import findIndex from 'lodash/findIndex'
import API from 'utils/API'
import { TAB_CONF } from 'constants/index'
import djv from 'djv'
import { Button } from 'antd'
import Raprequest from 'components/rap/Request'
import Rapresponse from 'components/rap/Response'

const env = djv({
  version: 'draft-04', // use json-schema draft-06
  formats: { /* ... */ }, // custom formats @see #addFormat
  errorHandler: () => {} // custom error handler, @see #setErrorHandler
})

class SchemaComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      requestApi: undefined,
      showTab: '1'
    }
  }

  componentWillMount () {
    Style.use()
  }

  render () {
    return (
      <div className='schems-content-wrapper'>
        <div className='tab-action-wrapper' >
          {TAB_CONF.map((item, index) => (
            <Button
              onClick={this.changeTabActive.bind(this, item)}
              className='button-item'
              type={item.key === this.state.showTab ? 'primary' : ''
              } key={index}>{item.value}</Button>
          ))}
        </div>
        <div className='schema-content'>
          {this.state.showTab === '1' && this.renderRAPJSX()}
          {this.state.showTab === '2' && this.renderVerifyJSX()}
          {this.state.showTab === '3' && this.renderOnlineJSX()}
        </div>
      </div>
    )
  }
  changeTabActive (item) {
    const key = item.key
    this.setState({
      showTab: key
    })
  }
  renderRAPJSX () { //  rap
    return (
      <div className='rap-wrapper'>
        <div> {`接口地址：${this.state.requestApi || '暂无'}`}</div>
        <Raprequest
          requestApi={this.state.requestApi}
        />
        <Rapresponse
        />
      </div>
    )
  }

  renderVerifyJSX () { //  构造校验部分
    return (
      <div className='verify-wapper'>
        <FormBox
          requestApi={this.state.requestApi}
          submit={this.handleSubmit.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
          changeVerify={() => { this.setState({valid: undefined}) }}
        />
        <Result
          valid={this.state.valid}
        />
      </div>
    )
  }

  renderOnlineJSX () { // 线上测试
    return (
      <div className='online-wrapper'>
      2233
      </div>
    )
  }

  handleSubmit (api, params) {
    let url = api
    fetch(url + '?data=' + encodeURIComponent(JSON.stringify(params || {})), {headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    credentials: 'include'})
      .then((res) => {
        return res.json()
      })
      .then(result => {
        this.verifyResponse(url, result)
      })
    // let url = '/leo/1.0/shopManage/list'  公海列表接口
  }
  verifyResponse (url, result) {
    let index = findIndex(API, {key: url})
    let urlObj = {}
    if (index > -1) {
      urlObj = API[index]
    }
    let responseJson = urlObj.value.response
    fetch(responseJson + '?data=' + encodeURIComponent(JSON.stringify({})))
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then((resultJson) => {
        //  此处校验接口返回结果是否匹配jsonchema文件
        // console.log(resultJson)  //  json文件数据
        // console.log(result)      接口数据
        // let valid = tv4.validate(result, resultJson)
        // if(!valid) {
        //   console.log(tv4.error)
        // }
        env.addSchema('test', resultJson)
        let valid = env.validate('test', result)
        console.log(valid)
        this.setState({
        // valid: valid
        })
      })
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.requestApi !== nextProps.requestApi) {
      this.setState({
        requestApi: nextProps.requestApi
      })
    }
  }
  componentWillUnmount () {
    Style.unuse()
  }
}

export default SchemaComponent
