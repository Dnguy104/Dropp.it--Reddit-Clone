import React from 'react';
import PropTypes from 'prop-types';

const Subtitle = (props) => {
  const { author, created_on } = props;
  return (
    <div>
      r/Thread ~ Posted by <a>u/{author}</a> on {created_on}
    </div>
  );
}

export default Subtitle;
