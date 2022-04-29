<template>
  <div class="course-section">
    <h2 class="section" v-text="sectionData.sectionName"></h2>
    <!-- 课时列表 -->
    <p
      class="lesson"
      v-for="item in sectionData.courseLessons"
      :key="item.id"
      @click="handleClick(item)"
    >
      <span v-text="item.theme"></span>
      <van-icon v-if="item.canPlay" name="play-circle" size="16"></van-icon>
      <van-icon v-else name="lock" size="16"></van-icon>
    </p>
  </div>
</template>

<script>
import { Icon } from 'vant'
export default {
  name: 'CourseSection',
  components: {
    VanIcon: Icon
  },
  props: {
    sectionData: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleClick (lessonInfo) {
      if (lessonInfo.canPlay) {
        // 只有当前课程能够播放时，才跳转视频页面，并传递课时的 ID
        this.$router.push({
          name: 'lesson-video',
          params: {
            lessonId: lessonInfo.id
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.course-section {
  padding: 0 20px;
}
.lesson {
  display: flex;
  line-height: 20px;
  justify-content: space-between;
}
</style>
