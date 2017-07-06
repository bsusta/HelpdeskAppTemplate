import gql from 'graphql-tag';
import { taskFragment } from './task.fragments';


export const createTask = gql`
	mutation CreateTask($title: String!,$description: String,$createdById: ID!,$assignedUserId: ID,$deadlineAt: DateTime,$duration:Int,$status:TASK_STATUS,$requesterId:ID,$companyId:ID) {
		createTask(
			title: $title,
      description: $description,
			assignedUserId: $assignedUserId,
			deadlineAt: $deadlineAt,
			duration: $duration,
			status: $status,
			requesterId:$requesterId,
			companyId:$companyId,
			createdById:$createdById
		) {
		  ...TaskInfo
		}
	}
	${taskFragment}
`;

export const companies = gql`
  query allCompanies {
       allCompanies (orderBy: id_DESC) {
		id
		key: id
		name
	 }
  }
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
