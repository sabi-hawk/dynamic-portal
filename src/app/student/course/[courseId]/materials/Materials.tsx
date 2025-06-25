import React from "react";
import { useParams } from "react-router-dom";
import { List, Spin } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import API from "api";
import { useState, useEffect } from "react";
import { getStudentMaterials } from "api/student";

function Materials() {
  const { courseId } = useParams();

  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      if (!courseId) return;
      try {
        setLoading(true);
        const res = await getStudentMaterials(courseId as string);
        setMaterials(res.data || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load materials");
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [courseId]);

  if (loading) return <Spin className="p-6" />;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">Course Materials</h3>
      {materials.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No materials have been uploaded yet.
        </div>
      ) : (
        <List
          bordered
          dataSource={materials}
          renderItem={(item: any) => (
            <List.Item
              actions={[
                <a
                  key="download"
                  href={`${(API.defaults.baseURL || "").replace(
                    /\/api\/?$/,
                    ""
                  )}/uploads/materials/${item.storedName}`}
                  download={item.originalName}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DownloadOutlined />
                </a>,
              ]}
            >
              {item.originalName} ({(item.size / 1024).toFixed(1)} KB) –
              {new Date(item.createdAt).toLocaleString()}
            </List.Item>
          )}
        />
      )}
    </div>
  );
}

export default Materials;
