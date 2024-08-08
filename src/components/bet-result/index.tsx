import {
  BreadcrumbProps,
  Button,
  Form,
  Input,
  Popover,
  Tabs,
  TabsProps,
  message,
  notification,
} from 'antd';
import React, { useRef, useState } from 'react';
import { webRoutes } from '../../routes/web';
import { Link } from 'react-router-dom';
import BasePageContainer from '../layout/PageContainer';
import {
  ActionType,
  ProColumns,
  ProTable,
  RequestData,
} from '@ant-design/pro-components';
import { FiCheckCircle, FiUsers } from 'react-icons/fi';
import http from '../../utils/http';
import { apiRoutes } from '../../routes/api';
import { handleErrorResponse } from '../../utils';
import { CiCircleCheck } from 'react-icons/ci';
import { RiCloseCircleLine, RiEditCircleLine } from 'react-icons/ri';
import LoadingScreen from '../common/LoadingScreen';
import { useTranslation } from 'react-i18next';
import Countdown from 'react-countdown';

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Dashboard</Link>,
    },
    {
      key: webRoutes.users,
      title: <Link to={webRoutes.code}>Code</Link>,
    },
  ],
};

const BingoResult = () => {
  const actionRef = useRef<ActionType>();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [category, setCategory] = useState('bingo_1');
  const items: TabsProps['items'] = [
    {
      key: 'bingo_1',
      label: 'Bingo 1p',
    },
    {
      key: 'bingo_2',
      label: 'Bingo 3p',
    },
    {
      key: 'bingo_3',
      label: 'Bingo 5p',
    },
  ];
  const Completionist = () => <span>TimeEnd</span>;
  const renderer = (props: any) => {
    if (props?.completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {props?.hours}:{props?.minutes}:{props?.seconds}
        </span>
      );
    }
  };
  const columns: ProColumns[] = [
    {
      title: t('Bet ID'),

      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: any) => (
        <div className="flex flex-col gap-1">{row?._id}</div>
      ),
    },
    {
      title: t('Kì'),

      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: any) => (
        <div className="flex flex-col gap-1">{row?.issue_no}</div>
      ),
    },

    {
      title: t('Kết quả'),
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: any) => <div>{row?.results}</div>,
    },
    {
      title: t('Thời gian'),
      sorter: false,
      align: 'center',
      ellipsis: true,
      render: (_, row: any) => (
        <div>
          <Countdown date={row?.timeEnd} renderer={renderer} />
        </div>
      ),
    },
    {
      title: 'Action',
      align: 'center',
      key: 'option',
      fixed: 'right',
      render: (_, row: any) => (
        <div className="flex items-center justify-center gap-1">
          <Popover
            trigger={'click'}
            content={
              <Form
              initialValues={{
                num1:row?.results[0],
                num2:row?.results[1],
                num3:row?.results[2],
              }}
                onFinish={async (form: any) => {
                  try {
                    const results = [form?.num1, form?.num2, form?.num3];
                    const res = await http.post(apiRoutes.updateBetResult, {
                      results,
                      bet_id: row?._id,
                    });
                    if(res && res.data){
                        actionRef.current?.reload()
                    }
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                <Form.Item name="num1">
                  <Input placeholder="Number 1" required />
                </Form.Item>
                <Form.Item name="num2">
                  <Input placeholder="Number 2" required />
                </Form.Item>
                <Form.Item name="num3">
                  <Input placeholder="Number 3" required />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit">Update</Button>
                </Form.Item>
              </Form>
            }
          >
            <Button className="!bg-yellow-600 text-[#fff] font-[700]">
              <RiEditCircleLine />
            </Button>
          </Popover>
        </div>
      ),
    },
  ];
  const onChange = (key: string) => {
    setCategory(key);
    actionRef.current?.reload();
  };
  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <LoadingScreen spinning={loading} />
      <Tabs defaultActiveKey="bingo_1" items={items} onChange={onChange} />

      <ProTable
        columns={columns}
        cardBordered={false}
        cardProps={{
          subTitle: t('Bingo Result'),
          tooltip: {
            className: 'opacity-60',
            title: t('Bingo Result'),
          },
          title: <FiCheckCircle className="opacity-60" />,
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
            .get(apiRoutes.getBetResult + category, {
              params: {
                page: params.current,
                per_page: params.pageSize,
              },
            })
            .then((response) => {
              const data: any = response.data.data?.results;

              return {
                data,
                success: true,
                total: response.data.data?.total,
              } as RequestData<any>;
            })
            .catch((error) => {
              handleErrorResponse(error);

              return {
                data: [],
                success: false,
              } as RequestData<any>;
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

export default BingoResult;
