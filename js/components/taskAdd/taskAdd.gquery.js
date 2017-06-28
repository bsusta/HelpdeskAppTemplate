import gql from 'graphql-tag';
import { taskFragment } from './task.fragments';


export const createTask = gql`
	mutation CreateTask($title: String!,$description: String, $assignedUserId: ID,$deadlineAt: DateTime) {
		createTask(
      title: $title,
			description: $description,
			assignedUserId: $assignedUserId,
			deadlineAt: $deadlineAt,
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
