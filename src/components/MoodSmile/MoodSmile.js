import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'core-decorators/lib/autobind';

import { changeMood } from '../../redux/modules/moodPoll';

import Smile from '../Smile/Smile';
import './moodSmile.css';

const MOODS = ['happy', 'almosthappy', 'neutral', 'notsoangry', 'angry'];
const MOOD_CAPTION = {
  happy: 'Awesome!',
  almosthappy: 'Great!',
  neutral: 'OK',
  notsoangry: 'Mmmmh...',
  angry: 'Oops',
}

@connect(state => ({ mood: state.moodPoll.mood }))
class MoodSmile extends Component {
  constructor(props) {
    super(props)
    this.state = { change: false };
  }

  @autobind
  onChangeStart() {
    this.setState({ change: true });
  }

  @autobind
  onChangeEnd(mood) {
    this.setState({ change: false });
    if (mood) this.props.dispatch(changeMood(mood));
  }

  render() {
    const { mood } = this.props;
    const { change } = this.state;
    return (
      <div className="text-center">
        {change ?
          <MoodChanger onSelect={this.onChangeEnd} />
        : <CurrentMoodSmile mood={mood} onClick={this.onChangeStart} />}
      </div>
    );
  }
}

const CurrentMoodSmile = ({ mood, onClick }) => (
  <div className="current-mood">
    <Smile mood={mood} className="current-mood__smile" onClick={onClick} />
    <p className="current-mood__caption">{MOOD_CAPTION[mood]}</p>
    <p className="current-mood__thanks extra-decoration text-uppercase">
      Thank you for your feedback
    </p>
  </div>
);

const MoodChanger = ({ onSelect }) => (
  <div className="mood-changer">
    <h4 className="mood-changer__header">Did you make a mistake? Please select you correct mood</h4>
    <div className="mood-changer__smiles">
      {MOODS.map((mood, index) =>
        <Smile mood={mood} onClick={() => onSelect(mood)} />
      )}
    </div>
  </div>
);

export default MoodSmile;
