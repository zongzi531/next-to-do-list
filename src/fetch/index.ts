import fetch from 'isomorphic-unfetch'
import { message as antdMessage } from 'antd'

const uri = '/graphql'

interface IResponseError extends Error {
  response?: Response
}

interface IResponse {
  code: number
  message: string
  [propName: string]: any
}

const SUCCESS = 200

const checkStatus = (response: Response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error: IResponseError = new Error(response.statusText)
    error.response = response
    throw error
  }
}

const parseJSON = (response: Response) => {
  return response.json()
}

const responseProxy = ({ data: response }: { data: IResponse }) => {
  const { code, message } = response
  if (code !== SUCCESS) {
    antdMessage.warning(message)
    throw response
  }
  return response
}

export const post = (operationName: string, variables: object) => {
  const query = `query ${operationName} {
    code
    message
    token
  }`
  const body = JSON.stringify({
    operationName,
    query,
    variables,
  })
  return fetch(uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body
  })
  .then(checkStatus)
  .then(parseJSON)
  .then(responseProxy)
}
