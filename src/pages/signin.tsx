import * as React from 'react'
import Router from 'next/router'
import { Row, Col, Button, Form, Icon, Input } from 'antd'
import Title from '../components/Title'
import Head from '../components/Head'
import { IFormItem, FormItems, AntdFormAndRouterProps } from '../interfaces'
import { VIEWSTITLE } from '../config'
import { post } from '../fetch'
import API from '../server/graphql/api'

const FormItem = Form.Item

interface ISignInState {
  formItems: FormItems
}

class SignIn extends React.Component<AntdFormAndRouterProps, ISignInState> {
  constructor(props: AntdFormAndRouterProps) {
    super(props)
    this.state = {
      formItems: [
        {
          key: 'username',
          type: 'text',
          reqMessage: 'Please input your username!',
          icon: 'user',
          placeholder: 'Username'
        },
        {
          key: 'password',
          type: 'password',
          reqMessage: 'Please input your Password!',
          icon: 'lock',
          placeholder: 'Password'
        }
      ]
    }
  }

  public handleSubmit = (event: React.FormEvent<Element>) => {
    event.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        post({
          operationName: API.LOGIN,
          query: `query ${API.LOGIN} {
            code
            message
            token
          }`,
          variables: values,
        })
          .then(res => {
            const { token } = res
            sessionStorage.setItem('token', token)
            Router.push('/')
          })
      }
    })
  }

  public goRegister = () => {
    Router.push('/register')
  }

  public render() {
    const { getFieldDecorator } = this.props.form
    const { formItems } = this.state
    return (
      <React.Fragment>
        <Head />
        <Row gutter={8}>
          <Col span={8} />
          <Col span={8}>
            <Title title={VIEWSTITLE.SIGNIN} />
            <Form onSubmit={this.handleSubmit}>
              {
                formItems.map((value: IFormItem, index: number) => {
                  const { key, type, reqMessage, icon, placeholder } = value
                  return (
                    <FormItem key={index}>
                      {
                        getFieldDecorator(key, {
                          rules: [{ required: true, message: reqMessage }],
                        })(
                          <Input prefix={<Icon type={icon as string} />} placeholder={placeholder} type={type} />
                        )
                      }
                    </FormItem>
                  )
                })
              }
              <Button type="primary" htmlType="submit">Sign in</Button>
              <p>Or <a onClick={this.goRegister}>register now!</a></p>
            </Form>
          </Col>
          <Col span={8} />
        </Row>
      </React.Fragment>
    )
  }
}

export default Form.create()(SignIn)
