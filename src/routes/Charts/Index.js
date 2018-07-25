import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
// import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
} from 'antd';
// import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

// import styles from './TableList.less';
//
// const FormItem = Form.Item;
// const { Option } = Select;

@connect(({ chartsList, loading }) => ({
  chartsList,
  loading: loading.models.chartsList,
}))
export default class Workplace extends PureComponent {
  render() {
    return (
      <PageHeaderLayout title="查询表格">
        <Card bordered={false} />
      </PageHeaderLayout>
    );
  }
}
