<template>
  <div class="home">
    <input v-model.number="pageNum" type="number" oninput="value=value.replace(/[^\d]/g,'')" />
    <div>
      共有
      <input v-model.number="total" type="number" oninput="value=value.replace(/[^\d]/g,'')" />
      条
    </div>
    <pagination
      :currentPage="pageNum"
      @currentChange="handleCurrentChange"
      :total="total"
      :pageSize="pageSize"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import pagination from "@/components/pagination";
export default {
  name: "Home",
  data: function() {
    return {
      pageNum: 1,
      total: 201,
      pageSize: 10
    };
  },
  components: {
    pagination
  },
  methods: {
    handleCurrentChange(val) {
      // console.log(val, "changeval");
      this.pageNum = val;
    }
  }
};
</script>
