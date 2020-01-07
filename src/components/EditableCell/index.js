import { useState } from "react";
import { Input, Form } from "antd";
import PropTypes from "prop-types";

import { useClickAway } from "@umijs/hooks";

import testHooks from "../../hooks/testHooks";

import styles from "./index.less";

const EditArea = Form.create()(RawEditArea);

function EditableCell({ record, property }) {
  const [editing, setEditing] = useState(false);
  const { modifyUser } = testHooks();
  const ref = useClickAway(() => {
    setEditing(false);
  });

  if (!editing) {
    return (
      <div
        style={{ height: "21px", width: "100%" }}
        onDoubleClick={() => {
          setEditing(true);
        }}
      >
        {record[property]}
      </div>
    );
  }

  return (
    <div ref={ref}>
      <EditArea
        record={record}
        property={property}
        onChange={val => {
          setEditing(false);
          modifyUser(record, {
            ...record,
            [property]: val
          });
        }}
      />
    </div>
  );
}

EditableCell.propTypes = {
  record: PropTypes.object,
  property: PropTypes.string
};

export default EditableCell;

function RawEditArea({ form, property, record, onChange }) {
  const { getFieldDecorator, validateFields } = form;

  function modify(e) {
    e.preventDefault();

    validateFields((err, values) => {
      if (err) {
        return;
      }
      onChange && onChange(values.name);
    });
  }

  return (
    <Form className={styles.editArea} onSubmit={modify}>
      <Form.Item>
        {getFieldDecorator("name", {
          initialValue: record[property]
        })(<Input autoFocus style={{ height: "26px" }} />)}
      </Form.Item>
    </Form>
  );
}

RawEditArea.propTypes = {
  form: PropTypes.object,
  record: PropTypes.object,
  property: PropTypes.string,
  onChange: PropTypes.func
};
