import React, { Fragment } from 'react';
import spinner from '../../assets/spinner.gif';

export default () => (
	<Fragment>
		<img className='spinner' src={spinner} alt='Loading...' />
	</Fragment>
);
