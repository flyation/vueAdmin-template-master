<template>
<div>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="教室类型">
      <el-input v-model="searchMap.type" placeholder="教室类型"></el-input>
    </el-form-item>
    <el-form-item label="教室容量">
      <el-input v-model="searchMap.capacity" placeholder="教室容量"></el-input>
    </el-form-item>
    <el-form-item label="教室楼层">
      <el-input-number v-model="searchMap.floor"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="primary" @click="dialogVisible = true">新增</el-button>
    </el-form-item>
  </el-form>

  <!-- 新增弹出框 -->
  <el-dialog title="编辑" :visible.sync="dialogVisible"  :before-close="handleClose">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="教室名">
        <el-input v-model="pojo.name" placeholder="教室名"></el-input>
      </el-form-item>
      <el-form-item label="教室楼层">
        <el-input-number v-model="pojo.floor" placeholder="教室楼层"></el-input-number>
      </el-form-item>
      <el-form-item label="教室容量">
        <el-input v-model="pojo.capacity" placeholder="教室容量"></el-input>
      </el-form-item>
      <el-form-item label="教室类型">
        <el-select v-model="pojo.type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否报修">
        <el-switch v-model="pojo.repair" active-value="1" inactive-value="0"></el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>

  <el-table
    :data="list"
    stripe
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="id"
      label="dbid"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="教室名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="floor"
      label="教室楼层">
    </el-table-column>
    <el-table-column
      prop="type"
      label="教室类型">
    </el-table-column>
    <el-table-column
      prop="capacity"
      label="教室容量">
    </el-table-column>
    <el-table-column
      prop="repair"
      label="是否报修">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page=currentPage
    :page-sizes="[5, 10, 20,]"
    :page-size="10"
    layout="total, sizes, prev, pager, next, jumper"
    :total=total>
  </el-pagination>
</div>
</template>

<script>
import classroomApi from '@/api/classroom'

export default {
  data() {
    return {
      list: [],
      total: 0, // 总记录数
      currentPage: 0, // 当前页
      pageSize: 0, // 每页大小
      searchMap: {
        delete: 0
      }, // 查询条件
      dialogVisible: false, // 弹出框是否可见
      pojo: {},
      options: ['普通教室', '多媒体教室']
    }
  },
  created() {
    this.currentPage = 1
    this.pageSize = 10
    this.searchMap = { eg: 'eg' }
    this.fetchData()
  },
  methods: {
    fetchData() {
      classroomApi.search(this.currentPage, this.pageSize, this.searchMap).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
      })
    },
    // fetchData() {
    //   classroomApi.getList().then(response => {
    //     this.list = response.data
    //   })
    // }
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.fetchData()
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    onSubmit() {
      console.log('submit!')
      // this.fetchData()
    },
    handleClick(row) {
      console.log(row)
    }
  }
}
</script>
