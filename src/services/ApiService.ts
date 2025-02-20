import  { AxiosError } from 'axios';
import { ActivationDataDto } from "../types/activation-data";
import { activationDataDto } from '../data/activation-data';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}

export class ApiService {
  // private static readonly api = axios.create({
  //   baseURL: API_BASE_URL,
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });

  private static handleError(error: AxiosError): ApiResponse<any> {
    return {
      data: [],
      error: error.message || 'An unknown error occurred',
    };
  }

  static async fetchActivationData(pin: string): Promise<ApiResponse<ActivationDataDto>> {
    try {
      if (pin === "1234") {
        return {
          data: activationDataDto,
          error: undefined,
        };
      } else {
        return {
          data: {} as ActivationDataDto,
          error: "Invalid pin",
        };
      }
    } catch (error) {
      return this.handleError(error as AxiosError);
    }
  }
} 