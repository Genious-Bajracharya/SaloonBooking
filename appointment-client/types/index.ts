export interface Service {
  id: number;
  name: string;
  price: string;
  duration: number;
  created_at: string;
}

export interface Appointment {
  id: number;
  customer_name: string;
  customer_phone: string;
  service: number;
  service_name: string;
  service_price: string;
  appointment_date: string;
  appointment_time: string;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  created_at: string;
}

export interface ApiError {
  error?: string;
  [key: string]: any;
}