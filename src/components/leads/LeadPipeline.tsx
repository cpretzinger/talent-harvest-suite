import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  pipeline_stage: string;
}

export function LeadPipeline({ leads }: { leads: Lead[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {pipelineStages.map((stage) => (
        <Card key={stage.name} className="bg-white shadow-sm">
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
              .map((lead) => (
                <Card key={lead.id} className="p-2 hover:bg-gray-50 cursor-pointer">
                  <CardTitle className="text-sm">
                    {lead.first_name} {lead.last_name}
                  </CardTitle>
                  <CardDescription className="text-xs">{lead.email}</CardDescription>
                </Card>
              ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}