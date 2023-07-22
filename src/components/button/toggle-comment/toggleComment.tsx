import React from 'react';
import { ToggleCommentsButtonProps } from '../../../constants/interfaces';

const ToggleCommentsButton = ({
  showComments,
  handleToggleComments,
}: ToggleCommentsButtonProps): JSX.Element => {
  return (
    <button onClick={handleToggleComments}>
      {showComments ? 'Hide Comments' : 'Show Comments'}
    </button>
  );
};

export default ToggleCommentsButton;
