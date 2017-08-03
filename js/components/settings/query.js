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


export const createTask = gql`
	mutation CreateTask($title: String!,$repeatId:ID,$description: String,$createdById: ID!,$projectId:ID!,$assignedUserId: ID,$deadlineAt: DateTime,$pendingAt:DateTime,$closedAt:DateTime,$duration:Int,$statusId: ID!,$requesterId:ID,$companyId:ID) {
		createTask(
			title: $title
			repeatId:$repeatId
      description: $description
			assignedUserId: $assignedUserId
			deadlineAt: $deadlineAt
			duration: $duration
			statusId: $statusId
			pendingAt:$pendingAt
			closedAt:$closedAt
			requesterId:$requesterId
			companyId:$companyId
			projectId:$projectId
			createdById:$createdById
		) {
		  id
		}
	}
`;

export const createCompany = gql`
	mutation createCompany($active:Boolean!,$name:String!,$street:String,$city:String,$country:String,$note:String,$hours:Int,$registrationNumber:String,$taxNumber:String,$vat:String,$zip:String) {
		createCompany(
			active:$active,
			name:$name,
			street:$street,
			city:$city,
			country:$country,
			note:$note,
			hours:$hours,
			registrationNumber:$registrationNumber,
			taxNumber:$taxNumber,
			vat:$vat,
			zip:$zip
		) {
			id
		}
	}
`;
