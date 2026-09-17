from django.urls import path
from . import views

urlpatterns = [
    path('api/services/', views.services_list, name='services-list'),
    path('api/services/<int:id>/', views.service_detail, name='service-detail'),
    path('api/appointments/', views.appointments_list, name='appointments-list'),
    path('api/appointments/<int:id>/', views.appointment_detail, name='appointment-detail'),
]