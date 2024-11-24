import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export function AdminSettings() {
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const { data: settings, isLoading } = useQuery({
    queryKey: ['system-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('system_configurations')
        .select('*');
      
      if (error) throw error;
      return data;
    }
  });

  const handleUpdateSetting = async (key: string, value: any) => {
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('system_configurations')
        .update({ value })
        .eq('key', key);

      if (error) throw error;

      toast({
        title: "Setting updated",
        description: "The system setting has been updated successfully."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update setting."
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {settings?.map((setting) => (
        <Card key={setting.id}>
          <CardHeader>
            <CardTitle>{setting.key}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Input
              defaultValue={JSON.stringify(setting.value)}
              onChange={(e) => {
                try {
                  const parsedValue = JSON.parse(e.target.value);
                  handleUpdateSetting(setting.key, parsedValue);
                } catch (error) {
                  // Invalid JSON, ignore
                }
              }}
            />
            <p className="text-sm text-gray-500">{setting.description}</p>
          </CardContent>
        </Card>
      ))}
      {isUpdating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}
    </div>
  );
}