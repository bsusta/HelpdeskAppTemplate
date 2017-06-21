import gql from 'graphql-tag';
import { userFragment } from './user.fragment';

export const users = gql`
  query AllUsers {
    allUsers(orderBy: email_ASC) {
      id
      active
      email
	  }
  }
`;


export const signinUser = gql`
	mutation ($email: String!, $password: String!) {
		signinUser(email: {email: $email, password: $password}) {
		  token
			user {
			  id
			  email
			}
		}
	}
`;


export const createUser = gql`
	mutation (
	  $active: Boolean!,
	  $authProvider: AuthProviderSignupData!,
    $firstName: String,
    $surName: String,
    $note: String,
    $company: ID,
	) {
		createUser(
		  active: $active,
			authProvider: $authProvider
      firstName: $firstName,
      surName: $surName,
      note: $note,
      companyId: $company,
		) {
		  id
      active
      email
		}
	}
`;


export const user = gql`
	query User($id: ID!) {
		User(id: $id) {
			id
			email
		}
	}
`;


export const me = gql`
	query Me {
		user {
			id
			email
		}
	}
`;


export const updateUser = gql`
	mutation UpdateUser(
	  $id: ID!,
    $active: Boolean!,
	  $email: String!,
    $password: String,
    $firstName: String,
    $surName: String,
    $note: String,
    $company: ID!,
	) {
		updateUser(
		  id: $id,
      active: $active,
			email: $email,
      password: $password,
      firstName: $firstName,
      surName: $surName,
      note: $note,
      companyId: $company,
		) {
		  ...UserInfo
		}
	}
	${userFragment}
`;


export const deleteUser = gql`
	mutation ($userId: ID!) {
		deleteUser(
			id: $userId,
		) {
		  id
		}
	}
`;
