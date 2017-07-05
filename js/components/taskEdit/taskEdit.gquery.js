import gql from 'graphql-tag';
import { taskFragment } from './task.fragments';
import { commentFragment } from './comment.fragments';

export const updateTask = gql`
	mutation updateTask($title: String!,$description: String,$id: ID!,$assignedUserId: ID,$deadlineAt: DateTime) {
		updateTask(
      title: $title,
      description: $description,
			id: $id,
			assignedUserId: $assignedUserId,
			deadlineAt: $deadlineAt,
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


export const users = gql`
  query Users {
       allUsers (orderBy: id_DESC) {
		id
		key: id
		firstName
	 }
  }
`;

export const comments = gql`
  query Comments($id:ID!) {
       allComments (
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
