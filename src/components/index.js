import Vue from 'vue'
import pagination from './pagination.vue'
// 单个组件
// pagination.install = Vue => Vue.component(pagination.name, pagination);
// export default pagination;
// 多个组件
const Components = {
  pagination
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
});

export default Components;