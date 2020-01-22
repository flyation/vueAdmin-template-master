<template>
<div>
  <!-- 查询条件 -->
  <el-form :inline="true" class="demo-form-inline">
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
      <el-button type="primary" @click="handleQuery">查询</el-button>
      <el-button type="primary" @click="handleAdd">新增</el-button>
    </el-form-item>
  </el-form>

  <!-- 新增弹出框 -->
  <el-dialog title="新增教室" :visible.sync="dialogVisible" :before-close="handleClose" width="30%">
    <el-form :model="pojo" label-width="100px" :disabled="formDisable">
      <el-form-item label="教室名">
        <el-input v-model="pojo.name" placeholder="教室名" style="width: auto"></el-input>
      </el-form-item>
      <el-form-item label="教室楼层">
        <el-input-number v-model="pojo.floor" placeholder="教室楼层"></el-input-number>
      </el-form-item>
      <el-form-item label="教室容量">
        <el-input-number v-model="pojo.capacity" placeholder="教室容量"></el-input-number>
      </el-form-item>
      <el-form-item label="教室类型">
        <el-select v-model="pojo.type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否报修">
        <el-switch v-model="pojo.repair" active-value="1" inactive-value="0"></el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>

  <!-- 教室表格 -->
  <el-table
    :data="list"
    stripe
    style="width: 100%">
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
        <el-button @click="handleShow(scope.$index, scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
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
      list: [], // 后端传回数据列表
      total: 0, // 总记录数
      currentPage: 0, // 当前页
      pageSize: 0, // 每页大小
      searchMap: {}, // 查询条件
      dialogVisible: false, // 弹出框是否可见
      formDisable: false, // 表单是否禁用
      pojo: {}, // 弹出框数据
      // 教室类型选项
      options: [{
        value: '0',
        label: '普通教室'
      }, {
        value: '1',
        label: '多媒体教室'
      }]
    }
  },
  created() {
    this.currentPage = 1
    this.pageSize = 10
    this.fetchData()
  },
  methods: {
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
    /**
     * 抓取数据
     */
    fetchData() {
      classroomApi.search(this.currentPage, this.pageSize, this.searchMap).then(response => {
        this.total = response.data.total
        this.list = response.data.rows
      })
    },
    /**
     * 条件查询api
     */
    queryClassroom() {
      // TODO 条件查询api
      this.searchMap = {} // 清空查询条件
    },
    /**
     * 新增api
     */
    addClassroom() {
      classroomApi.addClassroom(this.pojo).then(response => {})
      this.fetchData()
      this.dialogVisible = false
      this.pojo = {}
    },
    /**
     * 编辑api
     */
    editClassroom() {
      // TODO 编辑api
    },
    /**
     * 查询按钮
     */
    handleQuery() {
      // TODO 条件查询api
    },
    /**
     * 新增按钮
     */
    handleAdd() {
      this.dialogVisible = true
      this.formDisable = false
      // TODO 新增api
    },
    /**
     * 表格查看按钮
     */
    handleShow(index, row) {
      this.dialogVisible = true
      this.formDisable = true
      this.pojo = row
    },
    /**
     * 表格编辑按钮
     */
    handleEdit(index, row) {
      this.dialogVisible = true
      this.formDisable = false
      this.pojo = row
    },
    /**
     * 弹出框右上角关闭
     */
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    /**
     * 弹出框取消按钮
     */
    handleCancel() {
      this.dialogVisible = false
      this.pojo = {}
    },
    /**
     * 弹出框确定按钮
     */
    handleSubmit() {
      // TODO 判断新增还是编辑
      this.dialogVisible = false
      this.pojo = {}
    }
  }
}
</script>
