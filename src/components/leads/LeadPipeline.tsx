import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { LeadDetailsModal } from "./LeadDetailsModal";
import { useState } from "react";

const pipelineStages = [
  { name: "New", color: "bg-blue-500" },
  { name: "Contacted", color: "bg-yellow-500" },
  { name: "Qualified", color: "bg-green-500" },
  { name: "Proposal", color: "bg-purple-500" },
  { name: "Closed", color: "bg-gray-500" },
];

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  status: string;
  source: string | null;
  pipeline_stage: string;
  notes?: string[];
  communication_history?: any[];
  tasks?: any[];
}

export function LeadPipeline({ leads }: { leads: Lead[] }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newStage = destination.droppableId.toLowerCase();

    try {
      const { error } = await supabase
        .from("leads")
        .update({ pipeline_stage: newStage })
        .eq("id", draggableId);

      if (error) throw error;

      toast({
        title: "Lead updated",
        description: "Pipeline stage updated successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["leads"] });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update lead stage",
      });
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {pipelineStages.map((stage) => (
            <Droppable key={stage.name} droppableId={stage.name}>
              {(provided) => (
                <Card 
                  className="bg-white shadow-sm hover:shadow-md transition-shadow"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stage.name}
                      <Badge variant="secondary" className="ml-2">
                        {leads.filter((lead) => lead.pipeline_stage === stage.name.toLowerCase()).length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {leads
                      .filter((lead) => lead.pipeline_stage === stage.name.toLowerCase())
                      .map((lead, index) => (
                        <Draggable key={lead.id} draggableId={lead.id} index={index}>
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-2 hover:bg-gray-50 cursor-pointer transition-colors hover:-translate-y-0.5 duration-200"
                              onClick={() => setSelectedLead(lead)}
                            >
                              <CardTitle className="text-sm">
                                {lead.first_name} {lead.last_name}
                              </CardTitle>
                              <CardDescription className="text-xs">
                                {lead.email}
                              </CardDescription>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </CardContent>
                </Card>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <LeadDetailsModal
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
      />
    </>
  );
}