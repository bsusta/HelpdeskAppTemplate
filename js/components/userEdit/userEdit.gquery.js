import gql from 'graphql-tag';

export const updateUser = gql`
	mutation updateUser($id: ID!,$firstName:String!,$surName:String!,$companyId:ID!,$note:String,$active: Boolean!) {
		updateUser(
			id: $id
			firstName:$firstName
			surName:$surName
			companyId:$companyId
			note:$note
			active:$active
		) {
			id
		}
	}
`;
