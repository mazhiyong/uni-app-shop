<template>
	<view class="content">
		
		<view>
			<button @click="refreshToken">刷新Token</button>
			<button @click="getRequest">Get请求</button>
			<button @click="postRequest">Post请求</button>
			<button @click="uploadImage">上传图片</button>
			<button @click="downloadImage">下载图片</button>
		</view>
	</view>
</template>

	
	
<script>
	import {
	    mapMutations  
	} from 'vuex';
	
	import {
		test
	} from '../../utils/luch-request/service.js' // 局部引入  网络请求js
	export default {
		data() {
			return {
				title: 'Good morninig'
			}
		},
	
		onLoad() {
			//this.globalGetData();
			//this.localGetData();
		},
			
		methods: {
			refreshToken(){
				
			},
			
			getRequest() {
				let that = this
				this.$http.get('ac/sugestion/disambiguationList', {
						params: {
							"pageIndex": "0",
							"cType": "D.ADMIN.WEB",
							"pageSize": "10"
						},
	
						getTask: (task, options) => {
							setTimeout(() => {
								task.abort();
							}, 1000);
							console.log(options);
						}
					})
					.then(res => {
						console.log(res);
					})
					.catch(err => {
						console.log(err);
					});
			},
	
			postRequest() {
				let that = this
				this.$http.post('ac/sugestion/disambiguationList', {}, {
						params: {
							"pageIndex": "0",
							"cType": "D.ADMIN.WEB",
							"pageSize": "10"
						},
						getTask: (task, options) => {
							setTimeout(() => {
								task.abort();
							}, 1000);
							console.log(options);
						}
					})
					.then(res => {
						console.log(res)
					})
					.catch(err => {
						console.log(err)
					});
			},
			uploadImage() {
				let that = this;
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(res);
						test
							.upload('/file/upload', {
								params: {},
								filePath: res.tempFilePaths[0],
	
								getTask: (task, options) => {
									setTimeout(() => {
										task.abort();
									}, 30 * 1000);
									task.onProgressUpdate((res) => {
										console.log('上传进度' + res.progress);
										console.log('已经上传的数据长度' + res.totalBytesSent);
										console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
	
										// 测试条件，取消上传任务。
										// if (res.progress > 50) {
										//   uploadTask.abort();
										// }
									});
								}
							})
							.then(res => {
								console.log(res);
							})
							.catch(err => {
								console.log(err);
							});
					}
				});
			},
	
			downloadImage() {
				test.download('/file/download', {
						params: {
							 "action": "view",
							 "path": "2020/05/14/15894492779370460.apk"
						},
						getTask: (task, options) => {
							task.onProgressUpdate((res) => {
								console.log('下载进度' + res.progress);
								console.log('已经下载的数据长度' + res.totalBytesWritten);
								console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
						
							});
						}
	
	
					})
					.then(res => {
						console.log(res);
					})
					.catch(err => {
						console.log(err);
					});
	
			}
	
	
			/**
			 * 全局引入的方式获取数据
			 */
			/* globalGetData() {
				console.log('全局引入网络请求');
				this.$http
					.post(
						'/api/flyloanmain/list', {
							id: '111'
						}, {
							params: {
								page: 1,
								pageSize: 15
							},
							getTask: (task, options) => {
								setTimeout(() => {
									task.abort();
								}, 1000);
								console.log(options);
							}
						}
					)
					.then(res => {
						var responseResult = JSON.stringify(res.data);
						console.log('网络请求返回结果:' + responseResult);
					})
					.catch(err => {
						console.log(err);
					});
			},
			 */
			/**
			 * 局部引入的方式获取数据
			 */
			/* localGetData() {
				console.log('局部引入网络请求');
				test
					.get('/user/list', { params: { id: '111' } })
					.then(res => {})
					.catch(err => {});
			} */
		}
	};
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 45upx;
		color: #0055ff;
	}
</style>
