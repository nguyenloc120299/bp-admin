import React, { useEffect, useState } from 'react';
import BasePageContainer from '../layout/PageContainer';
import {
  BreadcrumbProps,
  Button,
  Form,
  Input,
  Popover,
  Spin,
  Upload,
  message,
} from 'antd';
import { webRoutes } from '../../routes/web';
import { Link } from 'react-router-dom';
import http from '../../utils/http';
import { API_URL } from '../../utils';
import LoadingScreen from '../common/LoadingScreen';
import { UploadProps } from 'antd/lib/upload';
import { useTranslation } from 'react-i18next';

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Dashboard</Link>,
    },
    {
      key: webRoutes.setting,
      title: <Link to={webRoutes.setting}>Cài đặt</Link>,
    },
  ],
};

const Setting = () => {
  const [configs, setConfigs] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { i18n, t } = useTranslation()

  const getConfigs = async () => {
    try {
      const res = await http.get(`${API_URL}/configs`);
      if (res && res.data) {
        const result = res.data.data.reduce((acc: any, item: any) => {
          const { type, ...rest } = item;
          acc[type] = rest;
          return acc;
        }, {});
        setConfigs(result);
      }
    } catch (error) { }
  };

  useEffect(() => {
    getConfigs();
  }, []);

  const handleUpdateConfig = async (type: string, value: any) => {
    setLoading(true);
    try {
      const res = await http.post(`${API_URL}/edit-config`, {
        type,
        value,
      });
      if (res && res.data) {
        message.success('Thành công');
        getConfigs();
      }
    } catch (error) {
      console.log(error);
      message.error('Thất bại');
    }
    setLoading(false);
  };

  const props: UploadProps = {
    name: 'file',
    action: `${import.meta.env.VITE_SOCKET_URL}/api/member/upload`,
    showUploadList: false,
    onChange(info) {
      if (info.file.status === 'uploading') {
        setLoading(true)
      }
      if (info.file.status === 'done') {
        console.log(info.file.response);
        handleUpdateConfig('LOGO_APP', info.file.response?.url);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
        setLoading(false)
      }
    },
  };

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <LoadingScreen spinning={loading} />
      <div className="flex items-center gap-2">
        {t("Cài đặt ngôn ngữ")}:
        <div className='flex items-center gap-2'>
          <img src="/china.png" className='w-[32px] cursor-pointer' style={{
            opacity: i18n.language === 'cn' ? 1 : .1
          }}
            onClick={() => {
              i18n.changeLanguage('cn')
              localStorage.setItem("lang", "cn")
            }}
          />
          <img src="/vn.png" className='w-[32px] cursor-pointer'
            style={{
              opacity: i18n.language === 'vi' ? 1 : .7
            }}
            onClick={() => {
              i18n.changeLanguage('vi')
              localStorage.setItem("lang", "vi")
            }}
          />
        </div>
      </div>
    </BasePageContainer>
  );
};

export default Setting;
