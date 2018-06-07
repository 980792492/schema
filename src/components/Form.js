import React, { Component } from 'react'
import assign from 'object-assign'
import fetch from 'isomorphic-fetch'
import API from '../utils/api'
import findIndex from 'lodash/findIndex'
import {Row, Col, Form, Input, Button } from 'antd'
import Style from './form.less'
const FormItem = Form.Item

class FormBox extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      Api: undefined,
      formdata: {},
      disabled: false
    }
  }
  componentWillMount () {
    Style.use()
  }
  render () {
    return (
      <div className='form-wrapper'>
      <Form >
          {this.renderFormJSX(this.state.renderForm)}
        <Row>
          <Col>
            <div className='action-wrapper'>
              <p className='port-wrap'>
                  <Input value={this.state.Api} disabled={true} placeholder='请选择接口地址' onChange={this.apiChange.bind(this)} />
              </p>
              <p className='button-wrap'>
                <Button type='primary' 
                  disabled={this.state.disabled}
                  onClick={this.handleSubmit.bind(this)}
                  >提交
                </Button>
              </p>
            </div>
          </Col>
        </Row>
        </Form>
      </div>
    )
  }
  apiChange (e) {   // 接口地址更改
    this.setState({
      disabled: false,
      Api: e
    })
    console.log('API', API)
    console.log(e)
    let index  = findIndex(API, {key: e})
    console.log(index)
    let urlObj = {}
    if (index > -1) {
      urlObj = API[index]
    } else {
      this.setState({
        disabled: true,
      })
      // return alert('暂无该接口对应jsonSchema文件')
    }
    let requestJson = urlObj.value.request
    fetch(requestJson + '?data=' + encodeURIComponent(JSON.stringify({})))
      .then( (res) => {
        return res.json()
      })
      .then((result) => {
        this.setState({
         renderForm : result
        })
      })
    this.props.changeVerify()
    this.setState({ 
      disabled: false,
    })      
  }
  renderFormJSX (renderForm) {   // 渲染form
    const formItemLayout = {
      labelCol: { span: 7},
      wrapperCol: { span: 16 }
    }
    return (
      <Row>
        {(renderForm || []).map((item,index) => (
          <Col className='col-item' span={8} key={item.argument}>
            <FormItem className='col-item-form' {...formItemLayout} label={item.label}>
              <Input onChange={this.inputChange.bind(this, item.argument)} type={item.type} placeholder={`输入${item.label}`} />         
            </FormItem>
          </Col>
        ) )}
      </Row>
      ) 
  }

  inputChange (key, e) {  // 输入input的change
    let value = e.target.value
    let values = this.state.formdata   // 获取form的values
    this.setState({
      disabled: false,
      formdata: assign({}, values, {[key]: value})
    })
    this.props.changeVerify()
  }
  handleSubmit () {   // form提交
    let params = this.state.formdata
    let api = this.state.Api
    if (api) {
      this.setState({
        disabled: true
      })
      this.props.handleSubmit(api, params)
    } else {
      return alert('请先填写接口地址')
    }
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.requestApi !== nextProps.requestApi) {
      this.apiChange(nextProps.requestApi)
    }
  }
  componentWillUnmount () {
    Style.unuse()
  }
}

export default FormBox