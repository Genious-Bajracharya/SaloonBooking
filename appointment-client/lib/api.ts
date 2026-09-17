import axios, { AxiosError } from 'axios';
import { Service, Appointment, ApiError } from '@/types';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Services API
export const serviceAPI = {
  getAll: async (): Promise<Service[]> => {
    const { data } = await API.get('/api/services/');
    return data;
  },

  create: async (serviceData: Omit<Service, 'id' | 'created_at'>): Promise<Service> => {
    const { data } = await API.post('/api/services/', serviceData);
    return data;
  },

  update: async (id: number, serviceData: Omit<Service, 'id' | 'created_at'>): Promise<Service> => {
    const { data } = await API.put(`/api/services/${id}/`, serviceData);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await API.delete(`/api/services/${id}/`);
  },
};

// Appointments API
export const appointmentAPI = {
  getAll: async (): Promise<Appointment[]> => {
    const { data } = await API.get('/api/appointments/');
    return data;
  },

  create: async (
    appointmentData: Omit<Appointment, 'id' | 'created_at' | 'service_name' | 'service_price' | 'status'>
  ): Promise<Appointment> => {
    const { data } = await API.post('/api/appointments/', appointmentData);
    return data;
  },

  updateStatus: async (id: number, status: Appointment['status']): Promise<Appointment> => {
    const { data } = await API.patch(`/api/appointments/${id}/`, { status });
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await API.delete(`/api/appointments/${id}/`);
  },
};


//Errorr
export const getErrorMessage = (error: any): string => {
  // Check if it's a 409 Conflict (double booking)
  if (error.response?.status === 409) {
    return error.response?.data?.error || 'This time slot is already booked for this service';
  }
  
  // Check for error message in response
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  
  // Check for validation errors
  if (error.response?.status === 400) {
    const errors = error.response?.data;
    if (typeof errors === 'object') {
      return Object.values(errors).flat().join(', ');
    }
  }
  
  // Check for not found
  if (error.response?.status === 404) {
    return error.response?.data?.error || 'Resource not found';
  }
  
  // Fallback
  return error.response?.data?.error || error.message || 'An error occurred';
};