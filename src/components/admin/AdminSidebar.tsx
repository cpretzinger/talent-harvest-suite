import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  Activity,
  LogOut
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export function AdminSidebar() {
  const { signOut } = useAuth();

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-primary">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <span className="text-2xl font-semibold text-cream">Admin Panel</span>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              <Link
                to="/admin"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-cream hover:bg-primary-dark"
              >
                <LayoutDashboard className="mr-3 h-6 w-6" />
                Dashboard
              </Link>
              <Link
                to="/admin/users"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-cream hover:bg-primary-dark"
              >
                <Users className="mr-3 h-6 w-6" />
                Users
              </Link>
              <Link
                to="/admin/reports"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-cream hover:bg-primary-dark"
              >
                <FileText className="mr-3 h-6 w-6" />
                Reports
              </Link>
              <Link
                to="/admin/activity"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-cream hover:bg-primary-dark"
              >
                <Activity className="mr-3 h-6 w-6" />
                Activity
              </Link>
              <Link
                to="/admin/settings"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-cream hover:bg-primary-dark"
              >
                <Settings className="mr-3 h-6 w-6" />
                Settings
              </Link>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-primary-dark p-4">
            <Button
              variant="ghost"
              className="flex items-center text-cream hover:bg-primary-dark w-full"
              onClick={() => signOut()}
            >
              <LogOut className="mr-3 h-6 w-6" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}