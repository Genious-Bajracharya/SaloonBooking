import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Manage Your Salon</h2>
          <p className="text-xl text-gray-600">Services • Bookings • Appointments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/services">
            <Card className="hover:shadow-lg transition cursor-pointer">
              <CardHeader>
                <CardTitle>Services</CardTitle>
                <CardDescription>Manage salon services</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Manage Services</Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/appointments">
            <Card className="hover:shadow-lg transition cursor-pointer">
              <CardHeader>
                <CardTitle>Appointments</CardTitle>
                <CardDescription>View all appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">View Appointments</Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/bookings">
            <Card className="hover:shadow-lg transition cursor-pointer">
              <CardHeader>
                <CardTitle>Book Now</CardTitle>
                <CardDescription>Create new appointment</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">New Booking</Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}