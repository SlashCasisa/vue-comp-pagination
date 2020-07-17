<template>
  <div id="app">
    <pagination
      :currentPage="pageNum"
      @currentChange="handleCurrentChange"
      :total="total"
      :pageSize="pageSize"
    />
  </div>
</template>
<script>
import pagination from "@/components/pagination";
export default {
  name: "app",
  components: {
    pagination
  },
  data() {
    return {
      pageNum: 1,
      total: 201,
      pageSize: 10
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.pageNum = val;
    }
  }
};
</script>>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
