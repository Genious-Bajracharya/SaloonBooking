'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { serviceFormSchema, type ServiceFormValues } from '@/lib/validation';
import { serviceAPI, getErrorMessage } from '@/lib/api';
import { Service } from '@/types';
import Navbar from '@/components/Navbar';

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    mode: 'onBlur',
  });

  useEffect(() => {
    let isMounted = true;

    const loadServices = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await serviceAPI.getAll();

        if (isMounted) {
          setServices(data);
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

    loadServices();

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshServices = async () => {
    try {
      const data = await serviceAPI.getAll();
      setServices(data);
    } catch (err: any) {
      setError(getErrorMessage(err));
    }
  };

  const onSubmit: SubmitHandler<ServiceFormValues> = async (data) => {
    setError('');
    try {
      if (editing) {
        await serviceAPI.update(editing, data);
        setEditing(null);
      } else {
        await serviceAPI.create(data);
      }
      reset();
      await refreshServices();
    } catch (err: any) {
      setError(getErrorMessage(err));
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this service?')) return;
    try {
      await serviceAPI.delete(id);
      await refreshServices();
    } catch (err: any) {
      setError(getErrorMessage(err));
    }
  };

  const handleEdit = (service: Service) => {
    setEditing(service.id);
    setValue('name', service.name);
    setValue('price', parseFloat(service.price));
    setValue('duration', service.duration);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Use Navbar Component */}
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Add/Edit Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">{editing ? 'Edit Service' : 'Add Service'}</h2>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Service Name *</label>
              <Input
                placeholder="e.g., Haircut"
                {...register('name')}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-1">Price *</label>
              <Input
                type="number"
                step="0.01"
                placeholder="500"
                {...register('price')}
                className={errors.price ? 'border-red-500' : ''}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium mb-1">Duration (minutes) *</label>
              <Input
                type="number"
                placeholder="30"
                {...register('duration')}
                className={errors.duration ? 'border-red-500' : ''}
              />
              {errors.duration && (
                <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
              )}
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                {editing ? 'Update' : 'Add'} Service
              </Button>
              {editing && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditing(null);
                    reset();
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Services Table */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Services</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>${service.price}</TableCell>
                    <TableCell>{service.duration} min</TableCell>
                    <TableCell className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(service)}>
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(service.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {services.length === 0 && (
            <div className="text-center text-gray-500 py-8">No services yet</div>
          )}
        </div>
      </main>
    </div>
  );
}