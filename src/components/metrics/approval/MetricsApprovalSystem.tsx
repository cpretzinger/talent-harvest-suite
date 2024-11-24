import React, { useState } from 'react';
import { DailyMetrics } from '@/types/producer/metrics';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MetricsSummary } from '../MetricsSummary';

interface ApprovalWorkflowProps {
  metrics: DailyMetrics;
  onApprove: (metrics: DailyMetrics) => Promise<void>;
  onReject: (metrics: DailyMetrics, reason: string) => Promise<void>;
}

export const MetricsApprovalSystem: React.FC<ApprovalWorkflowProps> = ({
  metrics,
  onApprove,
  onReject
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleApproval = async () => {
    setIsProcessing(true);
    try {
      await onApprove(metrics);
      toast.success('Metrics approved successfully');
    } catch (error) {
      toast.error('Failed to approve metrics');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason) {
      toast.error('Please provide a reason for rejection');
      return;
    }

    setIsProcessing(true);
    try {
      await onReject(metrics, rejectionReason);
      setShowRejectionModal(false);
      toast.success('Metrics rejected successfully');
    } catch (error) {
      toast.error('Failed to reject metrics');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="p-6">
      <MetricsSummary metrics={metrics} />
      
      <div className="mt-4 flex justify-end space-x-4">
        <Button
          variant="outline"
          onClick={() => setShowRejectionModal(true)}
          disabled={isProcessing}
        >
          Reject
        </Button>
        <Button
          onClick={handleApproval}
          disabled={isProcessing}
        >
          Approve
        </Button>
      </div>

      <Dialog open={showRejectionModal} onOpenChange={setShowRejectionModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Metrics</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Please provide a reason for rejection"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectionModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleReject} disabled={isProcessing}>
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};