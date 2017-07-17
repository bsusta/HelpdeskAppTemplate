import gql from 'graphql-tag';


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
