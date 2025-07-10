import Link from "next/link";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">OptoSaaS</h1>
          <p className="mt-2 text-sm text-gray-600">Staff Portal</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm />
          
          {/* Mock Login Links */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Quick Login</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Link
                href="/staff/dashboard"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Login as Staff
              </Link>
              <Link
                href="/franchise"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Login as Owner
              </Link>
            </div>
            
            <div className="mt-3">
              <Link
                href="/super-admin"
                className="w-full inline-flex justify-center py-2 px-4 border border-red-300 rounded-md shadow-sm bg-red-50 text-sm font-medium text-red-600 hover:bg-red-100"
              >
                Login as Super Admin
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        © 2024 OptoSaaS - Staff Management System
      </div>
    </div>
  );
}