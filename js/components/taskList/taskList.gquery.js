import gql from 'graphql-tag';

export const tasks = gql`
  query Tasks {
       allTasks (orderBy: id_DESC) {
		id
		key: id
		title
		deadlineAt
    description
    assignedUser{
      firstName,
      id
    }
	 }
  }
`;
