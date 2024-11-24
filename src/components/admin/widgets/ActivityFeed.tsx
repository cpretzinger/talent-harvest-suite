import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "user" | "system" | "content" | "security";
  action: string;
  description: string;
  timestamp: string;
  metadata: Record<string, any>;
  user_id: string | null;
}

export const ActivityFeed = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      const { data } = await supabase
        .from('admin_activity_log')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50);

      if (data) {
        setActivities(data.map(item => ({
          ...item,
          type: item.type as "user" | "system" | "content" | "security",
          metadata: item.metadata as Record<string, any>
        })));
      }
      setIsLoading(false);
    };

    fetchActivities();

    const channel = supabase
      .channel('admin_activity_feed')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'admin_activity_log' },
        payload => {
          const newActivity: ActivityItem = {
            ...payload.new,
            type: payload.new.type as "user" | "system" | "content" | "security",
            metadata: payload.new.metadata as Record<string, any>
          };
          setActivities(current => [newActivity, ...current].slice(0, 50));
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
    <div className="activity-feed">
      {activities.map(activity => (
        <div key={activity.id} className={`activity-item ${activity.type}`}>
          <span className="activity-timestamp">{activity.timestamp}</span>
          <span className="activity-action">{activity.action}</span>
          <span className="activity-description">{activity.description}</span>
          {activity.metadata && <pre>{JSON.stringify(activity.metadata, null, 2)}</pre>}
        </div>
      ))}
    </div>
  );
};
