import React, { Component } from 'react'
import FormBox from './components/Form'
import Result from './components/result'
import fetch from 'isomorphic-fetch'
import Style from './schems.less'
import findIndex from 'lodash/findIndex'
import API from './utils/api'
import djv from 'djv'
const env = djv({
  version: 'draft-04', // use json-schema draft-06
  formats: { /*...*/ }, // custom formats @see #addFormat
  errorHandler: () => {}, // custom error handler, @see #setErrorHandler
});

class SchemaComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      requestApi: undefined
    }
  }
  componentWillMount () {
    Style.use()
  }
  render () {
    return (
      <div className='schems-content-wrapper'>      
        <FormBox
          requestApi={this.state.requestApi}
          submit={this.handleSubmit.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
          changeVerify={() => {this.setState({valid: undefined})} }          
        />
        <Result 
          valid={this.state.valid}
        />
        <button onClick={this.clickAction.bind(this)}>点击请求post</button>
      </div>
    )
  }
  clickAction () {  // post请求本地json测试
    alert(1)
    fetch('./test.json?data=' + encodeURIComponent(JSON.stringify({})))
      .then((res) => {
        console.log(res)
      })
  }
  handleSubmit (api, params) {
    let url = api
    fetch(url + '?data=' + encodeURIComponent(JSON.stringify(params || {})), {headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }, credentials: 'include'})
      .then((res) => {
        return res.json()
      })
      .then(result => {
        this.verifyResponse(url, result)
      })
    // let url = '/leo/1.0/shopManage/list'  公海列表接口
  }
  verifyResponse (url, result) {
    let index  = findIndex(API, {key: url})
    let urlObj = {}
    if (index > -1) {
      urlObj = API[index]
    }
    let responseJson = urlObj.value.response    
    fetch(responseJson + '?data=' + encodeURIComponent(JSON.stringify({})))
    .then( (res) => {
      if (res.ok) {
        return res.json()
      }
    })
    .then((resultJson) => {
      console.log(resultJson)
      //  此处校验接口返回结果是否匹配jsonchema文件
      // console.log(resultJson)  //  json文件数据
      // console.log(result)      接口数据
      // let valid = tv4.validate(result, resultJson)
      // if(!valid) {
      //   console.log(tv4.error)
      // }
      env.addSchema('test', resultJson)
      let valid = env.validate('test', result);
      console.log(valid)
      this.setState({
        // valid: valid
      })
      
    })
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
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