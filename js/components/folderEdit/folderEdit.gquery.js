import gql from 'graphql-tag';
export const updateProject = gql`
	mutation updateProject($id:ID!,$title:String!,$description:String) {
		updateProject(
			id:$id,
			title:$title,
			description:$description
		) {
			id
		}
	}
`;
export const deleteProject = gql`
	mutation ($id: ID!) {
		deleteProject(
			id: $id,
		) {
		  id
		}
	}
`;
