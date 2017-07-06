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
        title
        description
    		id
        key: id
        assignedUser{
          firstName
          id
        }
        deadlineAt
        duration
        status
        requester{
          id
        }
        company{
          id
        }
			}
		}
	}
`;

export const tasks = gql`
  query Tasks {
       allTasks (orderBy: id_DESC) {
    title
    description
		id
    key: id
    assignedUser{
      firstName
      id
    }
    deadlineAt
    duration
    status
    requester{
      id
    }
    company{
      id
    }
	 }
  }
`;
