import React, { useEffect, useState } from "react";
import { List, Button, Upload, message, Spin } from "antd";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import {
  getStudentSubmissions,
  uploadStudentSubmission,
  getOwnSubmissionUpload,
} from "api/submission";
import { useParams } from "react-router-dom";
import API from "api";

function Submissions() {
  const { courseId } = useParams();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [uploadMap, setUploadMap] = useState<Record<string, any | null>>({});

  const fetchSubs = async () => {
    try {
      setLoading(true);
      const res = await getStudentSubmissions();
      const list = res.data.filter(
        (s: any) => s.courseSchedule?.course === courseId
      );
      setSubmissions(list);
      // fetch own upload status
      list.forEach(async (sub: any) => {
        const upres = await getOwnSubmissionUpload(sub._id);
        setUploadMap((prev) => ({ ...prev, [sub._id]: upres.data }));
      });
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
  }, [courseId]);

  const handleBeforeUpload = (subId: string) => async (file: File) => {
    try {
      setUploadingId(subId);
      await uploadStudentSubmission(subId, file);
      message.success("Uploaded");
      // refresh upload status
      const upres = await getOwnSubmissionUpload(subId);
      setUploadMap((prev) => ({ ...prev, [subId]: upres.data }));
    } catch (err) {
      console.error(err);
      message.error("Upload failed");
    } finally {
      setUploadingId(null);
    }
    return false; // prevent auto upload by antd
  };

  if (loading) return <Spin className="p-6" />;

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">Submissions</h3>
      {submissions.length === 0 ? (
        <div>No active submissions right now.</div>
      ) : (
        <List
          bordered
          dataSource={submissions}
          renderItem={(item: any) => {
            const upload = uploadMap[item._id];
            const now = Date.now();
            const deadlinePassed = now > new Date(item.endDate).getTime();
            return (
              <List.Item
                actions={[
                  upload ? (
                    <a
                      key="d"
                      href={`${(API.defaults.baseURL || "").replace(
                        /\/api\/?$/,
                        ""
                      )}/uploads/submissions/${upload.file?.storedName}`}
                      download={upload.file?.originalName}
                    >
                      <DownloadOutlined />
                    </a>
                  ) : !deadlinePassed ? (
                    <Upload
                      key="u"
                      beforeUpload={handleBeforeUpload(item._id)}
                      showUploadList={false}
                    >
                      <Button
                        icon={<UploadOutlined />}
                        loading={uploadingId === item._id}
                      >
                        Upload
                      </Button>
                    </Upload>
                  ) : null,
                ]}
              >
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-gray-500">
                    Due: {new Date(item.endDate).toLocaleString()}
                  </div>
                  {upload ? (
                    <div className="text-green-600 text-sm">Submitted</div>
                  ) : deadlinePassed ? (
                    <div className="text-red-500 text-sm">Missed</div>
                  ) : (
                    <div className="text-yellow-500 text-sm">Pending</div>
                  )}
                </div>
              </List.Item>
            );
          }}
        />
      )}
    </div>
  );
}

export default Submissions;
