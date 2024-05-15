import { BreadcrumbProps } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { webRoutes } from '../../routes/web';
import { Link } from 'react-router-dom';
import BasePageContainer from '../layout/PageContainer';
import { DataContext } from '../../context/SocketProvider';
import http from '../../utils/http';
import { apiRoutes } from '../../routes/api';
import clsx from 'clsx';
import { formatNumber } from '../../utils/helpers';
const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Dashboard</Link>,
    },
    {
      key: webRoutes.bet,
      title: <Link to={webRoutes.deposit}>Bet</Link>,
    },
  ],
};

const Bet = () => {
  const [second, setSecond] = useState('');
  const [isBet, setIsBet] = useState(false);
  const [data, setData] = useState<any>({});
  const [memberTransactions, setMemberTransactions] = useState<any>();

  const { socket } = useContext(DataContext);

  const getAnalytic = async () => {
    try {
      const res = await http.get(apiRoutes.getAnalyticData);
      if (res && res.data) {
        setMemberTransactions(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (socket) {
      socket.on('WE_PRICE', (we_price: any) => {
        const { second, isBet } = we_price;
        setData({
          second,
          isBet,
        });
      });
    }

  }, [socket]);

  useEffect(() => {
    if (socket)
      socket.on('analytic', (data: any) => {
        setMemberTransactions(data)
      });
  }, [socket]);

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <div className="flex items-center gap-[20px] mb-4">
        <h3 className="text-[16px] font-[700]">
          Thời gian còn lại :{' '}
          <span className="text-yellow-700">{data?.second}s </span>
        </h3>
        <h3 className="text-[16px] font-[700]">
          Trạng thái đặt cược :{' '}
          <span
            className={clsx({
              'text-green-700': data?.isBet,
              'text-red-700': !data?.isBet,
            })}
          >
            {data?.isBet ? 'Đang chờ đặt lệnh' : 'Đang chờ kết quả'}
          </span>
        </h3>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                UserId
              </th>
              <th scope="col" className="px-6 py-3">
                Mua/Bán
              </th>
              <th scope="col" className="px-6 py-3">
                Số tiền cược
              </th>
            </tr>
          </thead>
          <tbody>
            {!!memberTransactions?.userBets?.length &&
              memberTransactions?.userBets?.map((i: any, index: number) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {i?.user?.email}
                  </th>
                  <td className="px-6 py-4">{i?.user?._id}</td>
                  <td className="px-6 py-4">{i?.bet_condition}</td>
                  <td className="px-6 py-4">{formatNumber(i?.bet_value)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </BasePageContainer>
  );
};

export default Bet;
