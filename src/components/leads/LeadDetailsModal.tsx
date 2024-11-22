import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  status: string;
  source: string | null;
  pipeline_stage: string;
}

interface LeadDetailsModalProps {
  lead: Lead | null;
  onClose: () => void;
}

export function LeadDetailsModal({ lead, onClose }: LeadDetailsModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [updating, setUpdating] = useState(false);

  const handleStageChange = async (newStage: string) => {
    if (!lead) return;
    
    try {
      setUpdating(true);
      const { error } = await supabase
        .from("leads")
        .update({ pipeline_stage: newStage })
        .eq("id", lead.id);

      if (error) throw error;

      toast({
        title: "Lead updated",
        description: "The lead's stage has been updated successfully.",
      });

      queryClient.invalidateQueries({ queryKey: ["leads"] });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update lead stage. Please try again.",
      });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Dialog open={!!lead} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Lead Details</DialogTitle>
        </DialogHeader>
        {lead && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Name</Label>
              <div className="col-span-3">
                {lead.first_name} {lead.last_name}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Email</Label>
              <div className="col-span-3">{lead.email}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Phone</Label>
              <div className="col-span-3">{lead.phone || "-"}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Source</Label>
              <div className="col-span-3">{lead.source || "-"}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Stage</Label>
              <div className="col-span-3">
                <Select
                  value={lead.pipeline_stage}
                  onValueChange={handleStageChange}
                  disabled={updating}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="proposal">Proposal</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}