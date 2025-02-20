import axios, { AxiosError } from 'axios';
import { ActivationData, ActivationDataDto } from "../types/activation-data";
import { activationDataDto } from '../data/activation-data';
import { activationStorage } from '../config/storage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}

export class ApiService {
  private static readonly api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  private static handleError(error: AxiosError): ApiResponse<any> {
    return {
      data: [],
      error: error.message || 'An unknown error occurred',
    };
  }

  private static async getLocalActivationData(pin: string): Promise<ActivationData | null> {
    try {
      return await activationStorage.getItem<ActivationData>(pin);
    } catch (error) {
      console.error('Error reading from LocalForage:', error);
      return null;
    }
  }

  private static async saveLocalActivationData(pin: string, data: ActivationData): Promise<void> {
    try {
      await activationStorage.setItem(pin, data);
    } catch (error) {
      console.error('Error saving to LocalForage:', error);
    }
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