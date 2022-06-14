import { createTeacher } from '@apis/teacher';
import {
  Button,
  Classes,
  Dialog,
  Divider,
  FormGroup,
  InputGroup,
  Intent,
  Radio,
  RadioGroup,
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const validationSchema = yup.object().shape({
  name: yup.string().required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  gender: yup.string().required('Required'),
  bankName: yup.string().required('Required'),
  accountName: yup.string().required('Required'),
  accountNo: yup.string().required('Required'),
});

const CreateTeacherModal = ({ visible, onClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const { values, handleSubmit, handleReset, handleChange } = useFormik({
    initialValues: {
      name: '',
      email: '',
      gender: 'M',
      bankName: '',
      accountName: '',
      accountNo: '',
    },
    validationSchema,
    onSubmit: async () => {
      setLoading(true);
    },
    onReset: () => {
      onClose();
    },
  });

  return (
    <Dialog title="Create teacher" isOpen={visible} onClose={handleReset}>
      <form onSubmit={handleSubmit}>
        <div className={Classes.DIALOG_BODY}>
          <FormGroup label="Name" labelInfo="(required)">
            <InputGroup
              type="text"
              placeholder="John Doe ..."
              name="name"
              value={values.name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup label="Email" labelInfo="(required)">
            <InputGroup
              type="email"
              placeholder="example@example.com ..."
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </FormGroup>
          <RadioGroup
            label="Gender"
            selectedValue={values.gender}
            onChange={handleChange}
            name="gender"
            inline
          >
            <Radio label="Male" value="M" />
            <Radio label="Female" value="F" />
            <Radio label="N/A" value="NA" />
          </RadioGroup>
          <Divider />
          <FormGroup label="Bank name" labelInfo="(required)">
            <InputGroup
              type="text"
              placeholder="Vietcombank ..."
              name="bankName"
              value={values.bankName}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup label="Account Number" labelInfo="(required)">
            <InputGroup
              type="text"
              placeholder="1234 1234 1234 1234 ..."
              name="accountNo"
              value={values.accountNo}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup label="Account Name" labelInfo="(required)">
            <InputGroup
              type="text"
              placeholder="John Doe ..."
              name="accountName"
              value={values.accountName}
              onChange={handleChange}
            />
          </FormGroup>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
              type="submit"
              intent={Intent.PRIMARY}
              icon={IconNames.TICK}
              loading={loading}
            >
              Create
            </Button>
            <Button type="reset" onClick={handleReset} icon={IconNames.CROSS}>
              Close
            </Button>
          </div>
        </div>
      </form>
    </Dialog>
  );
};

export default CreateTeacherModal;
