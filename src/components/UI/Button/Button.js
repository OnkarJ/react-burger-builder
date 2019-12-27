import React from 'react';
import classnames from 'classnames';

import './Button.css';

const button = (props) => (
    <button
        className={classnames( 'Button', {'Danger': props.btnType === 'Danger'}, {'Success': props.btnType === 'Success'} )}
        onClick={props.clicked}
    >
        {props.children}
    </button>
);

export default button;