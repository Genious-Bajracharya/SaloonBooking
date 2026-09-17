from rest_framework import serializers
from .models import Service, Appointment


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'price', 'duration', 'created_at']


class AppointmentSerializer(serializers.ModelSerializer):
    service_name = serializers.CharField(source='service.name', read_only=True)
    service_price = serializers.DecimalField(source='service.price', read_only=True, max_digits=10, decimal_places=2)

    class Meta:
        model = Appointment
        fields = ['id', 'customer_name', 'customer_phone', 'service', 'service_name', 'service_price', 
                  'appointment_date', 'appointment_time', 'notes', 'status', 'created_at']