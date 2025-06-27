import { useState } from "react";
import { Modal, Select, Input, message } from "antd";
import { createLeaveRequest } from "api/student";

interface LeaveRequestModalProps {
  open: boolean;
  onClose: () => void;
  courseScheduleId: string;
  availableDays: string[];
}

const { Option } = Select;

export default function LeaveRequestModal({
  open,
  onClose,
  courseScheduleId,
  availableDays,
}: LeaveRequestModalProps) {
  const [requestedDay, setRequestedDay] = useState<string>();
  const [reason, setReason] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!requestedDay) {
      message.warning("Please select the day you want to request leave for.");
      return;
    }
    if (!reason) {
      message.warning("Please enter a reason.");
      return;
    }
    setLoading(true);
    try {
      await createLeaveRequest({ courseScheduleId, requestedDay, reason });
      message.success("Leave request submitted");
      onClose();
    } catch (err: any) {
      message.error(err?.response?.data?.message || "Failed to submit leave");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Request Leave"
      open={open}
      onOk={handleSubmit}
      onCancel={onClose}
      okButtonProps={{ loading }}
    >
      <div className="flex flex-col gap-4">
        <label className="text-sm font-medium text-gray-700">Select Day</label>
        <Select
          placeholder="Day of Week"
          value={requestedDay}
          onChange={(v) => setRequestedDay(v)}
        >
          {availableDays.map((day) => (
            <Option key={day} value={day}>
              {day}
            </Option>
          ))}
        </Select>

        <label className="text-sm font-medium text-gray-700">Reason</label>
        <Input.TextArea
          rows={4}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter reason for leave"
        />
      </div>
    </Modal>
  );
}
