import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { MainCard } from 'components';
import { gridSpacing } from 'constants';
import { formatCurrency, demicrofy } from 'utils';
import { useAnchorLiquidationContract } from 'hooks';

// chart data
import { barChartData } from './chartData/barChartData';

//================================|| DASHBOARD DEFAULT - BAR CHART ||================================//

export const BarChart = ({ isLoading }) => {
  const [pools, setPools] = useState();

  const { collateralTokens, currentCollateralToken } = useSelector((state) => state.bidReducer);

  const { getBidPoolsByCollateral } = useAnchorLiquidationContract();

  const tokenInfo = collateralTokens?.find(({ token }) => {
    return token === currentCollateralToken;
  });

  useEffect(() => {
    if (!currentCollateralToken) return;
    const getBids = async () => {
      try {
        const { bid_pools } = await getBidPoolsByCollateral(currentCollateralToken);
        setPools(bid_pools);
      } catch (error) {
        console.log(error);
      }
    };

    getBids();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCollateralToken]);

  useEffect(() => {
    const ser = pools?.map((item) => {
      return {
        y: item.total_bid_amount,
        x: item.premium_rate,
      };
    });

    const chartSeries = [
      {
        name: tokenInfo?.symbol + ' bids',
        data: ser,
      },
    ];

    const newChartData = {
      series: chartSeries,

      xaxis: {
        labels: {
          formatter: (val) => Math.floor(val * 100) + '%',
          rotate: -45,
        },
      },

      yaxis: {
        labels: {
          formatter: (val) => formatCurrency(demicrofy(val), 0),
        },
      },
    };

    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
      // * The new config object is merged with the existing config object preserving the existing configuration.
      // * https://apexcharts.com/docs/methods/#updateOptions
    }
  }, [isLoading, pools, tokenInfo]);

  return (
    <>
      {isLoading ? null : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Chart {...barChartData} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};
