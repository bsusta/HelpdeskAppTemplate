import gql from 'graphql-tag';
export const createUser = gql`
	mutation createUser($firstName:String!,$surName:String!,$companyId:ID!,$note:String,$active: Boolean!, $authProvider: AuthProviderSignupData! ) {
		createUser(
			authProvider:$authProvider
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
