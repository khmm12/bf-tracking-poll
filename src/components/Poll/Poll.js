import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import PollQuestion from '../PollQuestion/PollQuestion';
import './poll.css';

const formConfig = {
  validate({ answers }) {
    const errors = {};
    errors.answers = answers.map(value => ({
      stars: !value.stars && { isRequired: true },
    }));
    return errors;
  },
  form: 'PollForm',
};

@reduxForm(formConfig)
class Poll extends Component {
  render() {
    const { fields: { answers, comment }, valid, handleSubmit, questions } = this.props;
    return (<div className="poll">
      <div className="poll__top">
        <div className="poll__top__arrow"></div>
        <div className="poll__top__caption">Your answers will always remain anonymous</div>
      </div>
      <div className="poll__content">
        <h4 className="poll__content__header extra-decoration">
          Do you agree with the following statements?
        </h4>
        <div className="poll__content__elements">
          {answers.map(answer =>
            <PollQuestion
              key={answer.questionId.value}
              question={questions[answer.questionId.value]}
              stars={answer.stars}
              comment={answer.comment}
            />
          )}
          <PollAdditionalComment {...comment} />
        </div>
        <PollSubmit disabled={!valid} onClick={handleSubmit}/>
      </div>
    </div>);
  }
}

const PollAdditionalComment = (props) => (
  <div className="poll__content__additional-comment">
    <h4 className="poll__content__additional-comment__header">
      Anything to add?
    </h4>
    <textarea
      className="form-control poll__content__additional-comment__input"
      placeholder="This is where you can express yourself freely & Your answers will always remain anonymous"
      {...props}
    />
  </div>
);

const PollSubmit = (props) => (
  <div className="poll__content__submit">
    <button {...props}>
      <span>Send</span>
      <span>⟶</span>
    </button>
  </div>
);

export default Poll;
