import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Plus, LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { LeadForm } from "@/components/leads/LeadForm";
import { LeadPipeline } from "@/components/leads/LeadPipeline";
import { LeadList } from "@/components/leads/LeadList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  status: string;
  source: string | null;
  created_at: string;
  assigned_to: string | null;
  assessment_score: number | null;
  placement_status: string | null;
  pipeline_stage: string;
}

const Leads = () => {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"pipeline" | "list">("pipeline");

  const { data: leads, isLoading: leadsLoading } = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching leads",
          description: error.message,
        });
        throw error;
      }

      return data as Lead[];
    },
  });

  if (leadsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Lead Pipeline</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your sales pipeline
          </p>
        </div>
        <div className="flex gap-2">
          <div className="border rounded-md p-1">
            <Button
              variant={viewMode === "pipeline" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("pipeline")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Lead
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
              </DialogHeader>
              <LeadForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-8">
        {leads && viewMode === "pipeline" && <LeadPipeline leads={leads} />}
        {leads && viewMode === "list" && <LeadList leads={leads} />}
      </div>
    </div>
  );
};

export default Leads;