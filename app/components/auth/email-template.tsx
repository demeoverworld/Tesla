import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  confirmLink: string;
}

export function EmailTemplate({ firstName, confirmLink }: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome, {firstName}!</h1>
      <p>
        Please verify your email by clicking
        {' '}
        <a href={confirmLink}>this link</a>.
      </p>
    </div>
  );
}