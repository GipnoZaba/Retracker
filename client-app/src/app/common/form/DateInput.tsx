import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";

interface IProps extends FieldRenderProps<Date, HTMLElement>, FormFieldProps {}

export const DateInput: React.FC<IProps> = ({
  input,
  width,
  meta: { touched, error }
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <input type="date" onChange={input.onChange} onBlur={input.onBlur} />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};
