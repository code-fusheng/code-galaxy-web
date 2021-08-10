<template>
  <div class="question-train-container">
    <!-- 左侧内容区 -->
    <div class="left-content-container">
      <!-- 顶层轮播图 -->
      <div class="top-carousel">
        <a-carousel :after-change="onChange">
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
        </a-carousel>
      </div>
      <!-- 上层题库列表 -->
      <div class="repostiroy-container">
        <div style="background-color: #ececec; padding: 20px;">
          <a-row :gutter="16">
            <a-col :span="8">
              <a-card title="专业题库" :bordered="false">
                <p>card content</p>
              </a-card>
            </a-col>
            <a-col :span="8">
              <a-card title="常规题库" :bordered="false">
                <p>card content</p>
              </a-card>
            </a-col>
            <a-col :span="8">
              <a-card title="练习题库" :bordered="false">
                <p>card content</p>
              </a-card>
            </a-col>
          </a-row>
        </div>
      </div>
      <!-- 中层试题列表 -->
      <div class="question-container">
        <a-table :columns="columns" :data-source="data">
          <span slot="key"></span>
          <router-link to>
            <span slot="questionContent"></span>
          </router-link>
          <span slot="useCount"></span>
          <span slot="rightRate"></span>
          <span slot="hardLevel" slot-scope="hardLevel">
            <a-tag v-if="hardLevel == 0" color="green">简单</a-tag>
            <a-tag v-else-if="hardLevel == 1" color="blue">一般</a-tag>
            <a-tag v-else color="red">困难</a-tag>
          </span>
        </a-table>
      </div>
    </div>
    <!-- 右侧推荐区 -->
    <div class="right-recomed-container">
      <div class="active-recomed">
        <a-card title="活动推荐">
          <p
            style="fontSize: 14px;color: rgba(0, 0, 0, 0.85); marginBottom: 16px;fontWeight: 500"
          >Group title</p>
          <a-card title="Inner card title">
            <a slot="extra" href="#">More</a>
            Inner Card content
          </a-card>
          <a-card title="Inner card title" :style="{ marginTop: '16px' }">
            <a slot="extra" href="#">More</a>
            Inner Card content
          </a-card>
        </a-card>
      </div>
      <div class="question-recomed"></div>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    // 列头显示文字
    title: "#",
    // 列数据在数据项中对应的 key，支持 a.b.c 的嵌套写法
    dataIndex: "key",
    // Vue 需要的 key 用于适配 template 风格
    key: "key",
    width: "40px",
  },
  {
    title: "试题内容",
    dataIndex: "questionContent",
    key: "questionContent",
    width: "400px",
    ellipsis: "true",
  },
  {
    title: "作答数",
    dataIndex: "useCount",
    key: "useCount",
  },
  {
    title: "正确率",
    dataIndex: "rightRate",
    key: "rightRate",
  },
  {
    title: "难度",
    dataIndex: "hardLevel",
    key: "hardLevel",
    scopedSlots: { customRender: "hardLevel" },
  },
  {
    title: "题型",
    key: "questionType",
    dataIndex: "questionType",
    scopedSlots: { customRender: "questionType" },
  },
  {
    title: "Action",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];

const data = [
  {
    key: "1",
    questionContent: "RFID射频技术多应用于物联网（）。",
    useCount: 32,
    rightRate: 10,
    hardLevel: 0,
    questionType: 0,
  },
  {
    key: "2",
    questionContent:
      "智慧城市建设参考模型的（）利用SOA（面向服务的体系架构）、云计算、大数据等技术，承载智慧应用层中的相关应用，提供应用所需的各种服务与资源。",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
export default {
  data() {
    return {
      data,
      columns,
    };
  },
  methods: {
    onChange(a, b, c) {
      console.log(a, b, c);
    },
  },
};
</script>

<style scoped>
.question-train-container {
  clear: both;
  /* border: 1px solid red; */
  margin: 20px auto;
  padding: 10px;
  width: 90%;
  min-height: 860px;
  display: flex;
  flex-direction: row;
}

.left-content-container {
  /* border: 1px solid green; */
  width: 70%;
  margin: 10px;
}

.right-recomed-container {
  /* border: 1px solid yellow; */
  width: 30%;
  margin: 10px;
}

/* For demo 轮播图样式 */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>
