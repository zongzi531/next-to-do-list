import * as React from 'react'
import Router from 'next/router'
import { Row, Col, Button, notification, message, Form, Icon, Input } from 'antd'
import Title from '../components/Title'
import Head from '../components/Head'
import { IFormItem, FormItems, AntdFormAndRouterProps } from '../interfaces'
import { VIEWSTITLE, NOTE } from '../config'
import { post } from '../fetch'
import API from '../server/graphql/api'

const FormItem = Form.Item

interface IRegisterState {
  formItems: FormItems
}

class Register extends React.Component<AntdFormAndRouterProps, IRegisterState> {
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
          operationName: API.REGIST,
          query: `mutation ${API.REGIST} {
            code
            message
          }`,
          variables: values,
        })
          .then(res => {
            message.info(res.message)
          })
      }
    })
  }

  public goSignin = () => {
    Router.push('/signin')
  }

  public componentDidMount() {
    notification.warning({
      duration: null,
      message: 'Warning Info',
      description: NOTE.REGISTER,
    })
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
            <Title title={VIEWSTITLE.REGISTER}/>
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
              <Button type="primary" htmlType="submit">Register</Button>
              <p>Or <a onClick={this.goSignin}>sign in now!</a></p>
            </Form>
          </Col>
          <Col span={8} />
        </Row>
      </React.Fragment>
    )
  }
}

export default Form.create()(Register)
