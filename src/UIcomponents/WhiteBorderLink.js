import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './WhiteBorderLinkStyles';
import { withStyles } from '@material-ui/core/styles';


const WhiteBorderLink = (props) => (
<Link className={props.classes.linkStyle} to={props.to}>{props.text}</Link>
);


export default withStyles(styles)(WhiteBorderLink);

