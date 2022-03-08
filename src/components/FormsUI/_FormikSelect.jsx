import { Field, useField } from 'formik';

// material-ui
import { styled } from '@mui/material/styles';
import { Select, FormControl, InputLabel, MenuItem, FormHelperText } from '@mui/material';

//================================|| FORMIK SELECT ||================================//

export const FormikSelect = ({ obj, ...otherProps }) => {
  // eslint-disable-next-line no-unused-vars
  const [field, meta] = useField(otherProps);

  return (
    <FormControl fullWidth error={meta.touched && Boolean(meta.error)}>
      <InputLabel>{otherProps.label}</InputLabel>
      <Field as={Select} {...otherProps} defaultValue="">
        {obj?.map((item) => (
          <MenuItem key={item.token} value={item.token}>
            {item.symbol}
          </MenuItem>
        ))}
      </Field>
      <FormHelperText error>{meta.touched && meta.error}</FormHelperText>
    </FormControl>
  );
};

export const M0FormikSelect = styled((props) => <FormikSelect {...props} />)(() => ({
  margin: 0,
}));
