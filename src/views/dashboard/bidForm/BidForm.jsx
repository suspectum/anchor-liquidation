import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { useAnchorLiquidationContract } from 'hooks';
import { FETCH_BIDS, SET_CURRENT_COLLATERAL_TOKEN } from 'constants';
import { M0FormikSelect, M0FormikPremium, M0FormikCurrency, SubmitButton, SubCard, Loader } from 'components';

//================================|| BID FORM ||================================//

export const BidForm = ({ selectedBid, handleClose }) => {
  const dispatch = useDispatch();
  const { collateralTokens } = useSelector((state) => state.bidReducer);

  const formikRef = useRef();

  const { submitBid, retractBid } = useAnchorLiquidationContract();

  const [currentToken, setCurrentToken] = useState();

  const handleSubmit = async (values, { resetForm, setSubmitting, setFieldValue }) => {
    if (selectedBid) {
      // TODO bid can be retract by amount. For selected bid give an option for this.
      await retractBid(selectedBid.bid_idx, values.amount);
      handleClose();
    } else {
      await submitBid(values);
    }
    setSubmitting(false);
    resetForm(initialValues);
    // * to keep current collateral token
    setFieldValue('collateral_token', values.collateral_token, false);
  };

  useEffect(() => {
    if (collateralTokens) {
      setCurrentToken(collateralTokens[0].token);
      formikRef.current.setFieldValue('collateral_token', collateralTokens[0].token, false);
    }
  }, [collateralTokens]);

  useEffect(() => {
    if (currentToken) {
      dispatch({ type: SET_CURRENT_COLLATERAL_TOKEN, payload: currentToken });
      dispatch({ type: FETCH_BIDS, payload: true });
    }
  }, [dispatch, currentToken]);

  const initialValues = {
    collateral_token: '',
    amount: '',
    premium_slot: '',
  };

  const validationSchema = Yup.object().shape({
    amount: Yup.number().typeError('Amount must be a number').positive('Amount must be a positive number').required('Amount is required'),
    collateral_token: Yup.string().required('Collateral Token is required'),
    premium_slot: Yup.string().required('Premium is required'),
  });

  return (
    <SubCard title={selectedBid ? 'Retract The Bid' : 'Place a Bid'} style={{ paddingBtoom: 0 }}>
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ isSubmitting, handleChange }) => (
          <Form>
            {isSubmitting && <Loader />}
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <M0FormikSelect
                  name="collateral_token"
                  label="Collateral Token"
                  obj={collateralTokens}
                  onChange={(e) => {
                    setCurrentToken(e.target.value);
                    handleChange(e);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <M0FormikCurrency name="amount" label="Amount" />
              </Grid>
              <Grid item xs={12}>
                <M0FormikPremium name="premium_slot" label="Premium" />
              </Grid>
            </Grid>
            <Grid item>
              <SubmitButton
                isSubmitting={isSubmitting}
                text={!selectedBid ? 'Submit' : 'Retract'}
                color={!selectedBid ? 'primary' : 'error'}
                fullWidth={true}
                size="medium"
              />
            </Grid>
          </Form>
        )}
      </Formik>
    </SubCard>
  );
};
