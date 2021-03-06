import gql from 'graphql-tag';
import { taskFragment } from './task.fragments';


export const createTask = gql`
	mutation CreateTask($title: String!,$description: String,$createdById: ID!,$projectId:ID!,$assignedUserId: ID,$deadlineAt: DateTime,$duration:Int,$statusId: ID!,$requesterId:ID,$companyId:ID) {
		createTask(
			title: $title,
      description: $description,
			assignedUserId: $assignedUserId,
			deadlineAt: $deadlineAt,
			duration: $duration,
			statusId: $statusId,
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
export const editedTasksSubscription = gql`
	subscription {
		Task(filter: {mutation_in: [CREATED,UPDATED,DELETED]}) {
			mutation
			node {
    		id
        key: id
        status{
					id
				}
				project{
					id
					title
				}
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
