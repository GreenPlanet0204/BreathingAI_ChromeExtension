import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

export interface SessionUser {
  name: string;
}
export interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  genericUrl: string | undefined;
}

export interface ExtendedAxiosResponse<T = any> extends AxiosResponse<T> {
  config: ExtendedAxiosRequestConfig;
}

export interface ExtendedAxiosError<T = any> extends AxiosError<T> {
  config: ExtendedAxiosRequestConfig;
}

export interface ExtendedAxiosInstance extends AxiosInstance {
  get<T = any, R = ExtendedAxiosResponse<T>>(
    url: string,
    config?: ExtendedAxiosRequestConfig
  ): Promise<R>;
  delete<T = any, R = ExtendedAxiosResponse<T>>(
    url: string,
    config?: ExtendedAxiosRequestConfig
  ): Promise<R>;
  head<T = any, R = ExtendedAxiosResponse<T>>(
    url: string,
    config?: ExtendedAxiosRequestConfig
  ): Promise<R>;
  options<T = any, R = ExtendedAxiosResponse<T>>(
    url: string,
    config?: ExtendedAxiosRequestConfig
  ): Promise<R>;
  post<T = any, R = ExtendedAxiosResponse<T>>(
    url: string,
    data?: any,
    config?: ExtendedAxiosRequestConfig
  ): Promise<R>;
  put<T = any, R = ExtendedAxiosResponse<T>>(
    url: string,
    data?: any,
    config?: ExtendedAxiosRequestConfig
  ): Promise<R>;
  patch<T = any, R = ExtendedAxiosResponse<T>>(
    url: string,
    data?: any,
    config?: ExtendedAxiosRequestConfig
  ): Promise<R>;
}
