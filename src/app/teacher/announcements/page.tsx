import React, { useEffect, useState } from "react";
import { List, Card, Tag, message, Button } from "antd";
import { getAnnouncements } from "api/announcement";
import { UploadOutlined } from "@ant-design/icons";

interface Announcement {
  _id?: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags?: string[];
  expiryDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

const TeacherAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const res = await getAnnouncements();
      setAnnouncements(res.data.data || []);
    } catch (e) {
      message.error("Failed to fetch announcements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Announcements</h2>
        <Button onClick={fetchAnnouncements} loading={loading} icon={<UploadOutlined />}>Sync</Button>
      </div>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={announcements}
        loading={loading}
        renderItem={(item: Announcement) => (
          <List.Item>
            <Card
              cover={item.imageUrl && <img alt="announcement" src={item.imageUrl} style={{ maxHeight: 180, objectFit: "cover" }} />}
              title={item.title}
              extra={item.expiryDate && <Tag color="red">Expires: {new Date(item.expiryDate).toLocaleDateString()}</Tag>}
            >
              <p>{item.description}</p>
              {item.tags && item.tags.length > 0 && (
                <div className="mt-2">
                  {item.tags.map((tag: string, idx: number) => <Tag key={idx}>{tag}</Tag>)}
                </div>
              )}
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TeacherAnnouncements; 