<template>
  <el-table stripe ref="singleTable" :data="posts" highlight-current-row style="width: 100%">
    <el-table-column sortable property="name" label="Name"></el-table-column>
    <el-table-column sortable property="surname" label="Surname"></el-table-column>
    <el-table-column sortable property="usi" width="120" label="USI"></el-table-column>
    <el-table-column sortable property="grade" label="Grade"></el-table-column>
    <el-table-column width="110" label="Check All">
      <div slot-scope="scope">
        <el-checkbox @change="checkAll(scope.row.sn,scope.row.classdays)" :checked="scope.row.classdays.length === 5"><span>Check All</span></el-checkbox>
      </div>
    </el-table-column>
    <el-table-column property="classdays" width="600" label="Class Days">
      <div slot-scope="scope">
        <span v-for="(day, idx) in daysOfWeek" :key="idx">
          <el-checkbox @change="updateClassDays(scope.row.sn,day)" v-if="scope.row.classdays.includes(day)" checked><span>{{day}}</span></el-checkbox>
          <el-checkbox @change="updateClassDays(scope.row.sn,day)" v-else><span>{{day}}</span></el-checkbox>
        </span>
      </div>
    </el-table-column>
  </el-table>
</template>

