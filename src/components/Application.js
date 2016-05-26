import React, { Component } from 'react';
import autobind from 'core-decorators/lib/autobind';

import Layout from './Layout/Layout';
import Thanks from './Thanks';
import Poll from '../containers/Poll';
import MoodSmile from './MoodSmile/MoodSmile';


class Application extends Component {
  constructor() {
    super();
    this.state = {
      page: 'poll',
    };
  }

  @autobind
  handlePollSubmit() {
    this.setState({ page: 'thanks' });
  }

  render() {
    const { page } = this.state;
    return <Layout>
      {(() => {
        switch (page) {
          case 'poll':
            return (
              <div>
                <section><MoodSmile /></section>
                <section><Poll onSubmit={this.handlePollSubmit} /></section>
              </div>
            );
          case 'thanks': return <Thanks />
        }
      })()}
    </Layout>
  }
}

export default Application;
