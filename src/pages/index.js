import { useState } from "react";
import { Input, Button, Table } from "antd";

import testHooks from "../hooks/testHooks";
import EditableCell from "../components/EditableCell";

export default () => {
  const [name, setName] = useState("");
  const { users } = testHooks();

  const columns = [
    {
      title: "id",
      dataIndex: "id"
    },
    {
      title: "name",
      dataIndex: "name",
      render: (text, record) => <EditableCell record={record} property="name" />
    }
  ];
  return (
    <div>
      <span>double click name column to modify it</span>
      <Table columns={columns} rowKey="id" dataSource={users} />
    </div>
  );
};
