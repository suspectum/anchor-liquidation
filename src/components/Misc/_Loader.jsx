// material-ui
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

//================================|| STYLED COMPONENTS ||================================//

const Wrapper = styled('div')(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1301,
  width: '100%',
}));

//================================|| LOADER ||================================//

export const Loader = () => {
  return (
    <Wrapper>
      <LinearProgress color="primary" />
    </Wrapper>
  );
};
