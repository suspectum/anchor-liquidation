import { Grid } from '@mui/material';

// project imports
import { gridSpacing } from 'constants';

import { MyBids } from './myBids/MyBids';
import { BidForm } from './bidForm/BidForm';
import { BarChart } from './chart/BarChart';
import { WithdrawalBids } from './withdrawalBids/withdrawalBids';

export const Dashboard = () => {
  return (
    // TODO add  isLoading, setIsLoading state to load components
    // TODO prepare skelotons
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item md={10} xs={12}>
            <BarChart />
          </Grid>
          <Grid item md={2} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <BidForm />
              </Grid>
              <Grid item xs={12}>
                <WithdrawalBids />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <MyBids />
      </Grid>
    </Grid>
  );
};
