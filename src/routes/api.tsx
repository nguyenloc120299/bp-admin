import { API_URL } from '../utils';

export const apiRoutes = {
  updateBetResult: `${API_URL}/updateBetResult`,
  getCode: `${API_URL}/codes`,
  getBetResult: `${API_URL}/getBetResult/`,
  addCode: `${API_URL}/code`,
  deleteCode: `${API_URL}/delete-code`,
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
  handleDeposit: `${API_URL}/handle-deposit`,
  historyBet: `${API_URL}/histories-bet`,
  updateUser: `${API_URL}/update-user`,
  getAdmin: `${API_URL}/profile`,
  getAnalyticData: `${API_URL}/analytic`,
  updateBet: `${API_URL}/update-bet`,
  dashboarData: `${API_URL}/dashboard`,

};
