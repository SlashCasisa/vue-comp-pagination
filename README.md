# Introduction
Pagination components are different from element and Ant

## Installation
npm install vue-comp-pagination -S or yarn add vue-comp-pagination -S

## Usage
### method 1:
In main.js
```
 import PaginationComponent from 'vue-comp-pagination'
 Vue.use(PaginationComponent)
```
In xxx.vue
```
<pagination :currentPage="pageNum" @currentChange="handleCurrentChange" :total="total" :pageSize="pageSize"/>

```
currentPage:number
currentChange：function
total: number
pageSize：number 

### method 2:
In xxx.vue
```
<pagination :currentPage="pageNum" @currentChange="handleCurrentChange" :total="total" :pageSize="pageSize"/>
import 'vue-comp-pagination'
```


