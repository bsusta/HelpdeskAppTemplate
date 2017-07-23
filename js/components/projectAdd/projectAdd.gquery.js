import gql from 'graphql-tag';
export const createProject = gql`
	mutation createProject($title:String!,$description:String) {
		createProject(
			title:$title,
			description:$description
		) {
			id
		}
	}
`;
