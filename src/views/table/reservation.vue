<template>
  <div class="app-container">

    <!-- 查询按钮 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" icon="el-icon-circle-plus" @click="handleSearchOpen()">搜索教室</el-button>
      </el-form-item>
    </el-form>

    <!-- 条件查询对话框 -->
    <el-dialog title="条件查询" :visible.sync="dialogSearchVisible" width="50%">
      <el-form :model="searchMap" label-width="200px">
        <el-form-item label="选择日期">
          <el-date-picker
            v-model="searchMap.date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="选择时间段">
            <el-checkbox label="第1节课" v-model="searchMap.course1"></el-checkbox>
            <el-checkbox label="第2节课" v-model="searchMap.course2"></el-checkbox>
            <el-checkbox label="第3节课" v-model="searchMap.course3"></el-checkbox>
            <el-checkbox label="第4节课" v-model="searchMap.course4"></el-checkbox>
        </el-form-item>

        <el-form-item label="教室容量">
          <el-slider
            v-model="searchMap.capacity"
            show-stops
            :step="50"
            :max="250">
          </el-slider>
        </el-form-item>

        <el-form-item label="教室类型">
          <el-select v-model="searchMap.type" placeholder="请选择" clearable>
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="教学楼">
          <el-select v-model="searchMap.building" placeholder="请选择" clearable>
            <el-option
              v-for="item in buildingOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogSearchVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSearchSubmit">确 定</el-button>
    </span>
    </el-dialog>

    <!-- 日程表格 -->
    <el-table
      :data="list"
      stripe
      border
      v-loading="listLoading">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        sortable
        prop="name"
        label="教室名">
      </el-table-column>
      <el-table-column
        sortable
        prop="building"
        label="教学楼">
      </el-table-column>
      <el-table-column
        sortable
        prop="floor"
        label="教室楼层">
      </el-table-column>
      <el-table-column
        sortable
        prop="type"
        label="教室类型">
      </el-table-column>
      <el-table-column
        sortable
        prop="capacity"
        label="教室容量">
      </el-table-column>

      <el-table-column
        sortable
        prop="date"
        label="日期">
      </el-table-column>

      <el-table-column
        sortable
        prop="course1"
        label="第1节课">
        <template slot-scope="scope">
          <font color="#dc143c">{{ scope.row.course1 === 1 ?  '被占用': '' }}</font>
          <font color="228b22">{{ scope.row.course1 === 0 ?  '空闲': '' }}</font>
        </template>
      </el-table-column>

      <el-table-column
        sortable
        prop="course2"
        label="第2节课">
        <template slot-scope="scope">
          <font color="#dc143c">{{ scope.row.course2 === 1 ?  '被占用': '' }}</font>
          <font color="228b22">{{ scope.row.course2 === 0 ?  '空闲': '' }}</font>
        </template>
      </el-table-column>

      <el-table-column
        sortable
        prop="course3"
        label="第3节课">
        <template slot-scope="scope">
          <font color="#dc143c">{{ scope.row.course3 === 1 ?  '被占用': '' }}</font>
          <font color="228b22">{{ scope.row.course3 === 0 ?  '空闲': '' }}</font>
        </template>
      </el-table-column>

      <el-table-column
        sortable
        prop="course4"
        label="第4节课">
        <template slot-scope="scope">
          <font color="#dc143c">{{ scope.row.course4 === 1 ?  '被占用': '' }}</font>
          <font color="228b22">{{ scope.row.course4 === 0 ?  '空闲': '' }}</font>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleReserve(scope.row)">预约</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 教室预约对话框 -->
    <el-dialog title="预约申请" :visible.sync="dialogReserveVisible" width="50%">
      <el-form :model="pojo" label-width="200px">
        <el-form-item label="选择日期">
          <el-date-picker
            v-model="pojo.date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="选择时间段">
          <el-checkbox label="第1节课" v-model="pojo.course1" :disabled="pojo.course1 === 1"></el-checkbox>
          <el-checkbox label="第2节课" v-model="pojo.course2" :disabled="pojo.course2 === 1"></el-checkbox>
          <el-checkbox label="第3节课" v-model="pojo.course3" :disabled="pojo.course3 === 1"></el-checkbox>
          <el-checkbox label="第4节课" v-model="pojo.course4" :disabled="pojo.course4 === 1"></el-checkbox>
        </el-form-item>

        <el-form-item label="教室容量">
          <el-slider
            v-model="pojo.capacity"
            show-stops
            :step="50"
            :max="250"
            :marks="marks"
            disabled>
          </el-slider>
        </el-form-item>

        <el-form-item label="教室类型">
          <el-input v-model="pojo.type" disabled></el-input>
        </el-form-item>

        <el-form-item label="教学楼">
          <el-input v-model="pojo.building" disabled></el-input>
        </el-form-item>

        <el-form-item label="预约原因">
          <el-input v-model="pojo.reason" type="textarea" autosize placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogReserveVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSearchSubmit">确 定</el-button>
    </span>
    </el-dialog>

    <!-- 分页 -->
    <br>
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
  import reservationApi from '@/api/reservation'
  import message from '@/utils/message'

  export default {
    data() {
      return {
        total: 0, // 总记录数
        currentPage: 1, // 当前页
        pageSize: 10, // 每页大小
        list: [], // 后端传回数据列表
        id: '', // 数据库id
        dialogSearchVisible: false, // 条件查询对话框是否可见
        dialogReserveVisible: false, // 预约申请对话框是否可见
        pojo: {}, // 预约申请表单绑定的实体对象
        listLoading: true, // 加载中动画
        // 教室类型选项
        typeOptions: [{
          value: '普通教室',
          label: '普通教室'
        }, {
          value: '多媒体教室',
          label: '多媒体教室'
        }],
        buildingOptions: [{
          value: '明德楼',
          label: '明德楼'
        }, {
          value: '文德楼',
          label: '文德楼'
        }],
        searchMap: {}, // 查询表单绑定的实体对象
        marks: {
          50: '50',
          100: '100',
          150: '150',
          200: '200'
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.fetchData()
      },
      // 抓取列表数据
      fetchData() {
        this.listLoading = true
        reservationApi.getPageList(this.currentPage, this.pageSize, this.searchMap).then(response => {
          if (response.flag === true) {
            this.list = response.data.rows
            this.total = response.data.total
          }
          this.listLoading = false
        })
      },
      // 条件查询对话框打开
      handleSearchOpen() {
        this.searchMap = { course1: false, course2: false, course3: false, course4: false }
        this.dialogSearchVisible = true
      },
      // 条件查询对话框确认
      handleSearchSubmit() {
        reservationApi.getPageList(this.currentPage, this.pageSize, this.searchMap).then(response => {
          if (response.flag === true) {
            this.list = response.data.rows
            this.total = response.data.total
          }
        })
        this.dialogSearchVisible = false // 隐藏窗口
      },
      // 教室预约对话框打开
      handleReserve(row) {
        this.dialogReserveVisible = true
        this.pojo = row
      }
    }
  }
</script>
