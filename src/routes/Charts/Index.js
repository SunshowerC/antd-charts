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
  Table,
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './TableList.less';
//
const FormItem = Form.Item;
const { Option } = Select;

@connect(({ chartsList, loading }) => ({
  chartsList,
  loading: loading.models.chartsList,
}))
@Form.create()
export default class Workplace extends PureComponent {
  state = {
    selectedRows: [],
  };

  componentDidMount() {
    const pagination = {
      currentPage: 1,
      pageSize: 20,
    };
    this.search(null, pagination);
  }

  search = (e, params = {}) => {
    e && e.preventDefault && e.preventDefault();

    const { form, dispatch } = this.props;

    dispatch({
      type: 'chartsList/fetch',
      payload: {
        ...form.getFieldsValue(),
        ...params,
      },
    });
    // console.log('form', form.getFieldsValue());
  };

  handleFormReset = () => {
    this.props.form.resetFields();

    this.search();
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    // debugger;

    this.search(null, {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  renderTable() {
    const { selectedRows } = this.state;
    const { loading, chartsList = [] } = this.props;

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: '模板名',
        dataIndex: 'template',
      },
      {
        title: '模板类型',
        dataIndex: 'type',
      },
      {
        title: '操作',
        render: () => (
          <Fragment>
            <a href="">查看</a>
            <Divider type="vertical" />
            <a href="">克隆</a>
          </Fragment>
        ),
      },
    ];

    return (
      <Fragment>
        <div className={styles.tableListOperator}>
          <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
            新建
          </Button>
          {selectedRows.length > 0 && (
            <span>
              <Button>批量操作</Button>
              <Dropdown>
                <Button>
                  更多操作 <Icon type="down" />
                </Button>
              </Dropdown>
            </span>
          )}
        </div>
        <Table
          bordered
          rowKey="id"
          loading={loading}
          dataSource={chartsList.list}
          pagination={chartsList.pagination}
          columns={columns}
          // onSelectRow={this.handleSelectRows}
          onChange={this.handleStandardTableChange}
        />
      </Fragment>
    );
  }

  renderForm() {
    const formItemLayout = {
      labelCol: { span: 12 },
      wrapperCol: { span: 12 },
    };

    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline" onSubmit={this.search}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="模板名" {...formItemLayout}>
              {getFieldDecorator('template')(<Input />)}
            </FormItem>
          </Col>

          <Col md={8} sm={24}>
            <FormItem label="模板类型">
              {getFieldDecorator('type')(
                <Select placeholder="请选择" style={{ width: '100%' }} allowClear>
                  <Option value="bar">柱状图</Option>
                  <Option value="line">折线图</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
          </span>
        </div>
      </Form>
    );
  }

  render() {
    return (
      <PageHeaderLayout title="查询表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            {this.renderTable()}
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
