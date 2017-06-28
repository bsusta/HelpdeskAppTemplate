import gql from 'graphql-tag';
import { taskFragment } from './task.fragments';

export const updateTask = gql`
	mutation updateTask($title: String!,$description: String,$id: User!) {
		updateTask(
      title: $title,
      description: $description,
			id: $id,
		) {
			...TaskInfo
		}
	}
	${taskFragment}
`;
