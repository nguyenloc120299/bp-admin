import { BreadcrumbProps, Button, Form, Input, Popover, message, notification } from 'antd';
import React, { useRef, useState } from 'react'
import { webRoutes } from '../../routes/web';
import { Link } from 'react-router-dom';
import BasePageContainer from '../layout/PageContainer';
import { ActionType, ProColumns, ProTable, RequestData } from '@ant-design/pro-components';
import { FiCheckCircle, FiUsers } from 'react-icons/fi';
import http from '../../utils/http';
import { apiRoutes } from '../../routes/api';
import { handleErrorResponse } from '../../utils';
import { CiCircleCheck } from 'react-icons/ci';
import { RiCloseCircleLine } from 'react-icons/ri';
import LoadingScreen from '../common/LoadingScreen';
import { useTranslation } from 'react-i18next';

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

const Code = () => {
    const actionRef = useRef<ActionType>();
    const [loading, setLoading] = useState(false)
    const { t } = useTranslation()

    const columns: ProColumns[] = [
        {
            title: t('Mã giới thiệu'),

            sorter: false,
            align: 'center',
            ellipsis: true,
            render: (_, row: any) => (
                <div className="flex flex-col gap-1">
                    {row?.code}
                </div>
            ),
        },

        {
            title: t('Ngày tạo'),
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
            render: (_, row: any) =>

                <div className="flex items-center justify-center gap-1">

                    <Button
                        className="!bg-red-600 text-[#fff] font-[700]"
                        onClick={async () => {
                            setLoading(true)
                            try {
                                const res = await http.post(apiRoutes.deleteCode, {
                                    id: row?._id
                                })
                                if (res && res.data) {
                                    message.success("Đã xoá thành công")
                                    actionRef.current?.reload()
                                }
                            } catch (error) {
                                console.log(error);

                            }
                            setLoading(false)
                        }}
                    >
                        <RiCloseCircleLine />
                    </Button>
                </div>

        },
    ];

    return (
        <BasePageContainer breadcrumb={breadcrumb}>
            <LoadingScreen spinning={loading} />
            <div className='my-5'>
                <Popover trigger={'click'} content={
                    <Form layout='vertical'
                        onFinish={async (form) => {
                            setLoading(true)
                            try {
                                const res = await http.post(apiRoutes.addCode, {
                                    ...form
                                })
                                if (res && res.data) {
                                    message.success("Đã thêm")
                                    actionRef.current?.reload()
                                }
                            } catch (error) {
                                console.log(error);

                            }
                            setLoading(false)
                        }}
                    >
                        <Form.Item name="code" label={t("Nhập mã giới thiệu")}>
                            <Input placeholder={t('Nhập mã')} />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType='submit'>{t("Tạo")}</Button>
                        </Form.Item>
                    </Form>
                }>
                    <Button>
                        {t("Tạo Mã")}
                    </Button>
                </Popover>
            </div>
            <ProTable
                columns={columns}
                cardBordered={false}
                cardProps={{
                    subTitle: t('Mã giới thiệu'),
                    tooltip: {
                        className: 'opacity-60',
                        title: t('Mã giới thiệu'),
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
                        .get(apiRoutes.getCode, {
                            params: {
                                page: params.current,
                                per_page: params.pageSize,
                            },
                        })
                        .then((response) => {
                            const data: any = response.data.data?.codes;

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
    )
}

export default Code