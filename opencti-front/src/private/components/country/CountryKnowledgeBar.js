import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Drawer from '@material-ui/core/Drawer';
import { DeviceHub, AccountBalance } from '@material-ui/icons';
import { TargetVariant, SourceFork } from 'mdi-material-ui';
import inject18n from '../../../components/i18n';

const styles = theme => ({
  drawerPaper: {
    minHeight: '100vh',
    width: 260,
    position: 'fixed',
    overflow: 'auto',
    backgroundColor: '#303030',
    padding: 0,
  },
  paper: {
    width: '90%',
    height: 60,
    margin: '0 auto',
    marginTop: 15,
    padding: 10,
    backgroundColor: theme.palette.paper.background,
    color: theme.palette.text.main,
    transition: 'all 0.3s',
    borderRadius: 6,
    '&:hover': {
      backgroundColor: theme.palette.field.background,
    },
  },
  paperActive: {
    width: '90%',
    height: 60,
    margin: '0 auto',
    marginTop: 15,
    padding: 10,
    backgroundColor: theme.palette.field.background,
    color: theme.palette.text.main,
    borderRadius: 6,
  },
  toolbar: theme.mixins.toolbar,
  icon: {
    float: 'left',
    paddingTop: 7,
  },
  content: {
    float: 'left',
    padding: '0 0 0 16px',
  },
  title: {
    fontSize: 15,
  },
  subtitle: {
    fontSize: 12,
    color: '#d3d3d3',
  },
});

class CountryKnowledgeBar extends Component {
  render() {
    const {
      t, location, classes, countryId,
    } = this.props;
    return (
      <Drawer
        variant="permanent"
        anchor="right"
        classes={{ paper: classes.drawerPaper }}
      >
        <div className={classes.toolbar} />
        <Paper
          classes={{
            root:
              location.pathname
              === `/dashboard/catalogs/countries/${countryId}/knowledge/overview`
                ? classes.paperActive
                : classes.paper,
          }}
          elevation={2}
          component={Link}
          to={`/dashboard/catalogs/countries/${countryId}/knowledge/overview`}
        >
          <div className={classes.icon}>
            <DeviceHub fontSize="default" />
          </div>
          <div className={classes.content}>
            <span className={classes.title}>{t('Overview')}</span>
            <br />
            <span className={classes.subtitle}>{t('Knowledge graph')}</span>
          </div>
        </Paper>
        <Paper
          classes={{
            root:
              location.pathname
              === `/dashboard/catalogs/countries/${countryId}/knowledge/organizations`
                ? classes.paperActive
                : classes.paper,
          }}
          elevation={2}
          component={Link}
          to={`/dashboard/catalogs/countries/${countryId}/knowledge/organizations`}
        >
          <div className={classes.icon}>
            <AccountBalance fontSize="default" />
          </div>
          <div className={classes.content}>
            <span className={classes.title}>{t('Organizations')}</span>
            <br />
            <span className={classes.subtitle}>
              {t('Localized in this country')}
            </span>
          </div>
        </Paper>
        <Paper
          classes={{
            root:
              location.pathname
              === `/dashboard/catalogs/countries/${countryId}/knowledge/threats`
                ? classes.paperActive
                : classes.paper,
          }}
          elevation={2}
          component={Link}
          to={`/dashboard/catalogs/countries/${countryId}/knowledge/threats`}
        >
          <div className={classes.icon}>
            <TargetVariant fontSize="default" />
          </div>
          <div className={classes.content}>
            <span className={classes.title}>{t('Threats')}</span>
            <br />
            <span className={classes.subtitle}>
              {t('Targeting this country')}
            </span>
          </div>
        </Paper>
        <Paper
          classes={{
            root:
              location.pathname
              === `/dashboard/catalogs/countries/${countryId}/knowledge/entities`
                ? classes.paperActive
                : classes.paper,
          }}
          elevation={2}
          component={Link}
          to={`/dashboard/catalogs/countries/${countryId}/knowledge/entities`}
        >
          <div className={classes.icon}>
            <SourceFork fontSize="default" />
          </div>
          <div className={classes.content}>
            <span className={classes.title}>{t('Entities')}</span>
            <br />
            <span className={classes.subtitle}>
              {t('Related to this country')}
            </span>
          </div>
        </Paper>
      </Drawer>
    );
  }
}

CountryKnowledgeBar.propTypes = {
  countryId: PropTypes.string,
  classes: PropTypes.object,
  location: PropTypes.object,
  t: PropTypes.func,
};

export default compose(
  inject18n,
  withRouter,
  withStyles(styles),
)(CountryKnowledgeBar);
