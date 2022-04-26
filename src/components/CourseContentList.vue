<template>
  <div class="course-content-list">
    <!-- 下拉刷新组件,包裹在列表外面 -->
    <van-pull-refresh
      v-model="isRefreshing"
      @refresh="onRefresh"
    >
    <!-- 列表组件 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <van-cell
        v-for="item in list"
        :key="item.id">
        <!-- 左侧图片 -->
        <div>
        <!-- 所有课程与已购课程的图片数据属性名不同，检测后使用 -->
          <img :src="item.courseImgUrl || item.image" alt="">
        </div>
        <!-- 课程右侧信息 -->
        <div class="course-info">
          <!-- 名称检测 -->
          <h3 v-text="item.courseName || item.name"></h3>
          <p class="course-preview" v-html="item.previewFirstField"></p>
          <!-- 如果为已购课程，无需显示价格区域 -->
          <p class="price-container" v-if="item.price">
            <span class="course-discount">￥{{ item.discounts }}</span>
            <s class="course-price">￥{{ item.price }}</s>
          </p>
        </div>
      </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// import { getQueryCourses } from '@/services/course'
export default {
  name: 'CourseContentList',
  props: {
    // 用于请求数据的函数
    fetchData: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      // 用来存储数据
      list: [],
      // 是否处于加载中
      loading: false,
      // 是否加载完毕
      finished: false,
      // 数据页数
      currentPage: 1,
      // 下拉刷新状态
      isRefreshing: false
    }
  },
  methods: {
    async onRefresh () {
      // 还原数据页数为 1
      this.currentPage = 1
      const { data } = await this.fetchData({
        currentPage: this.currentPage,
        pageSize: 10,
        status: 1
      })
      // 下拉刷新需要清除所有数据，直接赋值给 this.list,存在数据且数据不为空再进行存储
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list = data.data.records
      } else if (data.content && data.content.length !== 0) {
        this.list = data.content
      }
      // 提示(整体引入，和 element 一样)
      this.$toast('刷新成功')
      // 关闭下拉提示框
      this.isRefreshing = false
    },
    async onLoad () {
      const { data } = await this.fetchData({
        currentPage: this.currentPage,
        pageSize: 10,
        status: 1
      })
      if (data.data && data.data.records && data.data.records.length !== 0) {
        this.list.push(...data.data.records)
      } else if (data.content && data.content.length !== 0) {
        this.list.push(...data.content)
      }
      // 下次请求下一页
      this.currentPage++
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (data.data && data.data.records && data.data.records.length < 10) {
        this.finished = true
      } else if (data.content && data.content.length < 10) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// 列表组件的固定和滚动设置
.course-content-list {
  position: fixed;
  overflow-y: auto;
  top: 0px;
  bottom: 0px;
  left: 0;
  right: 0;
}
// 课程列表项的样式
.van-cell__value {
  display: flex;
  height: 100px;
  padding: 10px 0;
}

.van-cell__value img {
  width: 75px;
  height: 100%;
  border-radius: 5px;
}
.course-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 10px;
}
.course-info .course-preview {
  flex-grow: 1;
}
.course-info .course-discount {
  color: #ff7452;
  margin-right: 10px;
}
p, h3 {
  margin: 0;
}
</style>
