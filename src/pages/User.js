import React from 'react';
import { Card, Button, Table } from 'antd';
import Auth from '../auth/Auth';
import Http from '../utils/Http';

import Main from '../layouts/Main';

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
  },
  {
    title: 'Username',
    dataIndex: 'username',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Time',
    dataIndex: 'created_at',
    render: timeStamp => new Date(timeStamp * 1000).toLocaleString(),
  }
];

class Component extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      data: [],
      pagination: {
        showTotal: total => `Total ${total} items`,
        pageSize: 20,
        showQuickJumper: true,
      },
      loading: false,
      selectedRowKeys: [],
    };
  }

  componentDidMount () {
    this.fetch();
  }

  handleTableChange (pagination, filters, sorter) {
    this.fetch({
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    });
  }

  onSelectChange (selectedRowKeys) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  delete () {
    this.setState({ loading: true });
    Http.fetch('/users' + this.state.selectedRowKeys.toString(), {method: 'DELETE', headers: {Authorization: 'Bearer ' + Auth.getAccessToken()}})
    .then(response => {
      if (!response.ok) {
        console.log('Network response was not ok.')
      }
    })
    .catch(error => {
      console.log('There has been a problem with your fetch operation: ' + error.message)
    })
    .then(() => {
      this.fetch({
        page: this.state.pagination.current,
      })
    });
  }

  fetch(params = {page: 1}) {
    this.setState({ loading: true });
    Http.fetch('/users?&page=' + params.page, {}, (data, response) => {
      const pagination = this.state.pagination;

      pagination.current = parseInt(response.headers.get('X-Pagination-Current-Page'));
      pagination.pageSize = parseInt(response.headers.get('X-Pagination-Per-Page'));
      pagination.total = parseInt(response.headers.get('X-Pagination-Total-Count'));

      this.setState({
        loading: false,
        data: data,
        pagination
      });
    })
    .then(() => {
      this.setState({loading: false});
    });
  }

  render () {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: selectedRowKeys =>  this.onSelectChange(selectedRowKeys),
    };
    return (
      <Main className="user" navKey="/user" sideBar={false}>
        <Card>
          <Button type="primary" onClick={e => this.delete(e)}
            disabled={this.state.selectedRowKeys.length <= 0}
          >Delete</Button>
          <Table
            bordered
            size="middle"
            rowSelection={rowSelection}
            columns={columns}
            rowKey={record => record.id}
            dataSource={this.state.data}
            pagination={this.state.pagination}
            loading={this.state.loading}
            onChange={(pagination, filters, sorter) => this.handleTableChange(pagination, filters, sorter)}
          />
        </Card>
      </Main>
    );
  }
}

Component.defaultProps = {
};

export default Component;
