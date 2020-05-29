import {Request} from '../../store/index.js'

const test = new Request() //创建一个请求  局部使用
const getTokenStorage = () => {
	let token = ''
	try{
		//从缓存中获取token
		token = uni.getStorageSync('token')
	}catch(e){
		//TODO handle the exception
	}
	return token
}
test.setConfig((config) => { /* 设置全局配置 */
  config.baseUrl = 'https://ufileuat.niceloo.com/api'
  config.header = {
    ...config.header,
    //a: 1, // 演示
    //b: 2 // 演示
  }
  return config
})

test.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
  config.header = {
    ...config.header,
    //a: 3 // 演示
  }
  /*
  if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
    cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
  }
  */
  return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
test.validateStatus = (statusCode) => {
  return statusCode === 200
}

test.interceptor.response((response) => { /* 请求之后拦截器 */
  if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
    return Promise.reject(response)
  }
  return response
}, (response) => { // 请求错误做点什么
  return response
})


const http = new Request()  //全局使用
http.setConfig((config) => { /* 设置全局配置 */
  config.baseUrl = 'http://112.124.46.173:7200/api' /* 根域名不同 */
  config.header = {
    ...config.header,
    //a: 1, // 演示
    //b: 2 // 演示
  }
  return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
// 有默认，非必写
http.validateStatus = (statusCode) => {
  return statusCode === 200
}

http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
  config.header = {
    ...config.header,
    token: getTokenStorage()
  }
  /*
  if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
    cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
  }
  */
  return config
})

// 必须使用异步函数，注意
http.interceptor.response(async (response) => { /* 请求之后拦截器 */
  // if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
  //   return Promise.reject(response)
  // }
  return response
}, (response) => { // 请求错误做点什么
  console.log(response);
  return response
})

export {
  http,
  test
}
