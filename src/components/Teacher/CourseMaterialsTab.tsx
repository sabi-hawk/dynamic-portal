import { Upload, Button, List, Spin, message, Popconfirm } from "antd";
import {
  UploadOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadMaterial, getMaterials, deleteMaterial } from "api/material";

interface Props {
  scheduleId: string;
}

function CourseMaterialsTab({ scheduleId }: Props) {
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["materials", scheduleId],
    queryFn: () => getMaterials(scheduleId).then((res) => res.data),
    enabled: !!scheduleId,
  });

  const uploadMut = useMutation({
    mutationFn: (file: File) => uploadMaterial(scheduleId, file),
    onSuccess: () => {
      message.success("Uploaded");
      qc.invalidateQueries({ queryKey: ["materials", scheduleId] });
    },
    onError: () => message.error("Upload failed"),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteMaterial(id),
    onSuccess: () => {
      message.success("Deleted");
      qc.invalidateQueries({ queryKey: ["materials", scheduleId] });
    },
  });

  const uploadProps = {
    beforeUpload: (file: File) => {
      uploadMut.mutate(file);
      return false; // prevent auto upload
    },
    showUploadList: false,
  };

  if (isLoading) return <Spin />;

  const materials = data || [];

  return (
    <div>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>Upload File</Button>
      </Upload>

      <List
        className="mt-4"
        bordered
        dataSource={materials}
        renderItem={(item: any) => (
          <List.Item
            actions={[
              <a key="download" href={`/uploads/${item.storedName}`} download>
                <DownloadOutlined />
              </a>,
              <Popconfirm
                title="Delete?"
                onConfirm={() => deleteMut.mutate(item._id)}
              >
                <Button type="text" danger icon={<DeleteOutlined />} />
              </Popconfirm>,
            ]}
          >
            {item.originalName} ({(item.size / 1024).toFixed(1)} KB) –
            {new Date(item.createdAt).toLocaleString()}
          </List.Item>
        )}
      />
    </div>
  );
}

export default CourseMaterialsTab;
