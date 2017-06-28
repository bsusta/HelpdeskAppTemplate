import gql from 'graphql-tag';
import { taskFragment } from './task.fragments';

export const updateTask = gql`
	mutation updateTask($title: String!,$description: String,$id: ID!,$assignedUserId: ID) {
		updateTask(
      title: $title,
      description: $description,
			id: $id,
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
