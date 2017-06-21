import { compose, withState, withHandlers } from 'recompose';
import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import withMe from './withMe';

// Components
import Login from './Login';

// Redux specific actions
import { setLoggedUser } from './actions';


import { addTokenToUse } from '../utils/tokenHandling';

// gQl queries
import { signinUser } from './user.gquery';


const reduxConnect = connect(null, (dispatch) =>
	bindActionCreators({
  setLoggedUser
}, dispatch));


const withLoading = withState('loading', 'setLoading', false);
const withEmail = withState('email', 'setEmail', 'krivdaj@gmail.com');
const withPassword = withState('password', 'setPassword', 'a');
const withError = withState('error', 'setError', '');



const withLoginHandlers = withHandlers({
  userSubmitsLogin: props => async args => {
		const { loading, setLoading, setError, setLoggedUser, client, router } = props; // eslint-disable-line

    if (!loading) {
      setLoading(true);

      const email = args.email.trim();
      const password = args.password.trim();

      try {
        if (!email || !password) {
          throw new Error('no email or password');
        }

        const loggedUserData = await client.mutate({
          mutation: signinUser,
          variables: { email, password }
        });


        const signedUser = loggedUserData.data.signinUser;


        setLoading(false);
        setError('');


        const token = signedUser.token;
        const userId = signedUser.user.id;

        addTokenToUse(client, token);

        setLoggedUser({
          id: userId,
          email: signedUser.user.email
        });

        router.replace('/projects');
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
  }
});

export default compose(
	withMe,
	withApollo,
	reduxConnect,
	withLoading,
	withEmail,
	withPassword,
	withError,
	withRouter,
	withLoginHandlers,
)(Login);
