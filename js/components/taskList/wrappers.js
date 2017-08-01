import {inboxTasks,closedProjectTasks,activeProjectTasks,myProjectTasks,getMoreTasks,requestedTasks} from './taskList.gquery';
import { graphql, withApollo } from 'react-apollo';

export function withFilterNewRequested(userId){
  return (graphql(requestedTasks,{
  options:{
    variables:{
      id:userId,
      status:'New',
      after:null,
      limit:10,
    },
  },
  props: ({ data: { loading, allTasks, error, refetch, fetchMore,subscribeToMore } }) => ({
    loading,
    allTasks,
    error,
    refetch,
    subscribeToMore,
    getMore:()=>{
      fetchMore(
        {
          variables:{
            id:userId,
            status:'New',
            after:allTasks.length==0?null:allTasks[allTasks.length-1].id,
            limit:10,
          },
          updateQuery:(previousResult,{fetchMoreResult})=>{
            console.log(fetchMoreResult);
            if(fetchMoreResult.allTasks.length==0){
              return previousResult;
            }
            return Object.assign({},previousResult, {
              allTasks: [...previousResult.allTasks, ...fetchMoreResult.allTasks]});
            }
          }
        )
      }
    })
  }));
}
export function withFilterOpenRequested (userId) {
  return graphql(requestedTasks,{
  options:{
    variables:{
      id:userId,
      status:'Open',
      after:null,
      limit:10,
    },
  },
  props: ({ data: { loading, allTasks, error, refetch, fetchMore,subscribeToMore } }) => ({
    loading,
    allTasks,
    error,
    refetch,
    subscribeToMore,
    getMore:()=>{
      fetchMore(
        {
          variables:{
            id:userId,
            status:'Open',
            after:allTasks.length==0?null:allTasks[allTasks.length-1].id,
            limit:10,
          },
          updateQuery:(previousResult,{fetchMoreResult})=>{
            if(fetchMoreResult.allTasks.length==0){
              return previousResult;
            }
            return Object.assign({},previousResult, {
              allTasks: [...previousResult.allTasks, ...fetchMoreResult.allTasks]});
            }
          }
        )
      }
    })
  });
}
export function withFilterPendingRequested (userId){
  return graphql(requestedTasks,{
    options:{
      variables:{
        id:userId,
        status:'Pending',
        after:null,
        limit:10,
      },
    },
    props: ({ data: { loading, allTasks, error, refetch, fetchMore,subscribeToMore } }) => ({
      loading,
      allTasks,
      error,
      refetch,
      subscribeToMore,
      getMore:()=>{
        fetchMore(
          {
            variables:{
              id:userId,
              status:'Pending',
              after:allTasks.length==0?null:allTasks[allTasks.length-1].id,
              limit:10,
            },
            updateQuery:(previousResult,{fetchMoreResult})=>{
              if(fetchMoreResult.allTasks.length==0){
                return previousResult;
              }
              return Object.assign({},previousResult, {
                allTasks: [...previousResult.allTasks, ...fetchMoreResult.allTasks]});
            }
          }
        )
      }
    })
  });
}
export function withFilterClosedRequested (userId){
  return graphql(requestedTasks,{
    options:{
      variables:{
        id:userId,
        status:'Closed',
        after:null,
        limit:10,
      },
    },
    props: ({ data: { loading, allTasks, error, refetch, fetchMore,subscribeToMore } }) => ({
      loading,
      allTasks,
      error,
      refetch,
      subscribeToMore,
      getMore:()=>{
        fetchMore(
          {
            variables:{
              id:userId,
              status:'Closed',
              after:allTasks.length==0?null:allTasks[allTasks.length-1].id,
              limit:10,
            },
            updateQuery:(previousResult,{fetchMoreResult})=>{
              if(fetchMoreResult.allTasks.length==0){
                return previousResult;
              }
              return Object.assign({},previousResult, {
                allTasks: [...previousResult.allTasks, ...fetchMoreResult.allTasks]});
            }
          }
        )
      }
    })
  });
}

export function withFilterNewInbox(userId){
  return (graphql(inboxTasks,{
  options:{
    variables:{
      id:userId,
      status:'New',
      after:null,
      limit:10,
    },
  },
  props: ({ data: { loading, allTasks, error, refetch, fetchMore,subscribeToMore } }) => ({
    loading,
    allTasks,
    error,
    refetch,
    subscribeToMore,
    getMore:()=>{
      fetchMore(
        {
          variables:{
            id:userId,
            status:'New',
            after:allTasks.length==0?null:allTasks[allTasks.length-1].id,
            limit:10,
          },
          updateQuery:(previousResult,{fetchMoreResult})=>{
            console.log(fetchMoreResult);
            if(fetchMoreResult.allTasks.length==0){
              return previousResult;
            }
            return Object.assign({},previousResult, {
              allTasks: [...previousResult.allTasks, ...fetchMoreResult.allTasks]});
            }
          }
        )
      }
    })
  }));
}
export function withFilterOpenInbox (userId) {
  return graphql(inboxTasks,{
  options:{
    variables:{
      id:userId,
      status:'Open',
      after:null,
      limit:10,
    },
  },
  props: ({ data: { loading, allTasks, error, refetch, fetchMore,subscribeToMore } }) => ({
    loading,
    allTasks,
    error,
    refetch,
    subscribeToMore,
    getMore:()=>{
      fetchMore(
        {
          variables:{
            id:userId,
            status:'Open',
            after:allTasks.length==0?null:allTasks[allTasks.length-1].id,
            limit:10,
          },
          updateQuery:(previousResult,{fetchMoreResult})=>{
            if(fetchMoreResult.allTasks.length==0){
              return previousResult;
            }
            return Object.assign({},previousResult, {
              allTasks: [...previousResult.allTasks, ...fetchMoreResult.allTasks]});
            }
          }
        )
      }
    })
  });
}
export function withFilterPendingInbox (userId){
  return graphql(inboxTasks,{
    options:{
      variables:{
        id:userId,
        status:'Pending',
        after:null,
        limit:10,
      },
    },
    props: ({ data: { loading, allTasks, error, refetch, fetchMore,subscribeToMore } }) => ({
      loading,
      allTasks,
      error,
      refetch,
      subscribeToMore,
      getMore:()=>{
        fetchMore(
          {
            variables:{
              id:userId,
              status:'Pending',
              after:allTasks.length==0?null:allTasks[allTasks.length-1].id,
              limit:10,
            },
            updateQuery:(previousResult,{fetchMoreResult})=>{
              if(fetchMoreResult.allTasks.length==0){
                return previousResult;
              }
              return Object.assign({},previousResult, {
                allTasks: [...previousResult.allTasks, ...fetchMoreResult.allTasks]});
            }
          }
        )
      }
    })
  });
}
export function withFilterClosedInbox (userId){
  return graphql(inboxTasks,{
    options:{
      variables:{
        id:userId,
        status:'Closed',
        after:null,
        limit:10,
      },
    },
    props: ({ data: { loading, allTasks, error, refetch, fetchMore,subscribeToMore } }) => ({
      loading,
      allTasks,
      error,
      refetch,
      subscribeToMore,
      getMore:()=>{
        fetchMore(
          {
            variables:{
              id:userId,
              status:'Closed',
              after:allTasks.length==0?null:allTasks[allTasks.length-1].id,
              limit:10,
            },
            updateQuery:(previousResult,{fetchMoreResult})=>{
              if(fetchMoreResult.allTasks.length==0){
                return previousResult;
              }
              return Object.assign({},previousResult, {
                allTasks: [...previousResult.allTasks, ...fetchMoreResult.allTasks]});
            }
          }
        )
      }
    })
  });
}


export function withFilterProjectActive (projectId) {
  return graphql(activeProjectTasks,{
    options:{
      variables:{
        id:projectId,
        after:null,
        limit:10,
      },
    },
    props: ({ data: { loading, allTasks, error, refetch, fetchMore,subscribeToMore } }) => ({
      loading,
      allTasks,
      error,
      refetch,
      subscribeToMore,
      getMore:()=>{
        fetchMore(
          {
            variables:{
              id:projectId,
              after:allTasks.length==0?null:allTasks[allTasks.length-1].id,
              limit:10,
            },
            updateQuery:(previousResult,{fetchMoreResult})=>{
              if(fetchMoreResult.allTasks.length==0){
                return previousResult;
              }
              return Object.assign({},previousResult, {
                allTasks: [...previousResult.allTasks, ...fetchMoreResult.allTasks]});
            }
          }
        )
      }
    })
  });
}
export function withFilterProjectMy (projectId, userId){
  return graphql(myProjectTasks,{
    options:{
      variables:{
        id:projectId,
        userId:userId,
        after:null,
        limit:10,
      },
    },
    props: ({ data: { loading, allTasks, error, refetch, fetchMore,subscribeToMore } }) => ({
      loading,
      allTasks,
      error,
      refetch,
      subscribeToMore,
      getMore:()=>{
        fetchMore(
          {
            variables:{
              id:projectId,
              after:allTasks.length==0?null:allTasks[allTasks.length-1].id,
              userId:userId,
              limit:10,
            },
            updateQuery:(previousResult,{fetchMoreResult})=>{
              if(fetchMoreResult.allTasks.length==0){
                return previousResult;
              }
              return Object.assign({},previousResult, {
                allTasks: [...previousResult.allTasks, ...fetchMoreResult.allTasks]});
            }
          }
        )
      }
    })
  });
  }
export function withFilterProjectClosed (projectId){
  return graphql(closedProjectTasks,{
  options:{
    variables:{
      id:projectId,
      after:null,
      limit:10,
    },
  },
  props: ({ data: { loading, allTasks, error, refetch, fetchMore,subscribeToMore } }) => ({
    loading,
    allTasks,
    error,
    refetch,
    subscribeToMore,
    getMore:()=>{
      fetchMore(
        {
          variables:{
            id:projectId,
            after:allTasks.length==0?null:allTasks[allTasks.length-1].id,
            limit:10,
          },
          updateQuery:(previousResult,{fetchMoreResult})=>{
            if(fetchMoreResult.allTasks.length==0){
              return previousResult;
            }
            return Object.assign({},previousResult, {
              allTasks: [...previousResult.allTasks, ...fetchMoreResult.allTasks]});
          }
        }
      )
    }
    })
  });
}
