import { StatusCode } from '@core/constants/StatusCodes';
import { storeMobx } from '@core/store/store';
import axios, { AxiosInstance } from 'axios';
import { autorun } from 'mobx';

function setDefaults(httpClient: AxiosInstance) {
  httpClient.defaults.baseURL = import.meta.env.VITE_BASE_URL;
  httpClient.defaults.headers.common['Accept'] = 'application/json';
  httpClient.defaults.headers.common['Content-Type'] = 'application/json';
}

function addInterceptorSetAuthorizationHeader(httpClient: AxiosInstance) {
  httpClient.interceptors.request.use((request) => {
    autorun(() => {
      const { authorization } =  storeMobx;
      request.headers.Authorization = `Bearer ${authorization.authToken}`;
    });
    
    return request;
  });
}

function addInterceptorProcessingUnauthorized(httpClient: AxiosInstance) {
  httpClient.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response && error.response.status === StatusCode.Unauthorized) {
        console.warn('Unauthorized');
        // TODO: clean token
      }

      return Promise.reject(error);
    }
  );
}

// HTTP CLIENTS

function createPublicHttpClient() {
  const httpClient = axios.create();

  setDefaults(httpClient);

  return httpClient;
}

function createHttpClient() {
  const httpClient = axios.create();

  setDefaults(httpClient);
  addInterceptorSetAuthorizationHeader(httpClient);
  addInterceptorProcessingUnauthorized(httpClient);

  return httpClient;
}

export const publicHttpClient = createPublicHttpClient();
export const httpClient = createHttpClient();
