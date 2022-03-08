import { forwardRef } from 'react';
import { Field, useField } from 'formik';
import NumberFormat from 'react-number-format';

// material-ui
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const NumberFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
  return <NumberFormat {...props} getInputRef={ref} thousandSeparator isNumericString suffix="%" />;
});

//================================|| FORMIK PREMIUM ||================================//

export const FormikPremium = (props) => {
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
      value={Math.min(Math.max(Math.round(parseInt(field.value)), 1), 30) || field.value}
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

export const StyledFormikPremium = styled((props) => <FormikPremium {...props} />)(({ theme }) => ({
  ...theme.typography.customInput,
}));

export const M0FormikPremium = styled((props) => <FormikPremium {...props} />)(() => ({
  margin: 0,
}));
