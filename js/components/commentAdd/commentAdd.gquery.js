import gql from 'graphql-tag';
import { commentFragment } from './comment.fragments';

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
