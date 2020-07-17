<template>
  <div class="pagination-container">
    <div class="pagination-total">共有{{total}}条</div>
    <div class="pagination-page">共有{{numArray.length}}页</div>
    <div class="change-container" v-show="total">
      <button
        :disabled="!canMostLeft"
        class="iconfont icon-left1 pagination-btn"
        :class="!canMostLeft?'disabled':'abled'"
        @click="handleDirection('mostLeft')"
      ></button>
      <button
        :disabled="!canLeft"
        class="iconfont icon-left pagination-btn"
        :class="!canLeft?'disabled':'abled'"
        @click="handleDirection('left')"
      ></button>
      <div class="pagenum-container" v-for="(item,index) in numArray.slice(x,x+5)" :key="index">
        <div
          class="number"
          @click="handleChangePage(item)"
          :class="currentPage===item?'active':''"
        >{{item}}</div>
      </div>
      <button
        :disabled="!canRight"
        class="iconfont icon-right pagination-btn"
        :class="!canRight?'disabled':'abled'"
        @click="handleDirection('right')"
      ></button>
      <button
        :disabled="!canRight"
        class="iconfont icon-right1 pagination-btn"
        :class="!canMostRight?'disabled':'abled'"
        @click="handleDirection('mostRight')"
      ></button>
    </div>
    <div class="input-num-container" v-show="total">
      <input
        class="input-num"
        v-model="internalCurrentPage"
        @keyup.enter="handleChangePage(internalCurrentPage)"
      />
    </div>
    <div v-show="total" class="btn-jump" @click="handleChangePage(internalCurrentPage)">GO</div>
  </div>
</template>

<script>
export default {
  name: "pagination",
  props: {
    currentPage: {
      required: true,
      type: Number,
      default: 1
    },
    total: {
      required: true,
      type: Number,
      default: 0
    },
    pageSize: {
      required: true,
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      numArray: [], //页码总数组
      x: 0, //控制页码的呈现的内容
      internalCurrentPage: 1 //内部选中页码
    };
  },
  watch: {
    total() {
      this.numArray = [];
      this.handlePageTotal();
    }
  },
  computed: {
    canMostLeft() {
      return this.x != 0;
    },
    canLeft() {
      return this.internalCurrentPage != 1;
    },
    canRight() {
      return this.internalCurrentPage != this.numArray.length;
    },
    canMostRight() {
      return this.x < this.numArray.length - 5;
    }
  },
  mounted() {
    this.handlePageTotal();
  },
  methods: {
    //判断一共有多少页
    handlePageTotal() {
      let pageTotal = this.total / this.pageSize;
      if (!this.isInteger(pageTotal)) {
        pageTotal = Math.floor(pageTotal) + 1;
      }
      for (let i = 1; i <= pageTotal; i++) {
        this.numArray.push(i);
      }
    },
    isInteger(obj) {
      //判断是否是整数
      return obj % 1 === 0;
    },
    //选择页码和跳转页码
    handleChangePage(page) {
      //判断跳转的传入页码超出可选页码范围
      let pageToNum = Number(page);
      switch (true) {
        case pageToNum < 1:
          this.internalCurrentPage = 1;
          break;
        case pageToNum >= this.numArray.length:
          this.internalCurrentPage = this.numArray.length;
          break;
        default:
          this.internalCurrentPage = pageToNum;
      }
      this.$emit("currentChange", this.internalCurrentPage);
      //判断修改页码是否在呈现页码范围
      this.changePageNumRange(this.internalCurrentPage);
    },
    //修改呈现页码范围
    changePageNumRange(currentPage) {
      //数组的索引值从0开始，所以要-1
      currentPage = currentPage - 1;
      switch (true) {
        case this.x + 5 > currentPage && currentPage >= this.x:
          break;
        //+2的原因是为了让当前选中的页码，在页码呈现的中间
        case currentPage + 2 < this.numArray.length:
          //防止超出呈现页码范围
          currentPage - 2 > 0 ? (this.x = currentPage - 2) : (this.x = 0);
          break;
        default:
          this.x = this.numArray.length - 5;
          break;
      }
    },
    //点击选择左右，切换页码的按钮
    handleDirection(type) {
      switch (type) {
        case "mostLeft":
          this.internalCurrentPage = 1;
          break;
        case "left":
          this.internalCurrentPage - 1 < 1
            ? (this.internalCurrentPage = 1)
            : (this.internalCurrentPage = this.internalCurrentPage - 1);
          break;
        case "right":
          this.internalCurrentPage + 1 > this.numArray.length
            ? (this.internalCurrentPage = this.numArray.length)
            : (this.internalCurrentPage = this.internalCurrentPage + 1);
          break;
        default:
          this.internalCurrentPage = this.numArray.length;
          break;
      }
      this.$emit("currentChange", this.internalCurrentPage);
      //判断修改页码是否在呈现页码范围
      this.changePageNumRange(this.internalCurrentPage);
    }
  }
};
</script>

<style  lang="scss">
@import "../assets/icon/iconfont.css"; //引入Icon图标

$fontColor: #6a6a6a;
$curColor: #fff;
$curBackground: #5f94ff;
$border: #cecece;
$disableColor: #d1d1d1;
$size: 14px;
$widthHeight: 32px;
$padding: 10px;

.pagination-container {
  display: flex;
  color: $fontColor;
  font-size: $size;
  height: $widthHeight;
  line-height: $widthHeight;
  .pagination-total,
  .pagination-page {
    padding-right: $padding;
  }
  .input-num {
    width: 26px;
    height: 28px;
    border: 1px solid $border;
    margin: 0 16px 0 $widthHeight;
    color: $fontColor;
    text-align: center;
    &:hover {
      cursor: pointer;
    }
    &:focus {
      outline: 0;
    }
  }
  .btn-jump {
    border: 1px solid $border;
    text-align: center;
    width: $widthHeight;
    height: 30px;
    line-height: 30px;
    margin-top: 1px;
    font-family: Source Han Sans CN;

    &:hover {
      background: $curBackground;
      color: $curColor;
      cursor: pointer;
    }
  }
}
//页码组+左右切换页码按钮
.change-container {
  display: flex;
  // 按钮

  .pagination-btn {
    background: none;
    border: none;
    border-top: 1px solid $border;
    border-bottom: 1px solid $border;
    border-right: 1px solid $border;
    width: $widthHeight;
    padding: 0;
    margin: 0;
    color: $fontColor;
    &:focus {
      outline: 0;
    }
    &:first-child {
      border-left: 1px solid $border;
    }
  }
  .disabled {
    color: $disableColor;
    &:hover {
      cursor: no-drop;
    }
  }
  .abled {
    border-color: $border;
    &:hover {
      cursor: pointer;
      background: $curBackground;
      color: $curColor;
    }
  }

  // 页码组
  .pagenum-container {
    display: flex;
    .number {
      width: $widthHeight;
      border-top: 1px solid $border;
      border-bottom: 1px solid $border;
      border-right: 1px solid $border;
      &:hover {
        cursor: pointer;
        background: $curBackground;
        color: $curColor;
      }
      &.active {
        background: $curBackground;
        color: $curColor;
      }
    }
  }
}
</style>
