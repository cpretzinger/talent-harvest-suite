import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ActivityItem } from '@/types/admin/dashboard';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export const ActivityFeed: React.FC = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      const { data, error } = await supabase
        .from('admin_activity_log')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50);

      if (data) {
        setActivities(data.map(item => ({
          ...item,
          type: item.type as "user" | "system" | "content" | "security"
        })));
      }
      setIsLoading(false);
    };

    fetchActivities();

    const subscription = supabase
      .channel('admin-activity')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'admin_activity_log' },
        payload => {
          const newActivity = {
            ...payload.new,
            type: payload.new.type as "user" | "system" | "content" | "security"
          };
          setActivities(current => [newActivity, ...current].slice(0, 50));
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-40">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50"
          >
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{activity.action}</p>
              <p className="text-sm text-gray-500">{activity.description}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(activity.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};