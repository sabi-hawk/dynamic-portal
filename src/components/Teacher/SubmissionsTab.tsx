import React, { useEffect, useState } from "react";
import {
  Button,
  List,
  Modal,
  DatePicker,
  Form,
  Input,
  Spin,
  Collapse,
  message,
} from "antd";
import { PlusOutlined, DownloadOutlined } from "@ant-design/icons";
import {
  createSubmission,
  getTeacherSubmissions,
  getSubmissionUploads,
} from "api/submission";
import API from "api";

interface Props {
  scheduleId: string;
}

function SubmissionsTab({ scheduleId }: Props) {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const fetchSubs = async () => {
    try {
      setLoading(true);
      const res = await getTeacherSubmissions();
      const list = res.data.filter(
        (s: any) => s.courseSchedule?._id === scheduleId
      );
      setSubmissions(list);
      setLoading(false);
    } catch (err) {
      console.error(err);
      message.error("Failed to load submissions");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleId]);

  const handleCreate = async (values: any) => {
    try {
      setModalLoading(true);
      await createSubmission({
        ...values,
        startDate: values.dateRange[0].toISOString(),
        endDate: values.dateRange[1].toISOString(),
        courseScheduleId: scheduleId,
      });
      message.success("Submission created");
      setModalOpen(false);
      fetchSubs();
    } catch (err) {
      console.error(err);
      message.error("Failed to create submission");
    } finally {
      setModalLoading(false);
    }
  };

  const [uploadsMap, setUploadsMap] = useState<Record<string, any[]>>({});

  const loadUploads = async (submissionId: string) => {
    if (uploadsMap[submissionId]) return; // already loaded
    try {
      const res = await getSubmissionUploads(submissionId);
      setUploadsMap((prev) => ({ ...prev, [submissionId]: res.data }));
      console.log("res.data", res.data);
      console.log("uploadsMap", uploadsMap);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setModalOpen(true)}
        className="mb-4"
      >
        New Submission
      </Button>
      {loading ? (
        <Spin />
      ) : (
        <Collapse
          accordion
          onChange={(key) => {
            const id = Array.isArray(key) ? key[0] : key;
            if (id) loadUploads(id as string);
          }}
        >
          {submissions.map((sub) => (
            <Collapse.Panel
              header={`${sub.title} (Due: ${new Date(
                sub.endDate
              ).toLocaleDateString()})`}
              key={sub._id}
            >
              {uploadsMap[sub._id] ? (
                uploadsMap[sub._id].length === 0 ? (
                  <div>No student uploads yet.</div>
                ) : (
                  <List
                    dataSource={uploadsMap[sub._id]}
                    renderItem={(item: any) => (
                      <List.Item
                        actions={[
                          <a
                            key="d"
                            href={`${(API.defaults.baseURL || "").replace(
                              /\/api\/?$/,
                              ""
                            )}/uploads/submissions/${item.file.storedName}`}
                            download={item.file.originalName}
                          >
                            <DownloadOutlined />
                          </a>,
                        ]}
                      >
                        {`${item.student?.userId?.name?.first || ""} ${
                          item.student?.userId?.name?.last || ""
                        }`.trim()}
                        {item.student?.rollNo
                          ? ` (Roll No: ${item.student.rollNo})`
                          : ""}
                        {" – "}
                        {item.file.originalName}
                      </List.Item>
                    )}
                  />
                )
              ) : (
                <Spin />
              )}
            </Collapse.Panel>
          ))}
        </Collapse>
      )}
      <Modal
        title="Create Submission"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form layout="vertical" onFinish={handleCreate}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="dateRange"
            label="Start & End Date"
            rules={[{ required: true, message: "Please select date range" }]}
          >
            <DatePicker.RangePicker showTime />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={modalLoading}>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default SubmissionsTab;
