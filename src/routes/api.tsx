import { API_URL } from '../utils';

export const apiRoutes = {
  login: `${API_URL}/login`,
  logout: `${API_URL}/logout`,
  users: `${API_URL}/users`,
  reviews: `${API_URL}/unknown`,
  deleteUser: `${API_URL}/user`,
  getDeposit: `${API_URL}/deposit`,
  getWithdraw: `${API_URL}/withdrawl`,
  getUserKyc: `${API_URL}/users-kyc`,
  handleKyc: `${API_URL}/user-kyc`,
  getStatisticsPayment: `${API_URL}/statistics-payment`,
  handleWithdraw: `${API_URL}/handle-withdraw`,
  historyBet: `${API_URL}/histories-bet`,
  updateUser: `${API_URL}/update-user`,
  getAdmin: `${API_URL}/profile`,
  getAnalyticData: `${API_URL}/analytic`,
  updateBet: `${API_URL}/update-bet`,
  dashboarData: `${API_URL}/dashboard`,

};
