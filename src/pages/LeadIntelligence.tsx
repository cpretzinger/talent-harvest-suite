import Navigation from "@/components/Navigation";
import LeadIntelligenceNav from "@/components/intelligence/LeadIntelligenceNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, Shield, Users } from "lucide-react";

const LeadIntelligence = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <LeadIntelligenceNav />
        <main className="container mx-auto px-6 py-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <BarChart2 className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-semibold">Performance Metrics</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Track and analyze your lead conversion rates and ROI metrics in real-time.
              </p>
              <Button variant="outline" className="w-full">
                View Analytics <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <Shield className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-semibold">Compliance Center</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Stay compliant with the latest regulations and best practices for lead handling.
              </p>
              <Button variant="outline" className="w-full">
                Check Status <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <Users className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-semibold">Lead Management</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Efficiently manage and organize your leads with our advanced tools.
              </p>
              <Button variant="outline" className="w-full">
                Manage Leads <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
            <div className="bg-card rounded-lg p-6">
              <p className="text-muted-foreground">
                No recent activity to display. Start by exploring our lead intelligence tools above.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LeadIntelligence;