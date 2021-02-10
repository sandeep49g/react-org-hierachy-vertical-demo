import React from 'react';
import propTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse';
import { withStyles } from '@material-ui/core/styles';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import styles from './employee.css';
import App from '../App'

function getInitials(name) {
  if (!name) {
    return 'NA';
  }
  let names = name.split(' ');
  if (names.length < 2) {
    return names[0][0] + names[0][0];
  }
  return names[0][0] + names[1][0];
}

const Employee = ({...props}) => {
  const { emp, clickHandler, open, classes } = props;

  if (emp.hasReportees) {
    return (
      <List>
        <ListItem className={classes.listWidth} button onClick={() => clickHandler(emp.name, open ? !open : true)}>
          <Avatar className={classes.manager}>{getInitials(emp.name)}</Avatar>
          <ListItemText inset primary={emp.name} secondary={emp.designation}/>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse component="li" in={open} timeout="auto" unmountOnExit>
          <List disablePadding style={styles.nested}>{}
            <App employeeList={emp.reportees}/>
          </List>
        </Collapse>
      </List>
    )
  } else {
    return (
      <List disablePadding>
        <ListItem className={classes.listWidth}>
          <Avatar className={classes.employee}>{getInitials(emp.name)}</Avatar>
          <ListItemText inset primary={emp.name} secondary={emp.designation} />
        </ListItem>
      </List>
    )
  }
}

Employee.propTypes = {
  emp: propTypes.object.isRequired,
  clickHandler: propTypes.func.isRequired,
  open: propTypes.bool,
  classes: propTypes.object.isRequired
}

export default withStyles(styles)(Employee);
