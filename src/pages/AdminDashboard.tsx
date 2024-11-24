import { AdminDashboardDev } from "@/components/admin/AdminDashboardDev";
import { AdminDashboardProd } from "@/components/admin/AdminDashboardProd";

export default function AdminDashboard() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  return isDevelopment ? <AdminDashboardDev /> : <AdminDashboardProd />;
}