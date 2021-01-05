// This comment is needed at the top of every file that uses css-in-js. It tells React to grab JSX stuff from emotion instead.
//
/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";

const styling = css`
	color: red;
	&:hover {
		color: green;
		font-size: 20px;
	}
`;

const Another: React.FC = (): JSX.Element => {
	return (
		<div css={styling}>
			<h2>Another thing here.</h2>
		</div>
	);
};

export default Another;
