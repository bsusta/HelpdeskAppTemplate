import gql from 'graphql-tag';

export const createSubtask = gql`
	mutation createSubtask($name: String!,$description: String!, $userId: ID,$taskId: ID!) {
		createSubtask(
      name:$name,
      description:$description,
      taskId:$taskId,
      userId: $userId,
		){
      id,
    }
	}
`;
