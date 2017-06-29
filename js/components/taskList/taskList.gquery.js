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
export const newTasksSubscription = gql`
	subscription {
		Task(filter: {mutation_in: [CREATED]}) {
			mutation
			node {
				id
				key:id
				title
        deadlineAt
        description
        assignedUser{
          firstName,
          id
        }
				createdAt
				active
			}
		}
	}
`;
export const editedTasksSubscription = gql`
	subscription {
		Task(filter: {mutation_in: [CREATED,UPDATED,DELETED]}) {
			mutation
			node {
				id
				key:id
				title
        deadlineAt
        description
        assignedUser{
          firstName,
          id
        }
				createdAt
				active
			}
		}
	}
`;
