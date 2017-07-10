import gql from 'graphql-tag';
import { taskFragment } from './task.fragments';


export const createTask = gql`
	mutation CreateTask($title: String!,$description: String,$createdById: ID!,$projectId:ID!,$assignedUserId: ID,$deadlineAt: DateTime,$duration:Int,$status:TASK_STATUS,$requesterId:ID,$companyId:ID) {
		createTask(
			title: $title,
      description: $description,
			assignedUserId: $assignedUserId,
			deadlineAt: $deadlineAt,
			duration: $duration,
			status: $status,
			requesterId:$requesterId,
			companyId:$companyId,
			projectId:$projectId,
			createdById:$createdById
		) {
		  ...TaskInfo
		}
	}
	${taskFragment}
`;
