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
				project{
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
		project{
			id
		}
	 }
  }
`;

export const projects = gql`
  query Projects {
       allProjects (orderBy: id_DESC) {
		id
    key: id
		title
		description
		tasks{
			id
		}
	 }
  }
`;
export const editedProjectsSubscription = gql`
	subscription {
		Project(filter: {mutation_in: [CREATED,UPDATED,DELETED]}) {
			mutation
			node {
				id
				key: id
				title
				description
				tasks{
					id
				}
			}
		}
	}
`;

export const users = gql`
  query Users {
   	allUsers (orderBy: id_DESC) {
	 	id
		key:id
		email
		firstName
		surName
		company{
			id
		}
		note
		active
	 }
  }
`;
export const subscribeToMoreUsers = gql`
	subscription {
		User(filter: {mutation_in: [CREATED,UPDATED,DELETED]}) {
			mutation
			node {
				id
				key:id
				email
				firstName
				surName
				company{
					id
				}
				note
				active
			}
		}
	}
`;

export const companies = gql`
  query allCompanies {
       allCompanies (orderBy: id_DESC) {
		id
		key: id
		active
		name
		street
		city
		country
		note
		hours
		registrationNumber
		taxNumber
		vat
		zip
	 }
  }
`;
export const subscribeToMoreCompanies = gql`
	subscription {
		Company(filter: {mutation_in: [CREATED,UPDATED,DELETED]}) {
			mutation
			node {
				id
				key: id
				name
			}
		}
	}
`;
