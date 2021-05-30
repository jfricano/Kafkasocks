import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import { FC } from 'react';
import { Theme, createStyles, makeStyles, Typography, Container, Hidden } from '@material-ui/core';
import { Element } from 'react-scroll';
import NavBar from './components/NavBar';
import FeaturesContainer from './containers/FeaturesContainer';
import DataDisplay from './DataDisplay';
import GettingStarted from './components/GettingStarted';
import theme from './theme';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'inline-block',
    alignItems: 'center',
    // justifyContent: 'flex-end',
    flexDirection: 'column',
    overflow: 'hidden',
    minWidth: '100vw',
    maxWidth: '100vw',
  },
  topContainer: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'flex-end',
    flexDirection: 'column',
    minWidth: '100vw',
    maxWidth: '100vw',
    paddingLeft: '0',
    paddingRight: '0',
    paddingTop: '0',
    overflow: 'hidden',
  },
  titleBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '15vh',
    paddingBottom: '15vh',
    minWidth: '100vw',
    maxWidth: '100vw',
    overflow: 'hidden',
    background: theme.palette.primary.main
  },
  segment: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '5vh',
    paddingBottom: '5vh',
  },
  bold: {
    fontWeight: 900,
  }
}))

const logo = require('./assets/code.svg');
// playground\client\assets\ks-logo-full.svg
const App: FC = () => {
  const classes = useStyles();
  return (
    <Container className={classes.topContainer} maxWidth='lg'>
      <NavBar />
      <Container className={classes.titleBox} component={Element} name='top' >
        <img alt="mainLogo" style={{ height: '25vh', paddingBottom: '5vh' }} src={ logo }/>
        <Typography className={ classes.bold }
          variant="h3"
          align="center"
          color="textSecondary"
          gutterBottom
        >
          Kafka Socks
          </Typography>
        <Typography
          variant="h6"
          align="center"
          color="textSecondary"
          gutterBottom
        >
          Making connecting WebSockets with Kafka as easy as npm install kafka-socks
        </Typography>
      </Container>

         <Container className={classes.segment} component={Element} name="features">
          <FeaturesContainer />
        </Container>

          <Container className={classes.segment} component={Element} name="demo">
            <DataDisplay />
          </Container>
        <Container className={classes.segment} component={Element} name="getting started">
          {/* <GettingStarted /> */}
        </Container>
        <Container className={classes.segment} component={Element} name="team">
          {/* <TeamContainer /> */}
        </Container>     
      </Container>
    )
    
  }
  
export default App;