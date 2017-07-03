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
  query allComments($taskId:ID) {
       allComments (
				orderBy: id_DESC,
				taskId:$task)
				{
		id,
		createdAt,
		content,
	 }
  }
`;
