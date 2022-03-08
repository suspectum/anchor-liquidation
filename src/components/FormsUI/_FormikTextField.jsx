import { forwardRef } from 'react';
import { Field, useField } from 'formik';
import NumberFormat from 'react-number-format';

// material-ui
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

// project imports
import { demicrofy } from 'utils';

const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
  return <NumberFormat {...props} getInputRef={ref} decimalScale={6} thousandSeparator fixedDecimalScale={true} isNumericString />;
});

//================================|| FORMIK TEXT ||================================//

export const FormikTextField = (props) => {
  const [field, meta, helpers] = useField(props);

  const handleChange = (value) => {
    helpers.setValue(value?.floatValue ?? '');
  };

  return (
    <Field
      as={TextField}
      fullWidth
      margin="normal"
      size="large"
      value={field?.value && demicrofy(field.value).toString()}
      onChange={null}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      InputProps={{
        readOnly: true,
        autoComplete: 'off',
        inputComponent: NumberFormatCustom,
        inputProps: {
          onValueChange: handleChange,
        },
      }}
      {...props}
    />
  );
};

export const StyledFormikTextField = styled((props) => <FormikTextField {...props} />)(({ theme }) => ({
  ...theme.typography.customInput,
}));

export const M0FormikTextField = styled((props) => <FormikTextField {...props} />)(() => ({
  margin: 0,
}));
