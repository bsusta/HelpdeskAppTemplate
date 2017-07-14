import gql from 'graphql-tag';

export const createSubtask = gql`
	mutation createSubtask($name: String!,$taskId: ID!) {
		createSubtask(
      name:$name,
      taskId:$taskId,
		){
      id,
    }
	}
`;
