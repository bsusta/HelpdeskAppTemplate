import { branch, compose, renderComponent, withState } from 'recompose';
import { withApollo } from 'react-apollo';

import SideEffector from '../helpers/sideEffector';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addTokenInMiddleware } from '../utils/tokenHandling';

import { setLoggedUser } from './actions';


// Components
import Loading from '../components/Loading';


// gQl queries
import { me } from './user.gquery';

const reduxConnect = connect((state) => ({
  loggedUserId: state.user.id,
}), (dispatch) =>
	bindActionCreators({
  setLoggedUser
}, dispatch));

const withMeQuery = ({
	loading,
	loggedUserId,
	tokenChecked,
	setTokenChecked,
	setLoading,
	client,
	setLoggedUser // eslint-disable-line
}) => {
  if (!loading && !tokenChecked && !loggedUserId) {
    setLoading(true);

    const authToken = localStorage.getItem('lanhelpdesk');
    setTokenChecked(true);

    if (!authToken) {
      setLoading(false);
    }

    if (authToken) {
      addTokenInMiddleware(client, authToken);

      client.query({
        query: me
      })
			.then(result => {
  const data = result.data;
  if (data && data.user) {
    const user = {
      id: data.user.id,
      email: data.user.email
    };
    setLoggedUser(user);
  }
})
			.catch(e => {
  setLoading(false);
  console.log(e);
});
    }
  }
};

const withLoading = withState('loading', 'setLoading', false);
const withError = withState('error', 'setError', '');
const withTokenCheck = withState('tokenChecked', 'setTokenChecked', false);

const displayLoadingState = branch(
	(props) => props.loading,
	renderComponent(Loading),
);

export default compose(
	withTokenCheck,
	withLoading,
	withError,
	reduxConnect,
	withApollo,
	displayLoadingState,
	SideEffector(withMeQuery) // eslint-disable-line
);
