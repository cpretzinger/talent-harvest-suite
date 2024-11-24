import { KPIGrid } from './KPIGrid';
import { ActivityFeed } from './ActivityFeed';

export const DashboardWidgets: React.FC = () => {
  return (
    <div className="space-y-6">
      <KPIGrid />
      <ActivityFeed />
    </div>
  );
};