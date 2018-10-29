import update from 'immutability-helper';
import {
  FETCH_ALL_CONSORTIA_QUERY,
} from './functions';

export const compIOProp = {
  props: ({ data: { fetchComputation } }) => ({
    compIO: fetchComputation ? fetchComputation[0] : null,
  }),
  options: ({ computationId }) => ({ variables: { computationIds: [computationId] } }),
};

export const getDocumentByParam = (param, prop, query) => ({
  props: ({ data }) => ({
    [prop]: data[query],
  }),
  options: ({ params }) => ({ variables: { [param]: params[param] } }),
});

export const consortiaMembershipProp = (name) => {
  if (name) {
    return {
      props: ({ mutate }) => ({
        [name]: (consortiumId, userId) => mutate({
          variables: { consortiumId, userId },
          update: (store, { data }) => {
            const consQuery = store.readQuery({ query: FETCH_ALL_CONSORTIA_QUERY });
            const index = consQuery.fetchAllConsortia.findIndex((cons) => {
              if (cons && data[name]) {
                return cons.id === data[name].id;
              }
              return false;
            });
            if (index > -1) {
              consQuery.fetchAllConsortia[index].members = data[name].members;
            }
            store.writeQuery({ query: FETCH_ALL_CONSORTIA_QUERY, data: consQuery });
          },
        }),
      }),
    };
  }
};

export const getAllAndSubProp = (document, listProp, query, subProp, subscription, filter) => ({
  options: (props) => {
    const opts = { fetchPolicy: 'cache-and-network' };

    if (filter && filter === 'userId' && props.auth.user.id) {
      opts.variables = { [filter]: props.auth.user.id };
    }

    return opts;
  },
  props: props => ({
    [listProp]: props.data[query],
    [subProp]: () => {
      const variables = {};
      if (filter && filter === 'userId' && props.ownProps.auth.user.id) {
        variables.userId = props.ownProps.auth.user.id;
      }

      return props.data.subscribeToMore({
        document,
        variables,
        updateQuery: (prevResult, { subscriptionData: { data } }) => {
          const index =
            prevResult[query].findIndex(c => c.id === data[subscription].id);

          if (data[subscription].delete) {
            return {
              [query]: prevResult[query].filter(obj => obj.id !== data[subscription].id),
            };
          } else if (index !== -1) {
            return {
              [query]: update(prevResult[query], {
                $splice: [
                  [index, 1, data[subscription]],
                ],
              }),
            };
          }

          return {
            [query]: [...prevResult[query], data[subscription]],
          };
        },
      });
    },
  }),
});

export const getSelectAndSubProp = (activeProp, document, objId, subProp, subscription, query) => ({
  options: (props) => {
    let theId = null;

    if (props[objId]) {
      theId = props[objId];
    } else if (props.params[objId]) {
      theId = props.params[objId];
    } else if (objId === 'userId') {
      theId = props.auth.user.id;
    }

    return {
      fetchPolicy: 'cache-and-network',
      variables: { [objId]: theId },
    };
  },
  props: props => ({
    [activeProp]: props.data[query],
    [subProp]: theId =>
      props.data.subscribeToMore({
        document,
        variables: { [objId]: theId },
        updateQuery: (prevResult, { subscriptionData: { data } }) => {
          if (data[subscription].delete) {
            return { [query]: null };
          }

          return { [query]: data[subscription] };
        },
      }),
  }),
});

export const getAndSubToPerms = (activeProp, document, objId, subProp, subscription, query) => {
  return {
    options: (props) => {
      let theId = null;

      if (props[objId]) {
        theId = props[objId];
      } else if (props.params[objId]) {
        theId = props.params[objId];
      } else if (objId === 'userId') {
        theId = props.auth.user.id;
      }

      return {
        fetchPolicy: 'network-only',
        variables: { [objId]: theId },
      };
    },
    props: props => {
      debugger;
      return {
        [activeProp]: props.data[query],
        [subProp]: theId =>
        props.data.subscribeToMore({
          document,
          variables: { [objId]: theId },
          updateQuery: (prevResult, { subscriptionData: { data } }) => {
            debugger;
            if (!data) {
              return { [query]: null };
            }

            return { [query]: data[subscription] };
          },
        }),
      };
    },
  };
};

export const pipelinesProp = {
  props: ({ data: { fetchAllPipelines } }) => ({
    pipelines: fetchAllPipelines,
  }),
};

export const resultsProp = {
  props: ({ data: { fetchAllResults } }) => ({
    results: fetchAllResults,
  }),
};

export const removeDocFromTableProp = (docId, mutation, query, dataQuery) => {
  return {
    props: ({ mutate }) => ({
      [mutation]: theId => mutate({
        variables: { [docId]: theId },
        update: (store, { data }) => {
          const d = store.readQuery({ query });
          const index = d[dataQuery].findIndex(con => con.id === data[mutation].id);
          if (index > -1) {
            d[dataQuery].splice(index, 1);
          }
          store.writeQuery({ query, data: d });
        },
      }),
    }),
  };
};

export const saveDocumentProp = (funcName, objVar) => {
  return {
    props: ({ mutate }) => ({
      [funcName]: obj => mutate({
        variables: { [objVar]: obj },
      }),
    }),
  };
};

export const userRolesProp = (name) => {
  return {
    props: ({ ownProps, mutate }) => ({
      [name]: (userId, table, doc, role) => mutate({
        variables: { userId, table, doc, role },
      })
      .then(({ data: { [name]: { permissions } } }) => {
        return ownProps.updateUserPerms(permissions);
      }),
    }),
  };
};
