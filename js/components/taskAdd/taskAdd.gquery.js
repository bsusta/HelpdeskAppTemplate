import gql from 'graphql-tag';
import { taskFragment } from './task.fragments';


export const createTask = gql`
	mutation CreateTask($title: String!,$description: String, $assignedUserId: ID) {
		createTask(
      title: $title,
			description: $description,
			assignedUserId: $assignedUserId,
		) {
		  ...TaskInfo
		}
	}
	${taskFragment}
`;

export const users = gql`
  query Users {
       allUsers (orderBy: id_DESC) {
		id
		key: id
		firstName
	 }
  }
`;
