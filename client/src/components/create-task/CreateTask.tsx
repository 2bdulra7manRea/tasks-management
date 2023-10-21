import React, { useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
    assignedTo: yup.string(),
    assignedBy: yup.string(),
    status: yup.string(),
  })
  .required();

function CreateTask({
  onCancel,
  isModalOpen,
}: {
  onCancel: () => void;
  isModalOpen: boolean;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      assignedTo: "",
      assignedBy: "",
      status: "",
    },
    resolver: yupResolver(schema),
  });

  const handleOk = () => {
    onCancel();
  };

  const onSubmit = (data: any) => {
    console.log(data, "ddd");
  };

  return (
    <>
      <Modal title="Add New Task" style={{height:500}} open={isModalOpen} onOk={handleSubmit(onSubmit)} onCancel={onCancel}>
        <Form layout="vertical">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Form.Item label="Title">
                <Input value={value} onChange={onChange} onBlur={onBlur} />
                {errors.title && (
                  <span style={{ color: "red" }}>The Title is required.</span>
                )}
              </Form.Item>
            )}
            name="title"
          />

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Form.Item label="Description">
                <TextArea
                  rows={4}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
                {errors.description && (
                  <span style={{ color: "red" }}>
                    The Description is required.
                  </span>
                )}
              </Form.Item>
            )}
            name="description"
          />

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Form.Item label="Status">
                <Select value={value} onChange={onChange} onBlur={onBlur}>
                  <Select.Option value="demo">ToDo</Select.Option>
                  <Select.Option value="demo">InProgress</Select.Option>
                  <Select.Option value="demo">InQA</Select.Option>
                  <Select.Option value="demo">Blocked</Select.Option>
                </Select>

                {errors.status && (
                  <span style={{ color: "red" }}>The Status is required.</span>
                )}
              </Form.Item>
            )}
            name="status"
          />

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Form.Item label="assigned to">
                <Select value={value} onChange={onChange} onBlur={onBlur}>
                  <Select.Option value="demo">ToDo</Select.Option>
                  <Select.Option value="demo">InProgress</Select.Option>
                  <Select.Option value="demo">InQA</Select.Option>
                  <Select.Option value="demo">Blocked</Select.Option>
                </Select>

                {errors.assignedTo && (
                  <span style={{ color: "red" }}>This field is required.</span>
                )}
              </Form.Item>
            )}
            name="assignedTo"
          />

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Form.Item label="assigned By">
                <Select value={value} onChange={onChange} onBlur={onBlur}>
                  <Select.Option value="demo">ToDo</Select.Option>
                  <Select.Option value="demo">InProgress</Select.Option>
                  <Select.Option value="demo">InQA</Select.Option>
                  <Select.Option value="demo">Blocked</Select.Option>
                </Select>

                {errors.assignedBy && (
                  <span style={{ color: "red" }}>This field is required.</span>
                )}
              </Form.Item>
            )}
            name="assignedBy"
          />
        </Form>
      </Modal>
    </>
  );
}

export default CreateTask;
