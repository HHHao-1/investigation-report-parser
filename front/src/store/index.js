import {createStore} from 'vuex'

export default createStore({
  state: {
    tableData1: [],
    tableData2: [],
    must2: {one: [0, 1]},
    must3: {one: [1, 2, 3], two: [1, 2, 3]},
    must4: {one: [1, 2, 3, 4, 5], two: [1, 2, 3, 4, 5]},
    must5: {one: [1, 2, 3, 4], two: [1, 2, 3, 4]},
  },
  mutations: {
    table1(state, data) {
      state.tableData1 = data;
    },
    table2(state, data) {
      state.tableData2 = data;
    },
  },
  actions: {},
  modules: {}
})
