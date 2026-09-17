from django.core.management.base import BaseCommand
from appointments.models import Service, Appointment
from datetime import datetime, timedelta

class Command(BaseCommand):
    help = 'Seed database with sample data'

    def handle(self, *args, **options):
        Service.objects.all().delete()
        Appointment.objects.all().delete()

        services = [
            Service.objects.create(name='Haircut', price=500, duration=30),
            Service.objects.create(name='Hair Coloring', price=2500, duration=120),
            Service.objects.create(name='Facial', price=1500, duration=60),
        ]

        tomorrow = datetime.now().date() + timedelta(days=1)

        Appointment.objects.create(
            customer_name='Genie ',
            customer_phone='9818188226',
            service=services[0],
            appointment_date=tomorrow,
            appointment_time='10:00',
            status='Pending',
            notes='Regular haircut'
        )

        Appointment.objects.create(
            customer_name='Boso',
            customer_phone='9818188225',
            service=services[2],
            appointment_date=tomorrow,
            appointment_time='11:00',
            status='Confirmed',
            notes='Facial'
        )

        self.stdout.write(self.style.SUCCESS('Seed data created successfully'))