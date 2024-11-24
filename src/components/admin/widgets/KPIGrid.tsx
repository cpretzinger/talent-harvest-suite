import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface KPIData {
  value: number;
  trend: number;
  target: number;
}

interface KPIRecord {
  [key: string]: KPIData;
}

export const KPIGrid = () => {
  const [kpis, setKpis] = useState<KPIRecord>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchKPIs = async () => {
      const { data } = await supabase
        .from('admin_kpis')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      if (data?.[0]) {
        const transformedData: Record<string, KPIData> = {
          active_producers: data[0].active_producers as unknown as KPIData,
          monthly_revenue: data[0].monthly_revenue as unknown as KPIData,
          completion_rate: data[0].completion_rate as unknown as KPIData,
          system_health: data[0].system_health as unknown as KPIData
        };
        setKpis(transformedData);
      }
      setIsLoading(false);
    };

    fetchKPIs();

    const channel = supabase
      .channel('admin_kpis')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'admin_kpis' },
        payload => {
          const newData = payload.new;
          const transformedData: Record<string, KPIData> = {
            active_producers: newData.active_producers as unknown as KPIData,
            monthly_revenue: newData.monthly_revenue as unknown as KPIData,
            completion_rate: newData.completion_rate as unknown as KPIData,
            system_health: newData.system_health as unknown as KPIData
          };
          setKpis(transformedData);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Active Producers</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl">{kpis.active_producers?.value}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl">{kpis.monthly_revenue?.value}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Completion Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl">{kpis.completion_rate?.value}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl">{kpis.system_health?.value}</p>
        </CardContent>
      </Card>
    </div>
  );
};
