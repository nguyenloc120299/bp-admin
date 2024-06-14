import {
  ActionType,
  ProTable,
  ProColumns,
  RequestData,
  TableDropdown,
  ProDescriptions,
} from '@ant-design/pro-components';
import {
  Avatar,
  BreadcrumbProps,
  Modal,
  Space,
  Spin,
  Tag,
  notification,
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import { FiUsers } from 'react-icons/fi';
import { CiCircleMore } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { User } from '../../interfaces/models/user';
import { apiRoutes } from '../../routes/api';
import { webRoutes } from '../../routes/web';
import {
  handleErrorResponse,
  NotificationType,
  showNotification,
} from '../../utils';
import http from '../../utils/http';
import BasePageContainer from '../layout/PageContainer';

import Icon, {
  ExclamationCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { formatNumber } from '../../utils/helpers';

enum ActionKey {
  DELETE = 'delete',
}

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Dashboard</Link>,
    },
    {
      key: webRoutes.users,
      title: <Link to={webRoutes.deposit}>Deposit</Link>,
    },
  ],
};

const Deposit = () => {
  const actionRef = useRef<ActionType>();
  const [modal, modalContextHolder] = Modal.useModal();
  const [totalDeposit, setTotalDeposit] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const getPaymentType = (payment_type: string) => {
    switch (payment_type) {
      case '1':
        return 'Ngân hàng';
      case '2':
        return 'MoMo';
      case '3':
        return 'Zalopay';

      default:
        break;
    }
  };
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

  const getTotalDeposit = async () => {
    try {
      const res = await http.get(apiRoutes.getStatisticsPayment);
      if (res && res.data) {
        setTotalDeposit(res.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotalDeposit();
  }, []);
  const columns: ProColumns[] = [
    {
      title: 'Tài khoản',

      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: any) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-1">
            <div>Email:</div>
            <div>{row?.user?.email}</div>
          </div>
          <div className="flex items-center justify-between gap-1">
            <div>Nickname:</div>
            <div>{row?.user?.user_name}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Nạp',
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: any) => (
        <div className="flex flex-col gap-1">
          {' '}
          <div className="flex items-center justify-between gap-1">
            <div>Số lượng:</div>
            <div className="text-yellow-700 font-bold">
              {formatNumber(row?.value)} USDT
            </div>
          </div>
          <div className="flex items-center justify-between gap-1">
            <div>Tổng tiền:</div>
            <div className="text-yellow-700 font-bold">
              {formatNumber(row?.fiat_amount?.toFixed(0))} VND
            </div>
          </div>
          <div className="flex items-center justify-between gap-1">
            <div>Phương thức thanh toán:</div>
            <div className="text-green-600 font-bold">
              {getPaymentType(row?.payment_type)}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Ghi chú',
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: any) => (
        <div className="flex flex-col gap-1 text-center">
          {row?.note ? row?.note : '-'}
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: any) => (
        <div className="flex flex-col gap-1">
          {' '}
          <div className="flex items-center justify-between gap-1">
            {row?.transaction_status === 'finish' ? (
              <Tag color="success">Hoàn thành</Tag>
            ) : row?.transaction_status === 'pending' ? (
              <Tag color="warning">Đang chờ</Tag>
            ) : (
              <Tag color="red">Đã hủy</Tag>
            )}
          </div>
        </div>
      ),
    },
    {
      title: 'Ngày tạo',
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: any) => (
        <div>{new Date(row?.createdAt).toLocaleString()}</div>
      ),
    },
  ];

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <div className="flex gap-3 lg:gap-10 items-center flex-wrap">
        <div className="flex items-center text-lg font-bold text-red-500 lg:my-6 gap-2">
          <p>Tổng USDT Nạp: </p>
          <p> {formatNumber(totalDeposit?.totalValueDeposit)} USDT</p>
        </div>
        <div className="flex items-center text-lg font-bold text-green-500 lg:my-6 gap-2">
          <p>Tổng tiền nạp: </p>
          <p> {formatNumber(totalDeposit?.totalValueFiat)} VNĐ</p>
        </div>
      </div>

      <ProTable
        columns={columns}
        cardBordered={false}
        cardProps={{
          subTitle: 'Nạp tiền',
          tooltip: {
            className: 'opacity-60',
            title: 'Thông tin nạp tiền',
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
            .get(apiRoutes.getDeposit, {
              params: {
                page: params.current,
                per_page: params.pageSize,
              },
            })
            .then((response) => {
              const data: any = response.data.data.deposits;

              return {
                data,
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
        search={false}
        rowKey="id"
        options={{
          search: false,
        }}
      />
      {modalContextHolder}
    </BasePageContainer>
  );
};

export default Deposit;
