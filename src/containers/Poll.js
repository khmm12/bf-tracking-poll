import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import keys from 'lodash/keys';
import shuffle from 'lodash/shuffle';
import autobind from 'core-decorators/lib/autobind';


import Poll from '../components/Poll/Poll';

const QUESTIONS = require('../data/questions.json');
const FORM_FIELDS = ['comment', 'answers[].questionId', 'answers[].stars', 'answers[].comment'];

@connect()
class PollContainer extends Component {
  constructor() {
    super();
    const answers = shuffle(keys(QUESTIONS)).map(id => ({ questionId: id, stars: 0 }));
    this.state = {
      initialValues: { answers },
    };
  }

  componentWillMount() {
    if (__SERVER__) {
      this.props.dispatch(initialize('PollForm', this.state.initialValues, FORM_FIELDS));
    }
  }

  @autobind
  handleSubmit(data) {
    if (this.props.onSubmit) this.props.onSubmit();
  }

  render() {
    return (<Poll
      questions={QUESTIONS}
      fields={FORM_FIELDS}
      onSubmit={this.handleSubmit}
      initialValues={this.state.initialValues}
    />);
  }
}

export default PollContainer;
