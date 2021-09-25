<template>
  <div class="article-container">
    <!-- 文章首页主页图层 -->
    <div class="index-carousel-container" :style="'height:' + carouselStyle.height + 'px'">
      <div class="carousel-bg" />
      <div class="center-container">
        <div class="carousel-center-title1">Hello World ! code-fusheng</div>
        <!-- <div class="carousel-center-title2">人生一世 何只百年 非我不知餍足</div> -->
        <spoltLight />
        <!-- 动态座右铭 -->
        <!-- 中间按钮 -->
        <div class="carousel-center-button-container">
          <a class="read-button" href="#article-list-container">
            <a-icon class="button-icon" type="down-circle" />开始阅读
          </a>
          <a class="link-button" href="https://github.com/code-fusheng">
            <a-icon class="button-icon" type="link" />GitHub
          </a>
        </div>
        <div class="carousel-center-icon-container">
          <a-tooltip placement="top">
            <template slot="title">
              <span>Tel : 15115726712</span>
            </template>
            <a href="tel:15115726712">
              <a-icon class="item-icon" type="phone" />
            </a>
          </a-tooltip>
          <a-tooltip placement="top">
            <template slot="title">
              <span>Email : 2561035977@qq.com</span>
            </template>
            <a href="mailto:2561035977@qq.com">
              <a-icon class="item-icon" type="mail" />
            </a>
          </a-tooltip>
          <a-tooltip placement="top">
            <template slot="title">
              <span>访问我的GitHub</span>
            </template>
            <a href="https://github.com/code-fusheng">
              <a-icon class="item-icon" type="github" />
            </a>
          </a-tooltip>
          <a-tooltip placement="top">
            <template slot="title">
              <span>QQ : 2561035977</span>
            </template>
            <a href="https://qm.qq.com/cgi-bin/qm/qr?k=XYX9hWIo2kC1OlOacqrOMi3uDoPLVwK5&noverify=0">
              <a-icon class="item-icon" type="qq" />
            </a>
          </a-tooltip>
          <a-tooltip placement="top">
            <template slot="title">
              <span>微信 : 15115726712</span>
            </template>
            <a-icon class="item-icon" type="wechat" />
          </a-tooltip>
        </div>
        <!-- 图层宽高:{{ carouselStyle }} -->
      </div>
    </div>
    <!-- 文章首页文章列表 -->
    <div class="article-list-container" id="article-list-container">
      <!-- <div class="top-carousel">
        <a-carousel autoplay>
          <div>
            <h3>1</h3>
          </div>
        </a-carousel>
      </div>-->
      <!-- 中部滚动加载文章卡片列表 -->
      <div class="center-card-list">
        <div v-for="article in articleList" :key="article.articleId" class="article-card-container">
          <!-- 左侧文章内容简述 -->
          <div class="article-left-container">
            <div>
              <a-icon type="tag" />
              {{ article.categoryName }}
              <a-icon type="history" />
              {{ article.createdTime }}
            </div>
            <div class="article-title-text">{{ article.articleTitle }}</div>
            <div class="statistics-labels">
              <div>
                <a-icon type="fire" />
                {{ article.readCount }} 热度
              </div>
              <div>
                <a-icon type="like" />
                {{ article.goodCount }} 点赞
              </div>
              <div>
                <a-icon type="message" />
                {{ article.commentCount }} 评论
              </div>
              <div>
                <a-icon type="star" />
                {{ article.collectCount }} 收藏
              </div>
            </div>
            <!-- 文章内容预览 -->
            <div class="article-desc-text">
              <div>{{ article.articleDesc }}</div>
            </div>
          </div>
          <!-- 右侧文章封面展示 -->
          <div class="article-right-container">
            <img
              :src="article.articleImage === '' ? 'https://www.cooltechdoll.com/wp-content/uploads/2019/08/2019080305563723.png': article.articleImage"
              alt
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carouselStyle: {
        widht: "",
        height: "",
      },
      articleList: [],
      // 分页查询对象
      page: {
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        totalPage: 0,
        params: {},
        sortColumn: "createdTime",
        sortMethod: "asc",
        list: [],
      },
    };
  },
  mounted() {
    this.carouselStyle.height = document.body.clientHeight + 10;
    this.carouselStyle.widht = document.body.clientWidth + 10;
    window.onresize = () => {
      return (() => {
        this.carouselStyle.height = document.body.clientHeight + 10;
        this.carouselStyle.widht = document.body.clientWidth + 10;
        console.log(
          "高度" +
            document.body.clientHeight +
            "宽度" +
            document.body.clientWidth
        );
      })();
    };
  },
  created() {
    this.pageListArticle();
  },
  methods: {
    async pageListArticle() {
      const { data } = await this.$pageListArticle(this.page);
      this.articleList = data.list;
    },
  },
};
</script>

<style scoped>
/* 主页图层 */
.index-carousel-container {
  margin-top: -60px;
  /* height: 1340px; */
  /* height: 100%; */
  min-height: 660px;
  z-index: 1;
  opacity: 1;
  visibility: visible;
  transform: translateX(0px) translateX(0px) translateX(0px) translateZ(0px);
  /* background-image: linear-gradient(to right, #646366 0%, #caafb5 100%); */
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 500px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transform-origin: 0% 50%;
  transform-origin: 0% 50%;
  /* background-image: url("https://visualhunt.com/photos/1/black-and-white-nature-sailing-ship-ship.jpg?s=l"); */
  background-image: url("@/assets/img/bgi-7-plus.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.carousel-bg {
  background: rgba(0, 0, 0, 0.2);
  z-index: -99;
  opacity: 1;
  visibility: visible;
  transform: translateX(0px) translateX(0px) translateX(0px) translateZ(0px);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.center-container {
  /* border: 1px solid rgb(247, 243, 243); */
  color: #ffffff;
  width: 600px;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.carousel-center-title1 {
  position: relative;
  font-family: "STXingkai";
  color: #333333;
  font-size: 30px;
  cursor: pointer;
}
.carousel-center-title2 {
  position: relative;
  font-family: "STXingkai";
  color: #333333;
  font-size: 30px;
  cursor: pointer;
}

.carousel-center-title1::after {
  content: "Hello World ! code-fusheng";
  position: absolute;
  top: 0;
  left: 0;
  /* 文字透明色 */
  color: transparent;
  background-image: linear-gradient(
    to right,
    #c23616,
    #192a56,
    #00d2d3,
    yellow,
    #6d214f,
    #2e86de,
    #4cd137,
    #e84118
  );
  /* 背景绘制区域 值:text 代表设置了文字的镂空效果 前提必须是文字为透明色 */
  background-clip: text;
  /* 谷歌浏览器的私有属性 */
  -webkit-background-clip: text;
  /* 利用裁剪来创建爱你元素的可显示区域
    circle 表示创建了圆形;
    100px 表示圆形的直径;
    0%和50%表示圆形的圆心;
    圆形的直径和圆形的圆心利用 at 关键字隔开
    */
  clip-path: circle(30px at 0% 50%);
  /* 动画 名称 时长 无限循环 */
  animation: move1 5s infinite;
}

.carousel-center-title2::after {
  content: "人生一世 何只百年 非我不知餍足";
  position: absolute;
  top: 0;
  left: 0;
  /* 文字透明色 */
  color: transparent;
  background-image: linear-gradient(
    to left,
    #c23616,
    #192a56,
    #00d2d3,
    yellow,
    #6d214f,
    #2e86de,
    #4cd137,
    #e84118
  );
  /* 背景绘制区域 值:text 代表设置了文字的镂空效果 前提必须是文字为透明色 */
  background-clip: text;
  /* 谷歌浏览器的私有属性 */
  -webkit-background-clip: text;
  /* 利用裁剪来创建爱你元素的可显示区域
    circle 表示创建了圆形;
    100px 表示圆形的直径;
    0%和50%表示圆形的圆心;
    圆形的直径和圆形的圆心利用 at 关键字隔开
    */
  clip-path: circle(30px at 0% 50%);
  /* 动画 名称 时长 无限循环 */
  animation: move2 5s infinite;
}

/* 设置移动效果 */
@keyframes move1 {
  0% {
    clip-path: circle(30px at 0% 50%);
  }
  50% {
    clip-path: circle(30px at 100% 50%);
  }
  100% {
    clip-path: circle(30px at 0% 50%);
  }
}

@keyframes move2 {
  0% {
    clip-path: circle(30px at 100% 50%);
  }
  50% {
    clip-path: circle(30px at 0% 50%);
  }
  100% {
    clip-path: circle(30px at 100% 50%);
  }
}

/* 中间按钮 */
.carousel-center-button-container {
  /* margin-top: 15px; */
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.button-icon {
  margin-right: 5px;
}

.read-button {
  margin-right: 2px;
  width: 120px;
  height: 45px;
  border: 1px solid #ffffff;
  text-align: center;
  line-height: 45px;
  border-radius: 30px;
  cursor: pointer;
  color: #ffffff;
}

.read-button:hover {
  border: 1px solid #133751;
  background-color: #133751;
  box-shadow: 0 14px 26px -12px rgba(23, 75, 172, 0.42),
    0 4px 23px 0 rgba(52, 95, 173, 0.12),
    0 8px 10px -5px rgba(63, 110, 163, 0.2);
  transition: background-color 0.5s;
  transition: border 0.2s;
}

.link-button {
  margin-left: 2px;
  width: 120px;
  height: 45px;
  border: 1px solid #ffffff;
  text-align: center;
  line-height: 45px;
  border-radius: 30px;
  cursor: pointer;
  color: #ffffff;
}

.link-button:hover {
  border: 1px solid #133751;
  background-color: #133751;
  box-shadow: 0 14px 26px -12px rgba(23, 75, 172, 0.42),
    0 4px 23px 0 rgba(52, 95, 173, 0.12),
    0 8px 10px -5px rgba(63, 110, 163, 0.2);
  transition: background-color 0.5s;
  transition: border 0.2s;
}

.carousel-center-icon-container {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
}

.item-icon {
  font-size: 24px;
  cursor: pointer;
  margin: 0 20px;
  color: #ffffff;
}

.item-icon:hover {
  color: rgb(30, 84, 201);
  transition: color 0.2s;
}

/*  */
.article-list-container {
  /* border: 1px solid red; */
  min-height: 1000px;
  display: flex;
  flex-direction: column;
}
.top-carousel {
  margin: 50px auto;
  height: 200px;
  width: 60%;
  /* background-color: greenyellow; */
}
/* ant 走马灯样式 */
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}

/* 文章卡片列表部分样式 */
.center-card-list {
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 20px 0;
  /* border: 1px solid greenyellow; */
  width: 60%;
  min-width: 830px;
  height: 100%;
  background-color: rgba(197, 189, 189, 0.2);
}

/* 文章卡片容器 */
.article-card-container {
  display: flex;
  flex-direction: row;
  margin: 20px auto;
  width: 90%;
  height: 270px;
  border-radius: 10px;
  box-shadow: -3px 0px 3px rgba(162, 162, 165, 0.4),
    /*左边阴影*/ 0px -3px 3px rgba(162, 162, 165, 0.4),
    /*上边阴影*/ 3px 0px 3px rgba(162, 162, 165, 0.4),
    /*右边阴影*/ 0px 3px 3px rgba(162, 162, 165, 0.4); /*下边阴影*/
  transition: all 0.2s;
}
.article-card-container:hover {
  box-shadow: -10px 0px 10px rgba(162, 162, 165, 0.4),
    /*左边阴影*/ 0px -10px 10px rgba(162, 162, 165, 0.4),
    /*上边阴影*/ 10px 0px 10px rgba(162, 162, 165, 0.4),
    /*右边阴影*/ 0px 10px 10px rgba(162, 162, 165, 0.4); /*下边阴影*/
  /* 使 :hover 进出平滑过度 */
  transition: all 0.5s;
}

/* 左侧文章简述 */
.article-left-container {
  line-height: 1.5;
  padding: 15px;
  width: 45%;
}
.article-title-text {
  margin: 8px 0;
  line-height: 2;
  font-size: 1.17em;
  font-weight: bold;
  color: #504e4e;
}
.statistics-labels {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.article-desc-text {
  margin-top: 15px;
  font-size: 16px;
}

/* 右侧封面展示 */
.article-right-container {
  width: 55%;
}
.article-right-container img {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  border-radius: 0px 10px 10px 0px;
}
</style>
