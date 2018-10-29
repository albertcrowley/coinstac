import { gql } from 'react-apollo';
import { mutations, queries } from 'coinstac-graphql-schema';

export const ADD_COMPUTATION_MUTATION = gql`
  mutation addComputation($computationSchema: ComputationInput!)
    ${mutations.addComputation}
`;

export const ADD_USER_ROLE_MUTATION = gql`
  mutation addUserRole($userId: ID!, $table: String!, $doc: String!, $role: String!)
    ${mutations.addUserRole}
`;

export const COMPUTATION_CHANGED_SUBSCRIPTION = gql`
  subscription computationChanged($computationId: ID)
    ${queries.computationChanged}
`;

export const CONSORTIUM_CHANGED_SUBSCRIPTION = gql`
  subscription consortiumChanged($consortiumId: ID)
    ${queries.consortiumChanged}
`;

export const CREATE_RUN_MUTATION = gql`
  mutation createRun($consortiumId: ID!)
    ${mutations.createRun}
`;

export const DELETE_CONSORTIUM_MUTATION = gql`
  mutation deleteConsortiumById($consortiumId: ID!) {
    deleteConsortiumById(consortiumId: $consortiumId){
      id
    }
  }
`;

export const DELETE_PIPELINE_MUTATION = gql`
  mutation deletePipeline($pipelineId: ID!) {
    deletePipeline(pipelineId: $pipelineId){
      id
    }
  }
`;

export const FETCH_ALL_PIPELINES_QUERY = gql`
  query fetchAllPipelines
    ${queries.fetchAllPipelines}
`;

export const FETCH_ALL_COMPUTATIONS_QUERY = gql`
  query fetchAllComputations
    ${queries.fetchAllComputations}
`;

export const FETCH_ALL_CONSORTIA_QUERY = gql`
  query fetchAllConsortia
    ${queries.fetchAllConsortia}
`;

export const FETCH_ALL_USER_RUNS_QUERY = gql`
  query fetchAllUserRuns
    ${queries.fetchAllUserRuns}
`;

export const FETCH_CONSORTIUM_QUERY = gql`
  query fetchConsortium ($consortiumId: ID)
    ${queries.fetchConsortium}
`;

export const FETCH_COMPUTATION_QUERY = gql`
  query fetchComputation ($computationIds: [ID])
    ${queries.fetchComputation}
`;

export const FETCH_PIPELINE_QUERY = gql`
  query fetchPipeline ($pipelineId: ID)
    ${queries.fetchPipeline}
`;

export const FETCH_USER_QUERY = gql`
  query fetchUser ($userId: ID)
    ${queries.fetchUser}
`;

export const FETCH_ALL_RESULTS_QUERY = gql`
  query fetchAllResults
    ${queries.fetchAllResults}
`;

export const FETCH_ALL_USERS_QUERY = gql`
  query fetchAllUsers
    ${queries.fetchAllUsers}
`;

export const FETCH_RESULT_QUERY = gql`
  query fetchResult ($resultId: ID)
    ${queries.fetchResult}
`;

export const JOIN_CONSORTIUM_MUTATION = gql`
  mutation joinConsortium($consortiumId: ID!, $userId: ID) {
    joinConsortium(consortiumId: $consortiumId, userId: $userId){
      id
      members
    }
  }
`;

export const LEAVE_CONSORTIUM_MUTATION = gql`
  mutation leaveConsortium($consortiumId: ID!, $userId: ID) {
    leaveConsortium(consortiumId: $consortiumId, userId: $userId){
      id
      members
    }
  }
`;

export const RESULT_CHANGED_SUBSCRIPTION = gql`
  subscription resultChanged($resultId: ID)
    ${queries.resultChanged}
`;

export const PIPELINE_CHANGED_SUBSCRIPTION = gql`
  subscription pipelineChanged($pipelineId: ID)
    ${queries.pipelineChanged}
`;

export const REMOVE_COMPUTATION_MUTATION = gql`
  mutation removeComputation($computationId: ID!) {
    removeComputation(computationId: $computationId){
      id
    }
  }
`;

export const USER_CHANGED_SUBSCRIPTION = gql`
  subscription userChanged($userId: ID)
    ${queries.userChanged}
`;

export const USER_METADATA_CHANGED_SUBSCRIPTION = gql`
  subscription userMetadataChanged($userId: ID)
    ${queries.userMetadataChanged}
`;

export const REMOVE_USER_ROLE_MUTATION = gql`
  mutation removeUserRole($userId: ID!, $table: String!, $doc: String!, $role: String!)
    ${mutations.removeUserRole}
`;

export const USER_RUN_CHANGED_SUBSCRIPTION = gql`
  subscription userRunChanged($userId: ID)
    ${queries.userRunChanged}
`;

export const SAVE_ACTIVE_PIPELINE_MUTATION = gql`
  mutation saveActivePipeline($consortiumId: ID, $activePipelineId: ID){
    saveActivePipeline(consortiumId: $consortiumId, activePipelineId: $activePipelineId)
  }
`;

export const SAVE_CONSORTIUM_MUTATION = gql`
  mutation saveConsortium($consortium: ConsortiumInput!)
    ${mutations.saveConsortium}
`;

export const SAVE_PIPELINE_MUTATION = gql`
  mutation savePipeline($pipeline: PipelineInput!)
    ${mutations.savePipeline}
`;

export const UPDATE_USER_CONSORTIUM_STATUS_MUTATION = gql`
  mutation updateUserConsortiumStatus($consortiumId: ID, $status: String)
    ${mutations.updateUserConsortiumStatus}
`;
