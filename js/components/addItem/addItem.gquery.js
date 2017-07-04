import gql from 'graphql-tag';

export const units = gql`
  query Units {
       allUnits (orderBy: id_DESC) {
		id
		key: id
		name
	 }
  }
`;
