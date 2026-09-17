'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { appointmentFormSchema, type AppointmentFormValues } from '@/lib/validation';
import { serviceAPI, appointmentAPI, getErrorMessage } from '@/lib/api';
import { Service, Appointment } from '@/types';
import Navbar from '@/components/Navbar';

export default function Booking() {
  const [services, setServices] = useState<Service[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    mode: 'onBlur',
  });

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        setError('');
        const [servicesData, appointmentsData] = await Promise.all([
          serviceAPI.getAll(),
          appointmentAPI.getAll(),
        ]);

        if (isMounted) {
          setServices(servicesData);
          setAppointments(appointmentsData);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(getErrorMessage(err));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshAppointments = async () => {
    try {
      const appointmentsData = await appointmentAPI.getAll();
      setAppointments(appointmentsData);
    } catch (err: any) {
      setError(getErrorMessage(err));
    }
  };

  const onSubmit: SubmitHandler<AppointmentFormValues> = async (data) => {
    setError('');
    try {
      await appointmentAPI.create({
        customer_name: data.customer_name,
        customer_phone: data.customer_phone,
        service: parseInt(data.service),
        appointment_date: data.appointment_date,
        appointment_time: data.appointment_time,
        notes: data.notes || '',
      });
      reset();
      alert('Appointment booked successfully!');
      await refreshAppointments();
    } catch (err: any) {
      setError(getErrorMessage(err));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Rest of the page remains the same */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Booking Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Customer Name */}
              <div>
                <label className="block text-sm font-medium mb-1">Customer Name *</label>
                <Input
                  placeholder="John Doe"
                  {...register('customer_name')}
                  className={errors.customer_name ? 'border-red-500' : ''}
                />
                {errors.customer_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.customer_name.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number *</label>
                <Input
                  placeholder="9801234567"
                  {...register('customer_phone')}
                  className={errors.customer_phone ? 'border-red-500' : ''}
                />
                {errors.customer_phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.customer_phone.message}</p>
                )}
              </div>

              {/* Service Dropdown */}
              <div>
                <label className="block text-sm font-medium mb-1">Select Service *</label>
                <select
                  {...register('service')}
                  className={`w-full border rounded px-3 py-2 ${
                    errors.service ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Choose a service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id.toString()}>
                      {service.name} - {service.price} ({service.duration} min)
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium mb-1">Date *</label>
                <Input
                  type="date"
                  {...register('appointment_date')}
                  className={errors.appointment_date ? 'border-red-500' : ''}
                />
                {errors.appointment_date && (
                  <p className="text-red-500 text-sm mt-1">{errors.appointment_date.message}</p>
                )}
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium mb-1">Time *</label>
                <Input
                  type="time"
                  {...register('appointment_time')}
                  className={errors.appointment_time ? 'border-red-500' : ''}
                />
                {errors.appointment_time && (
                  <p className="text-red-500 text-sm mt-1">{errors.appointment_time.message}</p>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium mb-1">Notes (optional)</label>
                <Textarea
                  placeholder="Any special requests?"
                  {...register('notes')}
                  className="resize-none"
                  rows={3}
                />
                {errors.notes && (
                  <p className="text-red-500 text-sm mt-1">{errors.notes.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full">
                Book Appointment
              </Button>
            </form>
          </div>

          {/* Appointments List */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Recent Appointments</h2>

            {appointments.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <div className="text-4xl mb-2">📭</div>
                <p>No appointments yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.slice(0, 5).map((apt) => (
                      <TableRow key={apt.id}>
                        <TableCell className="font-medium">{apt.customer_name}</TableCell>
                        <TableCell>{apt.service_name}</TableCell>
                        <TableCell>{apt.appointment_date}</TableCell>
                        <TableCell>{apt.appointment_time}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              apt.status === 'Confirmed'
                                ? 'bg-green-100 text-green-800'
                                : apt.status === 'Completed'
                                ? 'bg-blue-100 text-blue-800'
                                : apt.status === 'Cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {apt.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}