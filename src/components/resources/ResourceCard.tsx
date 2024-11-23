import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Resource } from "@/types/resources";
import { FileText, Link as LinkIcon, Video, FileQuestion, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResourceCardProps {
  resource: Resource;
}

const getResourceIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'video':
      return <Video className="h-6 w-6" />;
    case 'quiz':
      return <FileQuestion className="h-6 w-6" />;
    case 'template':
      return <FileSpreadsheet className="h-6 w-6" />;
    default:
      return <FileText className="h-6 w-6" />;
  }
};

export const ResourceCard = ({ resource }: ResourceCardProps) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-2">
          {getResourceIcon(resource.type)}
          <CardTitle className="text-lg">{resource.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {resource.description && (
          <CardDescription className="mb-4">
            {resource.description}
          </CardDescription>
        )}
        {(resource.url || resource.file_path) && (
          <Button variant="outline" className="w-full" asChild>
            <a
              href={resource.url || resource.file_path}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <LinkIcon className="h-4 w-4" />
              Access Resource
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};