import { webRoutes } from '../../routes/web';
import { BiHomeAlt2 } from 'react-icons/bi';
import Icon, { UserOutlined, SettingOutlined, CheckCircleOutlined, PayCircleFilled, HistoryOutlined, BarChartOutlined, CodeOutlined } from '@ant-design/icons';

export const sidebar = (t: any) => {
  return [
    {
      path: webRoutes.dashboard,
      key: webRoutes.dashboard,
      name: t('Dashboard'),
      icon: <Icon component={BiHomeAlt2} />,
    },
    {
      path: webRoutes.users,
      key: webRoutes.users,
      name: t('Người dùng'),
      icon: <UserOutlined />,
    },
    // {
    //   path: webRoutes.kyc,
    //   key: webRoutes.kyc,
    //   name: t('Xác minh'),
    //   icon: <CheckCircleOutlined />,
    // },
    {
      path: webRoutes.deposit,
      key: webRoutes.deposit,
      name: t('Nạp tiền'),
      icon: <PayCircleFilled />,
    },
    {
      path: webRoutes.withdraw,
      key: webRoutes.withdraw,
      name: t('Rút tiền'),
      icon: <PayCircleFilled />,
    },
    {
      path: webRoutes.history_bet,
      key: webRoutes.history_bet,
      name: t('Giao dịch'),
      icon: <HistoryOutlined />,
    },
    {
      path: webRoutes.code,
      key: webRoutes.code,
      name: t('Mã giới thiệu'),
      icon: <CodeOutlined />,
    },
    // {
    //   path: webRoutes.setting,
    //   key: webRoutes.setting,
    //   name: 'Cài Đặt',
    //   icon: <SettingOutlined />,
    // },
    // {
    //   path: webRoutes.bet,
    //   key: webRoutes.bet,
    //   name: 'Bẻ cược',
    //   icon: <BarChartOutlined />,
    // },
    // {
    //   path: webRoutes.about,
    //   key: webRoutes.about,
    //   name: 'About',
    //   icon: <InfoCircleOutlined />,
    // },
  ]
}
