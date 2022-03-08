import { Formik, Form } from 'formik';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';

// project imports
import { useAnchorLiquidationContract } from 'hooks';
import { SubmitButton, SubCard, Loader, M0FormikTextField } from 'components';

//================================|| BID FORM ||================================//

export const WithdrawalBids = ({ selectedBid, handleClose }) => {
  const dispatch = useDispatch();
  const { collateralTokens, userBids, currentCollateralToken } = useSelector((state) => state.bidReducer);

  const { claimLiquidations } = useAnchorLiquidationContract();

  // TODO add token name to text field
  const tokenInfo = collateralTokens?.find(({ token }) => {
    return token === currentCollateralToken;
  });

  const theme = useTheme();
  const formikRef = useRef();

  const [currentToken, setCurrentToken] = useState();
  const [availableWithdrawal, setAvailablewithdrawal] = useState();

  const handleSubmit = async (values, { resetForm, setSubmitting, setFieldValue }) => {
    if (selectedBid) {
      // TODO
      handleClose();
    } else {
      await claimLiquidations(currentCollateralToken);
    }

    setSubmitting(false);
    resetForm(initialValues);
    // * to keep current collateral token
    setFieldValue('collateral_token', values.collateral_token, false);
  };

  useEffect(() => {
    const plc_sum = userBids
      ?.map((item) => {
        return item.pending_liquidated_collateral;
      })
      .reduce((previousValue, currentValue) => parseInt(previousValue) + parseInt(currentValue), 0);
    setAvailablewithdrawal(plc_sum);
  }, [userBids]);

  useEffect(() => {
    formikRef.current.setFieldValue('available_withdrawal', availableWithdrawal, false);
  }, [availableWithdrawal]);

  const initialValues = {
    available_withdrawal: '',
  };

  return (
    <SubCard title="Withdraw Liquidations" style={{ paddingBtoom: 0 }}>
      <Formik innerRef={formikRef} initialValues={initialValues} onSubmit={handleSubmit} validateOnChange={false} validateOnBlur={false}>
        {({ isSubmitting }) => (
          <Form>
            {isSubmitting && <Loader />}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <M0FormikTextField name="available_withdrawal" label="Available for Withdrawal" />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <SubmitButton isSubmitting={isSubmitting} text="Claim All" color="primary" fullWidth={true} size="medium" />
            </Grid>
          </Form>
        )}
      </Formik>
    </SubCard>
  );
};
