import ReactGA from 'react-ga';
const debug = false//process.env.NODE_ENV === 'development';

const GA_ID = 'UA-132389078-1'
ReactGA.initialize(GA_ID, {
  debug
});

const trackPageView = props => {
  ReactGA.set({
    page: props.location.pathname
  });
  ReactGA.pageview(props.location.pathname);
  return null
};


export {
  trackPageView as default
};