import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Search, MoreHorizontal, FileText, MessageSquare, ListTodo } from "lucide-react";
import { LeadDetailsModal } from "./LeadDetailsModal";

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

export function LeadList({ leads }: { leads: Lead[] }) {
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = leads.filter(
    (lead) =>
      lead.first_name.toLowerCase().includes(search.toLowerCase()) ||
      lead.last_name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow 
                key={lead.id}
                className="transition-colors hover:bg-muted/50 cursor-pointer"
                onClick={() => setSelectedLead(lead)}
              >
                <TableCell>
                  {lead.first_name} {lead.last_name}
                </TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell className="capitalize">{lead.pipeline_stage}</TableCell>
                <TableCell>{lead.source || "-"}</TableCell>
                <TableCell className="capitalize">{lead.status}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-muted">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" /> Documents
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" /> Communication
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ListTodo className="mr-2 h-4 w-4" /> Tasks
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <LeadDetailsModal
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
      />
    </div>
  );
}