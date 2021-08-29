import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

export const StyledMenu = withStyles({
	paper: {
		border: '1px solid #d3d4d5',
		width: '11em',
	},
})(props => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
		}}
		{...props}
	/>
));

export const StyledMenuItem = withStyles(theme => ({
	root: {
		'&:focus': {
			'& .MuiListItemIcon-root, & .MuiListItemText-primary': {
				color: theme.palette.common.white,
			},
		},
		height: '2em'
	},
}))(MenuItem);
