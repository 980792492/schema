import React, { Component } from 'react'
import { Layout } from 'antd'
import Menu from 'components/menu'
import Top from 'components/top'
import Style from './App.less'

import Schems from './schema'
const { Header, Content } = Layout

class App extends Component {
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
      <div className='App clearfix'>
        <div className='menu-wrapper'>
          <Menu
            changeApi={this.handleChangeApi.bind(this)}
          />
        </div>
        <Layout>
          <Header style={{background: '#fff'}} >
            <Top />
          </Header>
          <Content className='content-wrapper'>
            <Schems
              requestApi={this.state.requestApi}
            />
          </Content>
        </Layout>
      </div>
    )
  }
  handleChangeApi (api) {
    this.setState({
      requestApi: api
    })
  }
}

export default App
