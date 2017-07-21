import gql from 'graphql-tag';
import { taskFragment } from './task.fragments';
import { commentFragment } from './comment.fragments';

export const updateTask = gql`
	mutation updateTask($title: String!,$description: String,$id: ID!,$projectId:ID!,$assignedUserId: ID,$deadlineAt: DateTime,$duration:Int,$statusId:ID,$requesterId:ID,$companyId:ID) {
		updateTask(
      title: $title,
      description: $description,
			id: $id,
			assignedUserId: $assignedUserId,
			deadlineAt: $deadlineAt,
			duration: $duration,
			statusId: $statusId,
			requesterId:$requesterId,
			companyId:$companyId,
			projectId:$projectId,
		) {
			...TaskInfo
		}
	}
	${taskFragment}
`;

export const createComment = gql`
	mutation createComment($content: String!,$userId: ID!,$taskId: ID!) {
		createComment(
			taskId:$taskId,
      content: $content,
      userId: $userId,
		) {
			...CommentInfo
		}
	}
	${commentFragment}
`;


export const comments = gql`
  query Comments($id:ID!,$after:String) {
       allComments (
			 after: $after,
       first: 10,
				orderBy: id_DESC
				filter:{
					task:{
						id:$id
					}
				}
			)
		{
		id
		key:id
		createdAt
		content
		user{
			id
			firstName
		}
		task{
			id
		}
	 }
  }
`;

export const addedCommentsSubscription = gql`
	subscription {
		Comment(filter: {mutation_in: [CREATED,UPDATED,DELETED]}) {
			mutation
			node {
				id
				key:id
				createdAt
				content
				user{
					id,
					firstName
				}
				task{
					id
				}
			}
		}
	}
`;


export const invoiceItems = gql`
  query InvoiceItems($id:ID!) {
       allInvoiceItems (
				orderBy: id_DESC
				filter:{
					task:{
						id:$id
					}
				}
			)
		{
		id
		key:id
		createdAt
		name
		price
		quantity
		unit{
			id
			name
		}
		user{
			id
			firstName
		}
	 }
  }
`;

export const changedInvoiceItemsSubscription = gql`
	subscription {
		InvoiceItem(filter: {mutation_in: [CREATED,UPDATED,DELETED]}) {
			mutation
			node {
				id
				key:id
				createdAt
				name
				price
				quantity
				unit{
					id
					name
				}
				user{
					id
					firstName
				}
			}
		}
	}
`;
export const deleteInvoiceItem = gql`
	mutation ($InvoiceItemId: ID!) {
		deleteInvoiceItem(
			id: $InvoiceItemId,
		) {
		  id
		}
	}
`;
export const subtasks = gql`
  query Subtasks($id:ID!) {
       allSubtasks (
				orderBy: id_DESC
				filter:{
					task:{
						id:$id
					}
				}
			)
		{
			id
			key:id
			finished
			name
	 }
  }
`;

export const changedSubtaskSubscription = gql`
	subscription {
		Subtask(filter: {mutation_in: [CREATED,UPDATED,DELETED]}) {
			mutation
			node {
				id
				key:id
				finished
				name
			}
		}
	}
`;
export const deleteSubtask = gql`
	mutation ($subtaskId: ID!) {
		deleteSubtask(
			id: $subtaskId,
		) {
		  id
		}
	}
`;

export const updateSubtask = gql`
mutation updateSubtask($finished: Boolean,$id: ID!) {
		updateSubtask(
      finished:$finished
			id:$id
		) {
			id,
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
