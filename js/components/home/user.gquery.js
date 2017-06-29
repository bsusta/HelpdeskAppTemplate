import gql from 'graphql-tag';
import { userFragment } from './user.fragment';


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

export const user = gql`
	query User($id: ID!) {
		User(id: $id) {
			id
			email
		}
	}
`;
export const editedTasksSubscription = gql`
	subscription {
		Task(filter: {mutation_in: [CREATED,UPDATED,DELETED]}) {
			mutation
			node {
				id
				key:id
				title
        deadlineAt
        description
        assignedUser{
          firstName,
          id
        }
				createdAt
				active
			}
		}
	}
`;
export const tasks = gql`
  query Tasks {
       allTasks (orderBy: id_DESC) {
		id
		key: id
		title
		deadlineAt
    description
    assignedUser{
      firstName,
      id
    }
	 }
  }
`;
