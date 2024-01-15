import { Space, Table, Input, Button, Dropdown, Menu, message, Modal, Form, Radio, Select, AutoComplete } from 'antd';
import type { MenuProps } from 'antd';
import MyButton from '@/components/basic/button';
import './style.css';
import {
  AudioOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  PlusCircleFilled,
  PlusOutlined,
  RollbackOutlined,
  SearchOutlined,
  SmileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { MySideOption } from '@/components/business/aside';
import MyPage, { MyPageTableOptions } from '@/components/business/page';
import { FC, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { css } from '@emotion/react';
// import Search from 'antd/es/transfer/search';
import { AuthContext } from './../../../context/AuthContext';
import { toast } from 'react-hot-toast';
import moment from 'moment';
import { supabase } from '../../../config/supabase';

export const getFullDate = (date: string): string => {
  if (date) {
    const dateAndTime = date.split('T');

    return dateAndTime[0].split('-').reverse().join('-');
  }

  return '';
};
const Admin_page: FC = () => {
  // segestion for search
  const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
  });
  const [options, setOptions] = useState([]);
  const { Search } = Input;

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: 'semester 1',
        },
        {
          key: '2',
          label: 'semester 2',
        },
        {
          key: '3',
          label: 'semester 3',
        },
        {
          key: '4',
          danger: true,
          label: 'a danger item',
        },
      ]}
    />
  );
  const semester = [
    { lable: 'semester 1', value: '1' },
    { lable: 'semester 2', value: '2' },
    { lable: 'semester vacation', value: '3' },
  ];

  const [form] = Form.useForm();
  const [page, setpage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(3);
  const [page1, setpage1] = useState(1);
  const [paginationSize1, setPaginationSize1] = useState(2);
  const columns = [
    {
      title: '#',
      dataIndex: '',
      key: '',
      render: (id, record, index) => {
        return (page - 1) * paginationSize + index + 1;
      },
    },
    {
      title: 'Mã lớp',
      dataIndex: 'class_code',
      key: 'class_code',
    },
    {
      title: 'Tên lớp',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'Năm học',
      dataIndex: 'school_year',
      key: 'school_year',
    },
    {
      title: 'Học kỳ',
      dataIndex: 'semester',
      key: 'semester',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Create at',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => (date ? getFullDate(date) : ''),
    },
    {
      title: 'Update at',
      dataIndex: 'update_at',
      key: 'update_at',
      render: (date: string) => (date ? getFullDate(date) : ''),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* {record.id} */}
          <EditOutlined value={record.id} onClick={() => showEditModal(record)} />
          <DeleteOutlined style={{ color: 'red', marginLeft: '12px' }} onClick={() => showDeleteModal(record)} />
        </Space>
      ),
    },
  ];
  const columns1 = [
    {
      title: '#',
      dataIndex: '',
      key: '',
      render: (id, record, index) => {
        return (page1 - 1) * paginationSize1 + index + 1;
      },
    },
    {
      title: 'Class code',
      dataIndex: 'class_code',
      key: 'class_code',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'Năm học',
      dataIndex: 'school_year',
      key: 'school_year',
    },
    {
      title: 'Học kỳ',
      dataIndex: 'semester',
      key: 'semester',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <RollbackOutlined
            style={{ color: 'green', marginLeft: '12px' }}
            value={record.id}
            onClick={() => showRecoveModal(record)}
          />
        </Space>
      ),
    },
  ];

  const [dataSource, setdataSource] = useState();
  const [classHasDelete, setclassHasDelete] = useState();
  const currentUser = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  // function refresh
  const refreshData = async () => {
    // const useID = currentUser?.currentUser?.id;

    // if (!useID) {
    //   return;
    // }

    const { data, err } = await supabase
      .from('classes')
      .select('*')
      .eq('is_delete', false)
      .order('created_at', { ascending: false });

    setdataSource(data);

    const { data: dataisdelete } = await supabase
      .from('classes')
      .select('*')
      .eq('is_delete', true)
      .order('created_at', { ascending: false });

    setclassHasDelete(dataisdelete);
  };

  useEffect(async () => {
    await refreshData();
    setTimeout(async () => {
      await setLoading(false);
    }, 2000);
  }, []);

  //xu ly modal o day
  //modal of add classes
  const [isModalOpenAddClass, setIsModalOpenAddClass] = useState(false);
  const showModal = () => {
    form.resetFields();
    setIsModalOpenAddClass(true);
  };
  const handleOkForAddClass = async e => {
    try {
      e.uid = currentUser?.currentUser?.id;

      const { error } = await supabase.from('classes').insert(e);

      refreshData();
      toast.success('Thêm lớp thành công', {
        duration: 5000,
      });
    } catch (error) {
      toast.error('somthing went wrong!', {
        duration: 5000,
      });
    }

    setIsModalOpenAddClass(false);
  };
  // modal of edit classes
  const [classEdit, setClassEdit] = useState();

  const [isModalOpenEditClass, setIsModalOpenEditClass] = useState(false);
  const showEditModal = e => {
    setClassEdit(e);
    form.setFieldsValue({
      class_code: e.class_code,
      name: e.name,
      school_year: e.school_year,
      semester: e.semester,
      description: e.description,
    });
    setIsModalOpenEditClass(true);
  };
  const handleOkEditForClass = async e => {
    try {
      e.uid = currentUser?.currentUser?.id;
      e.update_at = new Date().toISOString().toLocaleString('zh-TW');

      const { error } = await supabase.from('classes').update(e).eq('id', classEdit.id);

      if (error) throw error;
      refreshData();
      toast.success('Edit class success.', {
        duration: 5000,
      });
    } catch (err) {
      toast.error('somthing went wrong!', {
        duration: 5000,
      });
    }

    setIsModalOpenEditClass(false);
  };
  //modal delete classes
  const [isModalOpenDeleteClass, setIsModalOpenDeleteClass] = useState(false);
  const [classDelete, setClassDelete] = useState();
  const showDeleteModal = e => {
    console.log(e);

    setClassDelete(e);
    setIsModalOpenDeleteClass(true);
  };
  const handleOkDeleteClass = async () => {
    try {
      classDelete.is_delete = true;
      const { error } = await supabase.from('classes').update(classDelete).eq('id', classDelete.id);

      if (error) throw error;
      refreshData();
      toast.success('Xóa lớp thành công.', {
        duration: 5000,
      });
    } catch (err) {
      toast.error('Lỗi!', {
        duration: 5000,
      });
    }

    setIsModalOpenDeleteClass(false);
  };
  const handleCancel = () => {
    setIsModalOpenAddClass(false);
    setIsModalOpenEditClass(false);
    setIsModalOpenDeleteClass(false);
    setIsModalOpenRecoverClass(false);
  };
  //modal Recover classes
  const [isModalOpenRecoverClass, setIsModalOpenRecoverClass] = useState(false);
  const [classRecover, setClassRecover] = useState();
  const showRecoveModal = e => {
    console.log(e);
    setClassRecover(e);
    setIsModalOpenRecoverClass(e);
  };
  const handleOkRecoverClass = async () => {
    try {
      classRecover.is_delete = false;
      const { error } = await supabase.from('classes').update(classRecover).eq('id', classRecover.id);

      if (error) throw error;
      refreshData();
      toast.success('Recover class success.', {
        duration: 5000,
      });
    } catch (err) {
      toast.error('somthing went wrong!', {
        duration: 5000,
      });
    }

    setIsModalOpenRecoverClass(false);
  };
  // function for searching
  const [search, setSearch] = useState('');
  const onSearch = async e => {
    setOptions(!e ? [] : [mockVal(e), mockVal(e, 2), mockVal(e, 3)]);
    if (e === '') refreshData();

    const searchField = '%' + e + '%';
    const useID = currentUser?.currentUser?.id;
    const { data } = await supabase
      .from('classes')
      .select('*')
      .eq('is_delete', false)
      .like('name', searchField)
      .order('created_at', { ascending: false });

    setdataSource(data);

    const { data: dataisdelete } = await supabase
      .from('classes')
      .select('*')
      .eq('is_delete', true)
      .like('name', searchField)
      .order('created_at', { ascending: false });

    setclassHasDelete(dataisdelete);
    setSearch('');
  };

  return (
    <div css={styles}>
      <div className="tabs-main">
        <div className="aside-main">
          <div style={{ display: 'flex', paddingBottom: '20px' }}>
            {/* <Search
              placeholder="find Class by name..."
              onSearch={onSearch}
              enterButton
              style={{
                width: 300,
                paddingRight: '10px',
                color: '#1E90FF',
              }}
              value={search}
              onChange={e => {
                setSearch(e.target.value);
              }}
            />  */}
            <AutoComplete
              options={options}
              style={{
                width: 300,
                paddingRight: '10px',
                color: '#1E90FF',
              }}
              // onSelect={onSelect}
              onSearch={onSearch}
              onChange={e => {
                setSearch(e);
              }}
            ><Input.Search size="medium" placeholder="find Class by name..." enterButton /></AutoComplete>
            <Modal title="Add Class" open={isModalOpenAddClass} onOk={form.submit} onCancel={handleCancel}>
              <Form form={form} onFinish={handleOkForAddClass}>
                <Form.Item
                  name="class_code"
                  label="Class code"
                  rules={[
                    {
                      required: true,
                      type: 'regexp',
                      pattern: new RegExp('^[a-zA-Z0-9]{5,15}$'),
                      message: 'Input class code',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="name"
                  label="Class name"
                  rules={[
                    {
                      required: true,
                      message: 'Input class name',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="school_year"
                  label="Năm học"
                  rules={[
                    {
                      required: true,
                      message: 'Input Năm học',
                    },
                  ]}
                >
                  <Select>
                    <Select.Option value="2019-2020">2019-2020</Select.Option>
                    <Select.Option value="2020-2021">2020-2021</Select.Option>
                    <Select.Option value="2021-2022">2021-2022</Select.Option>
                    <Select.Option value="2022-2023">2022-2023</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="semester"
                  label="semester"
                  rules={[
                    {
                      required: true,
                      message: 'choose semester',
                    },
                  ]}
                >
                  <Select>
                    <Select.Option value="I">I</Select.Option>
                    <Select.Option value="II">II</Select.Option>
                    <Select.Option value="vacation">vacation</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name="description" label="Description">
                  <Input type="textarea" />
                </Form.Item>
              </Form>
            </Modal>
            <Modal title="Edit Class" open={isModalOpenEditClass} onOk={form.submit} onCancel={handleCancel}>
              <Form form={form} onFinish={handleOkEditForClass}>
                <Form.Item
                  name="class_code"
                  label="Class code"
                  rules={[
                    {
                      required: true,
                      message: 'Input class code',
                    },
                  ]}
                >
                  <Input className="test" />
                </Form.Item>
                <Form.Item
                  name="name"
                  label="Class name"
                  rules={[
                    {
                      required: true,
                      message: 'Input class name',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="school_year"
                  label="Năm học"
                  rules={[
                    {
                      required: true,
                      message: 'Input Năm học',
                    },
                  ]}
                >
                  <Select>
                    <Select.Option value="2019-2020">2019-2020</Select.Option>
                    <Select.Option value="2020-2021">2020-2021</Select.Option>
                    <Select.Option value="2021-2022">2021-2022</Select.Option>
                    <Select.Option value="2022-2023">2022-2023</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="semester"
                  label="semester"
                  rules={[
                    {
                      required: true,
                      message: 'choose semester',
                    },
                  ]}
                >
                  <Select>
                    <Select.Option value="I">I</Select.Option>
                    <Select.Option value="II">II</Select.Option>
                    <Select.Option value="vacation">vacation</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name="description" label="Description">
                  <Input type="textarea" />
                </Form.Item>
              </Form>
            </Modal>
            <Modal
              title="Xóa lớp"
              open={isModalOpenDeleteClass}
              onOk={form.submit}
              onCancel={handleCancel}
              okButtonProps={{
                className: 'button-delete-modal',
                style: {
                  color: 'red',
                },
                type: 'ghost',
              }}
            >
              <Form form={form} onFinish={handleOkDeleteClass}>
                <h4>Bạn có chắc muốn xóa lớp ?</h4>
              </Form>
            </Modal>
            <Modal
              title="Recover Class"
              open={isModalOpenRecoverClass}
              onOk={form.submit}
              onCancel={handleCancel}
              // okButtonProps={{
              //   className: 'button-delete-modal',
              //   style: {
              //     color: 'red',
              //   },
              //   type: 'ghost',
              // }}
            >
              <Form form={form} onFinish={handleOkRecoverClass}>
                <h4>Do you want recover class ?</h4>
              </Form>
            </Modal>
          </div>
          <div
            className="content-table"
            style={{
              overflow: 'auto',
              height: '100%',
              width: '100%',
              borderRadius: '6px',
              boxShadow: '0 4px 28px rgba(123,151,158,.25)',
              border: '1px solid #d6dee1',
              padding: '1rem',
            }}
          >
            <div className="table">
              <h3>Lớp hiện có</h3>
              <Table
                pagination={{
                  onChange(current, pageSize) {
                    setpage(current);
                    setPaginationSize(pageSize);
                  },
                  defaultPageSize: 10,
                }}
                dataSource={dataSource}
                columns={columns}
                bordered
                loading={loading}
                scroll={{
                  y: 240,
                }}
              />
            </div>
            <div className="table" style={{ marginTop: '0', paddingTop: '0' }}>
              <h3>Lớp đã xóa</h3>
              <Table
                pagination={{
                  onChange(current, pageSize) {
                    setpage1(current);
                    setPaginationSize1(pageSize);
                  },
                  defaultPageSize: 5,
                }}
                dataSource={classHasDelete}
                columns={columns1}
                bordered
                loading={loading}
                scroll={{
                  y: 240,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const styles = css`
  display: flex;
  flex-direction: column;
  .tabs-main {
    flex: 1;
    display: flex;
    overflow: hidden;
  }
  .search {
    margin-bottom: 10px;
  }

  .aside-main {
    display: flex;
    flex: 1;
    overflow: hidden;
    flex-direction: column;
    // padding: 20px;
    margin: 0 30px 30px 30px;
  }

  // .table {
  //   flex: 1;
  //   overflow: hidden;
  //   height: auto;
  // }
  // .button-delete-modal {
  //   color: 'red';
  // }
  // .content-table {
  //   ::-webkit-scrollbar {
  //     width: 20px;
  //   }

  //   ::-webkit-scrollbar-track {
  //     background-color: transparent;
  //   }

  //   ::-webkit-scrollbar-thumb {
  //     background-color: #d6dee1;
  //     border-radius: 20px;
  //     border: 6px solid transparent;
  //     background-clip: content-box;
  //   }

  //   ::-webkit-scrollbar-thumb:hover {
  //     background-color: #a8bbbf;
  //   }
  }
`;
export default Admin_page;
