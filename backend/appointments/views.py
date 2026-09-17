from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Service, Appointment
from .serializers import ServiceSerializer, AppointmentSerializer

# Create your views here.

@api_view(['GET', 'POST'])
def services_list(request):
    if request.method == 'GET':
        services = Service.objects.all()
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
def service_detail(request, id):
    try:
        service = Service.objects.get(id=id)
    except Service.DoesNotExist:
        return Response({'error': 'Service not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = ServiceSerializer(service, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        service.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def appointments_list(request):
    if request.method == 'GET':
        appointments = Appointment.objects.all()
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            service_id = request.data.get('service')
            try:
                service = Service.objects.get(id=service_id)
            except Service.DoesNotExist:
                return Response({'error': 'Service not found'}, status=status.HTTP_400_BAD_REQUEST)

            date = request.data.get('appointment_date')
            time = request.data.get('appointment_time')
            
            existing = Appointment.objects.filter(
                service_id=service_id,
                appointment_date=date,
                appointment_time=time
            )
            
            if existing.exists():
                return Response(
                    {'error': 'This time slot is already booked for this service'},
                    status=status.HTTP_409_CONFLICT
                )
            
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH', 'DELETE'])
def appointment_detail(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
    except Appointment.DoesNotExist:
        return Response({'error': 'Appointment not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PATCH':
        status_value = request.data.get('status')
        if status_value:
            appointment.status = status_value
            appointment.save()
            serializer = AppointmentSerializer(appointment)
            return Response(serializer.data)
        return Response({'error': 'Status required'}, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        appointment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)