//

import React, { useEffect, useState } from 'react';
import BasePageContainer from '../layout/PageContainer';
import { BreadcrumbProps, Card } from 'antd';
import { webRoutes } from '../../routes/web';
import { Link } from 'react-router-dom';
import http from '../../utils/http';
import { apiRoutes } from '../../routes/api';
import { formatNumber } from '../../utils/helpers';

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Dashboard</Link>,
    },
  ],
};

const Dashboard = () => {
  const [data, setData] = useState<any>(null)

  const getDataDashboard = async () => {
    try {
      const res = await http.get(apiRoutes.dashboarData);
      if (res && res.data) {
        setData(res?.data?.data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataDashboard()
  }, [])
  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-3'>
        <Card title="User" className='shadow-md'>
          <div className='flex gap-2 items-center'>
            <div>
              Tổng:
            </div>
            <div className='font-bold'>{data?.totalUser || "-"}</div>
          </div>
          <div className='flex gap-2 items-center'>
            <div>
              Tổng hôm nay:
            </div>
            <div className='font-bold'>{data?.totalUserNow || "-"}</div>
          </div>
        </Card>
        <Card title="Nạp tiền" className='shadow-md'>
          <div className='flex gap-2 items-center'>
            <div>
              Tổng:
            </div>
            <div className='font-bold'>{data?.depositCount || "-"}</div>
          </div>
          <div className='flex gap-2 items-center'>
            <div>
              Tổng hôm nay:
            </div>
            <div className='font-bold'>{data?.depositCountNow || "-"}</div>
          </div>
          <div className='flex gap-2 items-center'>
            <div>
              Tổng tiền nạp:
            </div>
            <div className='font-bold'>{formatNumber(data?.depositTotal?.toFixed(2)) || "-"} $</div>
          </div>
          <div className='flex gap-2 items-center'>
            <div>
              Tổng tiền hôm nay:
            </div>
            <div className='font-bold'>{formatNumber(data?.depositTotalToday?.toFixed(2)) || "-"} $</div>
          </div>
        </Card>
        <Card title="Rút tiền" className='shadow-md'>
          <div className='flex gap-2 items-center'>
            <div>
              Tổng:
            </div>
            <div className='font-bold'>{data?.withdrawlsCount || "-"}</div>
          </div>
          <div className='flex gap-2 items-center'>
            <div>
              Tổng hôm nay:
            </div>
            <div className='font-bold'>{data?.withdrawlsCountNow || "-"}</div>
          </div>
          <div className='flex gap-2 items-center'>
            <div>
              Tổng tiền rút:
            </div>
            <div className='font-bold'>{formatNumber(data?.withdrawalsTotal?.toFixed(2)) || "-"} $</div>
          </div>
          <div className='flex gap-2 items-center'>
            <div>
              Tổng tiền hôm nay:
            </div>
            <div className='font-bold'>{formatNumber(data?.withdrawalsTotalToday?.toFixed(2)) || "-"} $</div>
          </div>
        </Card>

      </div>
    </BasePageContainer>
  );
};

export default Dashboard;
