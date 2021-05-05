import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import notReal from "../../assets/images/notReal.webp";

const useStyles = makeStyles(() => ({
  grid: {
    height: "100vh",
  },
}));

const NotFoundPage = () => {
  const classes = useStyles();
  let history = useHistory();

  return (
    <Container>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.grid}
      >
        <Grid container direction="column" justify="center" alignItems="center">
          <img
            src={notReal}
            style={{ width: "45%", height: "auto" }}
            width="100"
            height="100"
            alt="big foot and nessie"
          />
        </Grid>
        <Grid item>
          <Typography variant="h2" style={{ fontWeight: 600 }}>
            404
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            This Page is not Real
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={() => history.goBack()}>
            Go back
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFoundPage;
