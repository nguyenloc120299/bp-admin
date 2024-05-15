import {
  ActionType,
  ProTable,
  ProColumns,
  RequestData,
  TableDropdown,
  ProDescriptions,
} from '@ant-design/pro-components';
import {
  BreadcrumbProps,
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Space,
  message,
  notification,
} from 'antd';
import { useRef, useState } from 'react';
import { FiUsers, FiEdit, FiClipboard, FiCheck } from 'react-icons/fi';
import { CiCircleMore } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { User } from '../../interfaces/models/user';
import { apiRoutes } from '../../routes/api';
import { webRoutes } from '../../routes/web';
import { handleErrorResponse } from '../../utils';
import http from '../../utils/http';
import BasePageContainer from '../layout/PageContainer';

import Icon, { DeleteOutlined } from '@ant-design/icons';
import { formatNumber, shortenEthAddress } from '../../utils/helpers';
import useCopyToClipboard from '../hooks/useCopyClipboard';
import LoadingScreen from '../common/LoadingScreen';

enum ActionKey {
  DELETE = 'delete',
  EDIT = 'edit',
}

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Dashboard</Link>,
    },
    {
      key: webRoutes.users,
      title: <Link to={webRoutes.users}>Users</Link>,
    },
  ],
};

const Users = () => {
  const actionRef = useRef<ActionType>();

  const [selectedUserEdit, setSelectedUserEdit] = useState<any>(null);
  const [modal, modalContextHolder] = Modal.useModal();
  const [loading, setLoading] = useState(false);
  const { copied, copyToClipboard } = useCopyToClipboard();

  const handleDeleteUser = async (user: any) => {
    setLoading(true);
    try {
      const res = await http.delete(apiRoutes.deleteUser, {
        data: {
          userId: user?._id,
        },
      });
      if (res && res.data) {
        notification.success({
          message: res?.data?.message,
          duration: 10,
        });
        actionRef?.current?.reload();
      }
    } catch (error: any) {
      notification.error({
        message: error?.response?.data?.message || 'Có lỗi xảy ra',
        duration: 10,
      });
    }
    setLoading(false);
  };

  const columns: ProColumns[] = [
    {
      title: 'Tài khoản',

      sorter: false,
      align: 'center',
      ellipsis: true,

      render: (_, row: any) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-1">
            <div>Id:</div>
            <div>{row?._id}</div>
          </div>
          <div className="flex items-center justify-between gap-1">
            <div>Email:</div>
            <div>{row?.email}</div>
          </div>
          <div className="flex items-center justify-between gap-1">
            <div>---Mật khẩu:</div>
            <div>{row?.password}</div>
          </div>
          <div className="flex items-center justify-between gap-1">
            <div>***Tổng Nạp:</div>
            <div className="text-green-600 font-bold">{formatNumber(row?.totalDeposit)}$</div>
          </div>
          <div className="flex items-center justify-between gap-1">
            <div>***Tổng Rút:</div>
            <div className="text-green-600 font-bold">{formatNumber(row?.totalWithdraw)}$</div>
          </div>
          <div className="flex items-center justify-between gap-1">
            <div>***Tổng chơi:</div>
            <div className="text-yellow-600 font-bold">
              {row?.countTotalBet}
            </div>
          </div>
          <div className="flex items-center justify-between gap-1">
            <div>***Tổng thắng:</div>
            <div className="text-green-600 font-bold">{row?.countTotalWin}</div>
          </div>
          <div className="flex items-center justify-between gap-1">
            <div>***Tổng thua:</div>
            <div className="text-red-600 font-bold">{row?.countTotalLose}</div>
          </div>
          <div className="flex items-center justify-between gap-1">
            <div>***Lời:</div>
            <div className="text-green-900 font-bold">{row?.totalValue}$</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Ví',
      sorter: false,
      align: 'center',
      ellipsis: true,
      search: false,
      render: (_, row: any) => (
        <div className="flex flex-col gap-1">
          {' '}
          <div className="flex items-center justify-between gap-1">
            <div>Nickname:</div>
            <div className="text-black font-bold">{row?.user_name}</div>
          </div>
          <div className="flex items-center justify-between gap-1">
            <div>Demo:</div>
            <div className="text-yellow-700 font-bold">{row?.demo_balance}</div>
          </div>
          <div className="flex items-center justify-between gap-1">
            <div>Thực:</div>
            <div className="text-yellow-700 font-bold">{row?.real_balance}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Phương thức thanh toán',
      sorter: false,
      align: 'center',
      ellipsis: true,
      search: false,
      render: (_, row: any) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-1">
            <div>Tên Ngân Hàng:</div>
            <div className="text-black font-bold">{row?.name_bank || '-'}</div>
          </div>
          <div className="flex items-center justify-between gap-1">
            <div>Số tài khoản:</div>
            <div className="text-black font-bold">
              {row?.number_bank || '-'}
            </div>
          </div>
          <div className="flex items-center justify-between gap-1">
            <div>Tên chủ thẻ:</div>
            <div className="text-black font-bold">
              {row?.account_name || '-'}
            </div>
          </div>
          <div className="flex items-center justify-between gap-1">
            <div>Địa chỉ ví:</div>
            <div className="text-black font-bold flex items-center gap-1">
              {row?.address ? shortenEthAddress(row?.address) : '-'}
              {row?.address && (
                <FiClipboard
                  className="text-[12px]"
                  onClick={() => {
                    copyToClipboard(row?.address);
                    message.success('Copied');
                  }}
                />
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Ngày tạo',
      sorter: false,
      align: 'center',
      ellipsis: true,
      search: false,
      render: (_, row: any) => (
        <div>{new Date(row?.createdAt).toLocaleString()}</div>
      ),
    },
    {
      title: 'Action',
      align: 'center',
      key: 'option',
      fixed: 'right',
      search: false,
      render: (_, row: User) => [
        <TableDropdown
          key="actionGroup"
          onSelect={(key) => handleActionOnSelect(key, row)}
          menus={[
            {
              key: ActionKey.DELETE,
              name: (
                <Space>
                  <DeleteOutlined />
                  Delete
                </Space>
              ),
            },
            {
              key: ActionKey.EDIT,
              name: (
                <Space>
                  <FiEdit />
                  Cập nhật thông tin
                </Space>
              ),
            },
          ]}
        >
          <Icon component={CiCircleMore} className="text-primary text-xl" />
        </TableDropdown>,
      ],
    },
  ];

  const handleUpdateUser = async(form: any)=>{
    setLoading(true)
    try {
      const res = await http.post(apiRoutes.updateUser,{
        userId:selectedUserEdit?._id,
        ...form
      })
      if(res && res.data){
        notification.success({
          message:res.data.message,
          duration:10
        })
        setSelectedUserEdit(null)
        actionRef.current?.reload()
      }
    } catch (error: any) {
      console.log(error);
      
      notification.error({
        message:error?.response?.data?.message,
        duration:10
      })
    }
    setLoading(false)
  }
  const handleActionOnSelect = (key: string, user: any) => {
    if (key === ActionKey.DELETE) {
      handleDeleteUser(user);
    }
    if (key === ActionKey.EDIT) {
      setSelectedUserEdit(user);
    }
  };

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <LoadingScreen spinning={loading}/>
      {selectedUserEdit && (
        <Modal
          open={selectedUserEdit}
          title="Cập nhật thông tin"
          onCancel={() => setSelectedUserEdit(null)}
          centered
          footer={null}
        >
          <Form layout="vertical" initialValues={selectedUserEdit} onFinish={handleUpdateUser}>
            <Form.Item
              name={'real_balance'}
              label="Số dư thực"
              className="mb-3"
            >
              <InputNumber className="w-full" type="number" placeholder="0" />
            </Form.Item>
            <Form.Item name={'user_name'} label="Nick Name" className="mb-3">
              <Input placeholder="Nhập Nick Name" />
            </Form.Item>
            <Form.Item name={'password'} label="Mật khẩu" className="mb-3">
              <Input placeholder="Nhập mật khẩu" />
            </Form.Item>
            <small className="mb-3">Phương thức thanh toán</small>
            <Form.Item
              name={'name_bank'}
              label="Tên Ngân Hàng"
              className="mb-3"
            >
              <Input className="w-full" placeholder="Nhập tên ngân hàng" />
            </Form.Item>
            <Form.Item
              name={'number_bank'}
              label="Số tài khoản"
              className="mb-3"
            >
              <Input placeholder="Nhập Số tài khoản" />
            </Form.Item>
            <Form.Item
              name={'account_name'}
              label="Tên chủ thẻ"
              className="mb-3"
            >
              <Input className="w-full" placeholder="Nhập tên chủ thẻ" />
            </Form.Item>
            <Form.Item name={'address'} label="Địa chỉ ví" className="mb-3">
              <Input placeholder="Nhập địa chỉ ví" />
            </Form.Item>
            <Form.Item className="mb-3">
              <Button htmlType='submit'>Submit</Button>
            </Form.Item>
          </Form>
        </Modal>
      )}

      <ProTable
        columns={columns}
        cardBordered={false}
        cardProps={{
          subTitle: 'Users',
          tooltip: {
            className: 'opacity-60',
            title: 'Mocked data',
          },
          title: <FiUsers className="opacity-60" />,
        }}
        bordered={true}
        showSorterTooltip={false}
        scroll={{ x: true }}
        tableLayout={'fixed'}
        rowSelection={false}
        pagination={{
          showQuickJumper: true,
          pageSize: 20,
        }}
        actionRef={actionRef}
        request={(params) => {
          return http
            .get(apiRoutes.users, {
              params: {
                page: params.current,
                per_page: params.pageSize,
                search: params.keyword,
              },
            })
            .then((response) => {
              const users: any = response.data.data.users;

              return {
                data: users,
                success: true,
                total: response.data.data?.total,
              } as RequestData<User>;
            })
            .catch((error) => {
              handleErrorResponse(error);

              return {
                data: [],
                success: false,
              } as RequestData<User>;
            });
        }}
        dateFormatter="string"
        options={{
          search: {
            placeholder: 'Tìm kiếm theo ID,Username, Email,...',
            width: 100,
            allowClear: true,
          },
        }}
        rowKey="_id"
        search={false}
      />
      {modalContextHolder}
    </BasePageContainer>
  );
};

export default Users;
