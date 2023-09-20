import { useState } from "react";
import { Section } from "./Section";
import { FeedbackOptions } from "./FeedbackOptions/FeedbackOptions";
import { Statistics } from "./Statistics";
import React from 'react';
import { Notification } from './Notification'; 

export const App = () => {
    const [feedback, setFeedback ] = useState({
      good: 0,
      neutral: 0,
      bad: 0,
    });

  const handleFeedback = option => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [option]: prevFeedback[option] + 1,
    }));
  };

  const countTotalFeedback = () => {
    const {good, neutral, bad} = feedback;
    return good + neutral + bad; 
  };

  const countPositiveFeedbackPercentage = () => {
    const { good, neutral, bad } = feedback;
    const total = good + neutral + bad

    if (total === 0) {
      return 0;
    }
    return Math.round((good / total) * 100);
  }

  const total = countTotalFeedback();

    
    return (
      <div>
        <Section title = {'Please leave feedback'}></Section>
        <FeedbackOptions options = {Object.keys(feedback)} onLeaveFeedback={handleFeedback}></FeedbackOptions>

        { total > 0 ? (
          <Section title={'Statistics'}>
          <Statistics
            good={feedback.good} 
            neutral={feedback.neutral} 
            bad={feedback.bad} 
            total={countTotalFeedback()} 
            positivePercentage={countPositiveFeedbackPercentage()}
          ></Statistics>
        </Section>
        ) : (
           <Notification message={'There is no feedback'}></Notification>
           
        ) }
        
      </div>
    );
  }
