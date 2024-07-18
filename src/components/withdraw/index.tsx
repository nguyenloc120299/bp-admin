import {
  ActionType,
  ProTable,
  ProColumns,
  RequestData,
  ProDescriptions,
} from '@ant-design/pro-components';
import { BreadcrumbProps, Button, Tag, notification } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { User } from '../../interfaces/models/user';
import { apiRoutes } from '../../routes/api';
import { webRoutes } from '../../routes/web';
import { handleErrorResponse } from '../../utils';
import http from '../../utils/http';
import BasePageContainer from '../layout/PageContainer';

import Icon, { CheckOutlined } from '@ant-design/icons';
import { formatNumber } from '../../utils/helpers';
import LoadingScreen from '../common/LoadingScreen';

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Dashboard</Link>,
    },
    {
      key: webRoutes.users,
      title: <Link to={webRoutes.users}>Withdraw</Link>,
    },
  ],
};

const Withdraw = () => {
  const actionRef = useRef<ActionType>();
  const [totalWithdraw, setTotalWithdraw] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const getTotalWithdraw = async () => {
    try {
      const res = await http.get(apiRoutes.getStatisticsPayment);
      if (res && res.data) {
        setTotalWithdraw(res.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotalWithdraw();
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
            <div>ID:</div>
            <div>{row?.user?._id}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Rút',
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
            <div>Phương thức thanh toán:</div>
            <div className="text-green-600 font-bold">Crypto</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Thông tin',
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: any) => (
        <>
          <div className="flex items-center justify-between gap-1">
            <div>Địa chỉ nhận:</div>
            <div className=" font-bold">{row?.from}</div>
          </div>
          <div className="flex items-center justify-between gap-1">
            <div>Mạng lưới:</div>
            <div className=" font-bold">{row?.network}</div>
          </div>
        </>
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
              <Tag color="green-inverse">Done</Tag>
            ) : row?.transaction_status === 'pending' ? (
              <Tag color="orange-inverse">Pending</Tag>
            ) : (
              <Tag color="red-inverse">Cancel</Tag>
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
    {
      title: 'Action',
      align: 'center',
      key: 'option',
      fixed: 'right',
      render: (_, row: any) => (
        <div className="flex gap-2 items-center">
          {row?.transaction_status === 'pending' ? (
            <>
              <div className="flex items-center gap-1">
                <Button
                  className="!bg-green-600 text-[#fff] font-[700]"
                  onClick={() => handleWithdraw(row?._id, true)}
                >
                  Duyệt
                </Button>
                <Button
                  className="!bg-red-600 text-[#fff] font-[700]"
                  onClick={() => handleWithdraw(row?._id, false)}
                >
                  Từ chối
                </Button>
              </div>
            </>
          ) : (
            <div className="font-bold">
              <CheckOutlined />
            </div>
          )}
          <Button
            className="!bg-red-600 text-[#fff] font-[700]"
            onClick={() => handleDeleteTran(row?._id)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  const handleWithdraw = async (transId: string, isResolve: boolean) => {
    setLoading(true);
    try {
      const res = await http.post(apiRoutes.handleWithdraw, {
        transId,
        isResolve,
      });
      if (res && res.data) {
        notification.success({
          message: res.data?.message,
          duration: 10,
        });

        actionRef?.current?.reload();
      }
    } catch (error: any) {
      notification.error({
        message: error?.response?.data?.message,
        duration: 10,
      });
    }
    setLoading(false);
  };

  const handleDeleteTran = async (transId: string) => {
    setLoading(true);
    try {
      const res = await http.post(apiRoutes.handleDeleteTransaction, {
        transId,
      });
      if (res && res.data) {
        notification.success({
          message: res.data?.message,
          duration: 10,
        });

        actionRef?.current?.reload();
      }
    } catch (error: any) {
      notification.error({
        message: error?.response?.data?.message,
        duration: 10,
      });
    }
    setLoading(false);
  };

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <LoadingScreen spinning={loading} />

      <ProTable
        columns={columns}
        cardBordered={false}
        cardProps={{
          subTitle: 'Rút tiền',
          tooltip: {
            className: 'opacity-60',
            title: 'Rút tiền',
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
            .get(apiRoutes.getWithdraw, {
              params: {
                page: params.current,
                per_page: params.pageSize,
              },
            })
            .then((response) => {
              const data: any = response.data.data.withdrawls;

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
    </BasePageContainer>
  );
};

export default Withdraw;
