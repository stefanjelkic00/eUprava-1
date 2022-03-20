import axios from 'axios';
import { getRecoil } from 'recoil-nexus';
import { MATICAR_BACKEND_URL } from '../constants';
import { tokenAtom } from '../state/auth/auth.atom';

const apiAxios = axios.create({
  baseURL: MATICAR_BACKEND_URL,
});

apiAxios.interceptors.request.use(
  (config) => {
    const token = getRecoil(tokenAtom);
    if (token) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const getWorkers = async () => {
  return apiAxios.get(`admin/workers`);
};
