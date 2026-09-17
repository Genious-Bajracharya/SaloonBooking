import { z } from 'zod';

export const serviceFormSchema = z.object({
  name: z.string().min(1, 'Service name is required').min(3, 'Name must be at least 3 characters'),
  price: z.coerce.number().positive('Price must be greater than 0'),
  duration: z.coerce.number().positive('Duration must be greater than 0'),
});

export const appointmentFormSchema = z.object({
  customer_name: z.string().min(1, 'Customer name is required'),
  customer_phone: z.string().min(1, 'Phone is required'),
  service: z.string().min(1, 'Please select a service'), // Changed to string (from select dropdown)
  appointment_date: z.string().min(1, 'Date is required'),
  appointment_time: z.string().min(1, 'Time is required'),
  notes: z.string().optional(),
});

export type ServiceFormValues = z.infer<typeof serviceFormSchema>;
export type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;