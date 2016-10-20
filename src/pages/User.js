import Config from 'config';
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
    const pager = this.state.pagination;
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });

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

  fetch(params = {page: 1}) {
    this.setState({ loading: true });
    Http.fetch(Config.urls.users + '?&page=' + params.page, {headers: {Authorization: 'Bearer ' + Auth.getAccessToken()}})
    .then(response => {
      if (response.ok) {
        response.json().then(data => {
          const pagination = this.state.pagination;
          // Read total count from server
          // pagination.total = data.totalCount;
          pagination.pageSize = parseInt(response.headers.get('X-Pagination-Per-Page'));
          pagination.total = parseInt(response.headers.get('X-Pagination-Total-Count'));
          this.setState({
            loading: false,
            data: data,
            pagination
          });
        })
      } else {
        console.log('Network response was not ok.')
      }
    })
    .catch(error => {
      console.log('There has been a problem with your fetch operation: ' + error.message)
    })
    .then(() => {
      this.setState({
        loading: false
      })
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
          <Button type="primary" onClick={this.start}
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
