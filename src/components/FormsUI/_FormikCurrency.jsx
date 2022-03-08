import { forwardRef } from 'react';
import { Field, useField } from 'formik';
import NumberFormat from 'react-number-format';

// material-ui
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
  return <NumberFormat {...props} getInputRef={ref} thousandSeparator isNumericString prefix="$" />;
});

//================================|| FORMIK CURRENCY ||================================//

export const FormikCurrency = (props) => {
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
      value={field.value}
      onChange={null}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      InputProps={{
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

export const StyledFormikCurrency = styled((props) => <FormikCurrency {...props} />)(({ theme }) => ({
  ...theme.typography.customInput,
}));

export const M0FormikCurrency = styled((props) => <FormikCurrency {...props} />)(() => ({
  margin: 0,
}));
