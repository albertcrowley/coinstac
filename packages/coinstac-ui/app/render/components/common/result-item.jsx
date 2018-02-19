import React from 'react';
import TimeStamp from 'react-timestamp';
import { Button, Panel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';

const ResultItem = ({ runObject, consortia }) => (
  <Panel
    key={runObject.id}
    header={<h3>{`
      ${consortia.filter(con => con.id === runObject.consortiumId)[0].name}`}
      {' - Started: '}
      {runObject.startDate &&
        <TimeStamp
          time={runObject.startDate / 1000}
          precision={2}
          autoUpdate={10}
          format="full"
        />}
      {' - Ended: '}
      {runObject.endDate &&
        <TimeStamp
          time={runObject.endDate / 1000}
          precision={2}
          autoUpdate={10}
          format="full"
        />}
    </h3>}
  >
    {runObject.clients &&
    <p>Clients: {runObject.clients}</p>
    }
    {runObject.pipelineSnapshot &&
    <Panel
      id="collapsible-panel-example-2"
      header="Steps"
      collapsible
    >
      <pre>{JSON.stringify(runObject.pipelineSnapshot.steps, null, ' ')}</pre>
    </Panel>}
    {runObject.pipelineSnapshot &&
    <LinkContainer
      to={`dashboard/pipelines/${runObject.pipelineSnapshot.id}`}
    >
      <Button bsStyle="info">View Pipeline</Button>
    </LinkContainer>
    }
    <LinkContainer
      className="pull-right"
      to={`dashboard/results/${runObject.id}`}
    >
      <Button bsStyle="success">View Results</Button>
    </LinkContainer>
  </Panel>
);

ResultItem.propTypes = {
  runObject: PropTypes.object.isRequired,
  consortia: PropTypes.array.isRequired,
};

export default ResultItem;