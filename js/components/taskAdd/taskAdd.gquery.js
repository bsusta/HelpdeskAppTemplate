import gql from 'graphql-tag';

export const createTask = gql`
	mutation CreateTask($title: String!,$repeatId:ID,$description: String,$createdById: ID!,$projectId:ID!,$assignedUserId: ID,$deadlineAt: DateTime,$pendingAt:DateTime,$statusChangedAt:DateTime,$duration:Int,$statusId: ID!,$requesterId:ID,$companyId:ID) {
		createTask(
			title: $title
			repeatId:$repeatId
      description: $description
			assignedUserId: $assignedUserId
			deadlineAt: $deadlineAt
			duration: $duration
			statusId: $statusId
			pendingAt:$pendingAt
			statusChangedAt:$statusChangedAt
			requesterId:$requesterId
			companyId:$companyId
			projectId:$projectId
			createdById:$createdById
		) {
		  id
		}
	}
`;

export const createRepeat = gql`
	mutation createRepeat($every:Int!,$repeated: REPEAT_REPEATED!,$startDate: DateTime!,$times: Int!) {
		createRepeat(
			every:$every
			repeated:$repeated
			startDate:$startDate
			times:$times
		) {
		  id
		}
	}
`;

export const updateRepeat = gql`
	mutation updateRepeat($id: ID!,$taskId:ID!) {
		updateRepeat(
			id:$id
      taskId: $taskId
		) {
			id
		}
	}
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
