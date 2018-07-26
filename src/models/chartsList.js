import { queryCharts } from '../services/api';

export default {
  namespace: 'chartsList',

  state: {
    list: [], // 列表数据
    pagination: {}, // 页码对象
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryCharts, payload);

      yield put({
        type: 'save',
        payload: response,
      });
    },
    // *add({ payload, callback }, { call, put }) {
    //   const response = yield call(addRule, payload);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    //   if (callback) callback();
    // },
    // *remove({ payload, callback }, { call, put }) {
    //   const response = yield call(removeRule, payload);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    //   if (callback) callback();
    // },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
