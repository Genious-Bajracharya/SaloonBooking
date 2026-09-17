'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { appointmentAPI, getErrorMessage } from '@/lib/api';
import { Appointment } from '@/types';
import Navbar from '@/components/Navbar';

type StatusType = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('');

  useEffect(() => {
    let isMounted = true;

    const loadAppointments = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await appointmentAPI.getAll();

        if (isMounted) {
          setAppointments(data);
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

    loadAppointments();

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshAppointments = async () => {
    try {
      const data = await appointmentAPI.getAll();
      setAppointments(data);
    } catch (err: any) {
      setError(getErrorMessage(err));
    }
  };

  const handleStatusChange = async (id: number, newStatus: StatusType) => {
    try {
      await appointmentAPI.updateStatus(id, newStatus);
      await refreshAppointments();
    } catch (err: any) {
      setError(getErrorMessage(err));
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this appointment?')) return;
    try {
      await appointmentAPI.delete(id);
      await refreshAppointments();
    } catch (err: any) {
      setError(getErrorMessage(err));
    }
  };

  const filtered = filterStatus
    ? appointments.filter((apt) => apt.status === filterStatus)
    : appointments;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">All Appointments</h2>

          <div className="mb-6">
            <label className="mr-2 font-medium">Filter by status:</label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Confirmed">Confirmed</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((apt) => (
                  <TableRow key={apt.id}>
                    <TableCell className="font-medium">{apt.customer_name}</TableCell>
                    <TableCell>{apt.customer_phone}</TableCell>
                    <TableCell>{apt.service_name}</TableCell>
                    <TableCell>{apt.appointment_date}</TableCell>
                    <TableCell>{apt.appointment_time}</TableCell>
                    <TableCell>
                      <Select value={apt.status} onValueChange={(value) => handleStatusChange(apt.id, value as StatusType)}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Confirmed">Confirmed</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(apt.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center text-gray-500 py-8">No appointments found</div>
          )}
        </div>
      </main>
    </div>
  );
}