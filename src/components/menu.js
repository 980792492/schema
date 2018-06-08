import React, { Component } from 'react'
import { Layout, Button, Select, Cascader } from 'antd'
import Style from './menu.less'
import findIndex from 'lodash/findIndex'
import fetch from 'isomorphic-fetch'

const { Sider } = Layout

class Container extends Component {
  constructor (props) {
    super(props)
    this.state = {
      menuObj: null
    }
  }
  componentWillMount () {
    Style.use()
  }
  componentDidMount () {
    fetch('./result.json' + '?data=' + encodeURIComponent(JSON.stringify({})))
      .then((res) => {
        return res.json()
      })
      .then((result) => {
        let obj = result.api
        let newObj = {}
        newObj.label = obj.name
        newObj.value = obj.name
        newObj.children = this.traverseAction(obj.apis)
        let menuObj = newObj.children
        this.setState({
          menuObj
        })
      })
  }

  traverseAction (argument) {
    return argument.map((item, index) => {
      let newObj = {}
      newObj.label = item.name
      if (item.apis) {
        newObj.value = item.name
        newObj.children = this.traverseAction(item.apis)
      } else {
        newObj.value = item.value
      }
      return newObj
    })
  }

  render () {
    if (!this.state.menuObj) {
      return <Button shape='circle' loading />
    }
    return (
      <Sider>
        <div className='icon-wrap'>
          <Cascader
            options={this.state.menuObj}
            onChange={this.chooseApiAction.bind(this)}
            placeholder='Please select' />
        </div>
      </Sider>
    )
  }
  chooseApiAction (value) { //  选择接口请求地址操作
    let api = value[2]
    this.props.changeApi(api)
  }
}
export default Container
