import { Input, Select, Form, InputNumber
 } from "antd";

 
export const Form_Modif = ({ fields, form }) => (

   
  <Form
    form={form}
    name="global_state"
    fields={fields}
    labelCol={{
      span: 6,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}>
    <Form.Item name="NumMat" label="N° Materiel" >
      <Input disabled={true} />
    </Form.Item>
    <Form.Item name="Design" label="Désignation" rules={[
          {
            required: true,
            message: 'Ce champ ne doit pas être vide',
          },
        ]}>
      <Input />
    </Form.Item>
    <Form.Item name="Etat" label="Etat" rules={[
          {
            required: true,
            message: 'Ce champ ne doit pas être vide',
          },
        ]}>
      <Select>
      <Select.Option value={"Bon"}>Bon</Select.Option>
      <Select.Option value={"Mauvais"}>Mauvais</Select.Option>
      <Select.Option value={"Abimé"}>Abimé</Select.Option>
      </Select>
      
    </Form.Item>
    <Form.Item name="Qte" label="Qte" rules={[
          {
            required: true,
            message: 'Ce champ ne doit pas être vide',
          },
        ]}>
      <InputNumber type="number" />
    </Form.Item>
  </Form>
);
export const Form_Add = ({ form }) => (

   
  <Form
    form={form}
    name="global_state"
    labelCol={{
      span: 6,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}>
    <Form.Item name="NumMat" label="N° Materiel"  rules={[
          {
            required: true,
            message: 'Ce champ ne doit pas être vide',
          },
        ]}>
      <Input />
    </Form.Item>
    <Form.Item name="Design" label="Désignation" rules={[
          {
            required: true,
            message: 'Ce champ ne doit pas être vide',
          },
        ]}>
      <Input />
    </Form.Item>
    <Form.Item name="Etat" label="Etat" rules={[
          {
            required: true,
            message: 'Ce champ ne doit pas être vide',
          },
        ]}>
      <Select>
      <Select.Option value={"Bon"}>Bon</Select.Option>
      <Select.Option value={"Mauvais"}>Mauvais</Select.Option>
      <Select.Option value={"Abimé"}>Abimé</Select.Option>
      </Select>
      
    </Form.Item>
  </Form>
);
