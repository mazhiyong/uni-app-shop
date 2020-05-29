<template>
	<view class="content">
		<view>
			<!-- 数据为空白页 -->

			<ygc-refresh @onRefresh="loadData(0)" @scrolltolower="loadData(1)" :pullupLoadingType="loadingType">
				<scroll-view class="question-list" scroll-y="true">

					<view v-for="(question,index) in questionList" :key="index" class="question-item">
						<text class="title">{{question.sugestionhelpTitle}}</text>
						<view>
							<text class="tip">是否热门:</text>
							<text class="hot">{{question.dictTheme}}</text>
						</view>
					</view>
				</scroll-view>
			</ygc-refresh>

		</view>
	</view>

</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import ygcRefresh from '@/components/ygc-refresh/ygc-refresh.vue';
	import empty from "@/components/empty";
	import Json from '@/Json';
	export default {
		components: {
			uniLoadMore,
			ygcRefresh,
			empty
		},
		data() {
			return {
				maxNumber: 0,
				currentIndex: 0,
				loadingType: 'more',
				questionList: [],
			}
		},
		onLoad(options) {
			this.loadData(0)
		},

		methods: {
			//加载数据
			loadData(parm) {
				console.log("网络数据请求")
				if (parm === 0) {
					console.log("下拉刷新数据")
					this.currentIndex = 0
					this.questionList.length = 0
				} else {
					console.log("上拉加载更多数据")
					if (this.questionList.length < this.maxNumber) {
						this.currentIndex = Number(this.currentIndex) + Number(10)
						this.loadingType = 'loading'
					} else {
						this.loadingType = 'nomore'
						return
					}
				}
				let that = this
				this.$http.get('ac/sugestion/disambiguationList', {
						params: {
							"pageIndex": this.currentIndex + '',
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
						console.log(res.data.data.data)
						this.maxNumber = res.data.data.data.count;
						console.log(this.maxNumber)
						var resultStr = JSON.stringify(res.data.data.data.data)
						var orderList = JSON.parse(resultStr)
						orderList.forEach(item => {
							this.questionList.push(item);
						})
						console.log(this.questionList.length)
						if (this.questionList.length < this.maxNumber) {
							this.loadingType = 'more'
							console.log("加载更多")
						} else {
							this.loadingType = 'nomore'
							console.log("没有更多数据")
						}
					})
					.catch(err => {
						//console.log(err);
					});
			}
		}
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
	}

	.question-item {
		left: 30upx;
		bottom: 30upx;
		z-index: 30;
		align-items: center;
		margin: 60upx;

		padding-bottom: 15upx;
		padding-left: 15upx;
		padding-right: 5upx;
		padding-top: 15upx;
		background: rgba(255, 255, 255, .9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
		border-radius: 16upx;
	}

	.title {
		flex: 1;
		font-size: $font-base + 2upx;
		color: $font-color-dark;
		overflow: hidden;
		word-break: break-all;
		/* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;
		/* 超出部分省略号 */
		display: -webkit-box;
		/** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		/** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 2;
		/** 显示的行数 **/
	}

	.tip {
		flex: 1;
		font-size: $font-base;
		color: $font-color-dark;
		margin-right: 10upx;
	}

	.hot {
		flex: 1;
		font-size: $font-base;
		color: #0055FF;
		margin-right: 10upx;
	}

	.list-cell {
		display: flex;
		align-items: baseline;
		padding: 20upx $page-row-spacing;
		line-height: 60upx;
		position: relative;
		background: #fff;
		justify-content: center;

		&.log-out-btn {
			margin-top: 40upx;

			.cell-tit {
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		&.m-t {
			margin-top: 16upx;
		}

		.cell-more {
			align-self: baseline;
			font-size: $font-lg;
			color: $font-color-light;
			margin-left: 10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: $font-base;
			color: $font-color-light;
		}

		switch {
			transform: translateX(16upx) scale(.84);
		}
	}
</style>
