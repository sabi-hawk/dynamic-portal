import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Upload, List, Card, Tag, message } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from "api/announcement";
import { DatePicker } from "antd";
import dayjs from "dayjs";

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

const AdminAnnouncements = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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

  const handleCreateOrUpdate = async (values: any) => {
    const formData = new FormData();
    formData.append("title", values.title.trim());
    formData.append("description", values.description.trim());
    if (values.tags && typeof values.tags === "string") {
      values.tags.split(",").map((tag: string) => tag.trim()).forEach((tag: string) => {
        if (tag) formData.append("tags", tag);
      });
    }
    if (values.expiryDate) {
      formData.append("expiryDate", values.expiryDate.format ? values.expiryDate.format("YYYY-MM-DD") : values.expiryDate);
    }
    if (values.image && values.image.fileList && values.image.fileList[0]) {
      formData.append("announcement", values.image.fileList[0].originFileObj);
    }
    try {
      if (editing && editing._id) {
        await updateAnnouncement(editing._id, formData);
        message.success("Announcement updated");
      } else {
        await createAnnouncement(formData);
        message.success("Announcement created");
      }
      setModalOpen(false);
      setEditing(null);
      form.resetFields();
      fetchAnnouncements();
    } catch (e) {
      message.error(editing ? "Failed to update announcement" : "Failed to create announcement");
    }
  };

  const handleEdit = (announcement: Announcement) => {
    setEditing(announcement);
    setModalOpen(true);
    form.setFieldsValue({
      ...announcement,
      tags: announcement.tags ? announcement.tags.join(", ") : "",
      expiryDate: announcement.expiryDate ? dayjs(announcement.expiryDate) : undefined,
      image: undefined, // Don't prefill image
    });
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteAnnouncement(id);
      message.success("Announcement deleted");
      fetchAnnouncements();
    } catch (e) {
      message.error("Failed to delete announcement");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Announcements</h2>
        <div className="flex gap-2">
          <Button onClick={fetchAnnouncements} loading={loading} icon={<UploadOutlined />}>Sync</Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => { setModalOpen(true); setEditing(null); form.resetFields(); }}>
            Create Announcement
          </Button>
        </div>
      </div>
      <Modal
        title={editing ? "Edit Announcement" : "Create Announcement"}
        open={modalOpen}
        onCancel={() => { setModalOpen(false); setEditing(null); form.resetFields(); }}
        onOk={() => form.submit()}
        okText={editing ? "Update" : "Create"}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateOrUpdate}>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: "'title' is required" },
              { whitespace: true, message: "'title' cannot be empty or just spaces" },
              {
                validator: (_, value) =>
                  value && value.trim() !== ""
                    ? Promise.resolve()
                    : Promise.reject(new Error("'title' cannot be empty or just spaces")),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "'description' is required" },
              { whitespace: true, message: "'description' cannot be empty or just spaces" },
              {
                validator: (_, value) =>
                  value && value.trim() !== ""
                    ? Promise.resolve()
                    : Promise.reject(new Error("'description' cannot be empty or just spaces")),
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="tags" label="Tags" initialValue="">
            <Input placeholder="Comma separated" />
          </Form.Item>
          <Form.Item name="expiryDate" label="Expiry Date">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="image" label="Image">
            <Upload beforeUpload={() => false} maxCount={1} listType="picture">
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
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
              actions={[
                <Button key="edit" type="link" onClick={() => handleEdit(item)}>
                  Edit
                </Button>,
                <Button
                  key="delete"
                  type="link"
                  danger
                  loading={deletingId === item._id}
                  onClick={() => {
                    Modal.confirm({
                      title: "Delete Announcement",
                      content: "Are you sure you want to delete this announcement?",
                      okText: "Delete",
                      okType: "danger",
                      cancelText: "Cancel",
                      onOk: () => handleDelete(item._id!),
                    });
                  }}
                >
                  Delete
                </Button>,
              ]}
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

export default AdminAnnouncements; 