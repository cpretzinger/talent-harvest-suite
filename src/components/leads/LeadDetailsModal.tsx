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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  const [editedLead, setEditedLead] = useState<Lead | null>(lead);

  const handleSave = async () => {
    if (!editedLead) return;
    
    try {
      setUpdating(true);
      const { error } = await supabase
        .from("leads")
        .update({
          first_name: editedLead.first_name,
          last_name: editedLead.last_name,
          email: editedLead.email,
          phone: editedLead.phone,
          source: editedLead.source,
          pipeline_stage: editedLead.pipeline_stage,
          status: editedLead.status,
        })
        .eq("id", editedLead.id);

      if (error) throw error;

      toast({
        title: "Lead updated",
        description: "The lead has been updated successfully.",
      });

      queryClient.invalidateQueries({ queryKey: ["leads"] });
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update lead. Please try again.",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (!editedLead) return null;

  return (
    <Dialog open={!!lead} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Lead Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">First Name</Label>
            <Input
              className="col-span-3"
              value={editedLead.first_name}
              onChange={(e) => setEditedLead({ ...editedLead, first_name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Last Name</Label>
            <Input
              className="col-span-3"
              value={editedLead.last_name}
              onChange={(e) => setEditedLead({ ...editedLead, last_name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Email</Label>
            <Input
              className="col-span-3"
              value={editedLead.email}
              onChange={(e) => setEditedLead({ ...editedLead, email: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Phone</Label>
            <Input
              className="col-span-3"
              value={editedLead.phone || ""}
              onChange={(e) => setEditedLead({ ...editedLead, phone: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Source</Label>
            <Input
              className="col-span-3"
              value={editedLead.source || ""}
              onChange={(e) => setEditedLead({ ...editedLead, source: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Stage</Label>
            <Select
              value={editedLead.pipeline_stage}
              onValueChange={(value) => setEditedLead({ ...editedLead, pipeline_stage: value })}
            >
              <SelectTrigger className="col-span-3">
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
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave} disabled={updating}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}