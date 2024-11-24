import { useEffect, useState } from 'react';
import { Users, DollarSign, CheckCircle, Activity } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { KPIData, KPICardProps } from '@/types/admin/dashboard';
import { Card } from '@/components/ui/card';

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  trend,
  icon,
  color,
  formatter = (v) => v.toString()
}) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">
              {formatter(value)}
            </p>
            <span className={`ml-2 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </span>
          </div>
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

export const KPIGrid: React.FC = () => {
  const [kpis, setKpis] = useState<Record<string, KPIData>>({});

  useEffect(() => {
    const fetchKPIs = async () => {
      const { data, error } = await supabase
        .from('admin_kpis')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      if (data?.[0]) {
        const transformedData: Record<string, KPIData> = {
          active_producers: data[0].active_producers as KPIData,
          monthly_revenue: data[0].monthly_revenue as KPIData,
          completion_rate: data[0].completion_rate as KPIData,
          system_health: data[0].system_health as KPIData
        };
        setKpis(transformedData);
      }
    };

    fetchKPIs();
    const interval = setInterval(fetchKPIs, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Active Producers"
        value={kpis.active_producers?.value || 0}
        trend={kpis.active_producers?.trend || 0}
        icon={<Users className="h-6 w-6 text-blue-500" />}
        color="blue"
      />
      <KPICard
        title="Monthly Revenue"
        value={kpis.monthly_revenue?.value || 0}
        trend={kpis.monthly_revenue?.trend || 0}
        icon={<DollarSign className="h-6 w-6 text-green-500" />}
        color="green"
        formatter={(value) => `$${value.toLocaleString()}`}
      />
      <KPICard
        title="Completion Rate"
        value={kpis.completion_rate?.value || 0}
        trend={kpis.completion_rate?.trend || 0}
        icon={<CheckCircle className="h-6 w-6 text-purple-500" />}
        color="purple"
        formatter={(value) => `${value}%`}
      />
      <KPICard
        title="System Health"
        value={kpis.system_health?.value || 0}
        trend={kpis.system_health?.trend || 0}
        icon={<Activity className="h-6 w-6 text-orange-500" />}
        color="orange"
        formatter={(value) => `${value}%`}
      />
    </div>
  );
};