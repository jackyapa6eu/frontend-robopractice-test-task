import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';

interface SearchFormProps {
  handleSubmit: (S: string) => void
}

interface FormValues {
  FullName: string
}

const SearchForm: React.FC<SearchFormProps> = ({handleSubmit}) => {
  const [form] = Form.useForm();
  const onSubmit = (values: FormValues) => {
    handleSubmit(values.FullName);
  };

  const onReset = () => {
    form.resetFields();
    handleSubmit('');
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 0,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={onSubmit}
      autoComplete="off"
      layout="inline"
      form={form}
    >
      <Form.Item
        label="FullName"
        name="FullName"
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 0, span: 8 }}>
        <Button type="primary" htmlType="submit">
          Filter
        </Button>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 0, span: 8 }}>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SearchForm;
