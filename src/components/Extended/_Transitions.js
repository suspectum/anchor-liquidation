// material-ui
import { Paper, Fade, Grow, Slide, Zoom } from '@mui/material';

//================================|| TRANSITIONS ||================================//

export const Transitions = ({ children, transformOrigin, type, direction, ...otherProps }) => {
  return (
    <>
      {type === 'grow' && (
        <Grow style={{ transformOrigin }} {...otherProps}>
          <Paper>{children}</Paper>
        </Grow>
      )}
      {type === 'fade' && (
        <Fade
          {...otherProps}
          timeout={{
            appear: 500,
            enter: 600,
            //TODO check this
            // exit: 400,
            exit: 0,
          }}
        >
          <Paper>{children}</Paper>
        </Fade>
      )}
      {type === 'slide' && (
        <Slide
          {...otherProps}
          timeout={{
            appear: 0,
            enter: 400,
            exit: 200,
          }}
          direction={direction}
        >
          <Paper>{children}</Paper>
        </Slide>
      )}
      {type === 'zoom' && (
        <Zoom style={{ transformOrigin }} {...otherProps}>
          <Paper>{children}</Paper>
        </Zoom>
      )}
    </>
  );
};

Transitions.defaultProps = {
  type: 'grow',
  transformOrigin: 'top left',
  direction: 'up',
};
