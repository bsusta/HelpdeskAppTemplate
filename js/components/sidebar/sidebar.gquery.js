import gql from 'graphql-tag';
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
