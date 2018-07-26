import Mock from 'mockjs';

export const getChartsList = Mock.mock({
  pagination: {
    total: '@integer(100,500)',
    pageSize: 20,
  },

  'list|10': [
    {
      id: '@integer(10000)',
      template: '@first',
      type: /line|bar/,
    },
  ],
});
