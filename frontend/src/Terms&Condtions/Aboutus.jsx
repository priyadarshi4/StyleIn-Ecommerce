import React from "react";
import { Typography, Container, Grid, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MetaData from "../component/layouts/MataData/MataData";
import TermsImage from "../Image/about/tc.jpg";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  about_us: {
    paddingTop: "8rem",
    paddingBottom: "4rem",
    backgroundColor: "white !important",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  container_12: {
    padding: "2rem",
    textAlign: "center",

    backgroundColor: "white !important",
    maxWidth: "100%",
  },
  image_about: {
    width: "100%",
    height: "auto",
    marginTop: "3rem",
    marginBottom: "2rem",
  },
  title_about: {
    color: "#414141",
    fontSize: "14px",
    padding: "2rem 1rem 2rem",
    fontFamily: "Roboto",
    fontWeight: "500 !important",
  },
  heading12_about: {
    fontSize: "1rem",
    padding: "2rem 1rem 2rem",
    fontWeight: "400 !important",
    color: "#414141",
    textAlign: "center",
  },
  introText_about: {
    maxWidth: "800px",

    lineHeight: "1.5",
    margin: "1.5rem 0",
    color: "#292929",
    fontSize: "1.2rem",
    fontWeight: "400 !important",
    textAlign: "justify",
    padding: "0.8rem 1rem",
  },
  infoText_about: {
    lineHeight: "1.5",
    margin: "2rem 0",
    color: "#292929",
    fontSize: "1rem",
    fontWeight: "400 !important",
    textAlign: "justify",
    padding: "0.8rem 1rem",
  },
  buttonContainer_about: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem 0",
    width: "100%",
    marginTop: "1rem",
  },
  button1_about: {
    backgroundColor: "#000000 !important",
    color: "white !important",
    width: "fit-content !important",
    padding: "0.8rem 2rem   !important",
    marginLeft: "3.3rem !important",
    borderRadius: "5px !important",
    "&:hover": {
      backgroundColor: "#F7931E !important",
      color: "white !important",
    },
  },
  button2_about: {
    backgroundColor: "#292929 !important",
    color: "white   !important",
    width: "fit-content     !important",
    padding: "0.8rem 2rem   !important",
    marginLeft: "1.3rem !important",
    borderRadius: "5px !important",
    "&:hover": {
      backgroundColor: "#F7931E !important",
      color: "white !important",
    },
  },
}));

const About_UsPage = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.about_us}>
        <MetaData title={"About Us"} />
        <Container className={classes.container_12}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <img
                src={TermsImage}
                alt="StyleIn"
                className={classes.image_about}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" className={classes.sectionTitle_about}>
  Founder & Vision
</Typography>

<Typography variant="body1" className={classes.infoText_about}>
  <b>Style In</b> was founded by <b>Priyadarshi Prince</b>, a passionate
  entrepreneur and a <b>3rd year B.Tech student at IIT Patna</b>, with a
  vision to build a modern ecommerce brand that truly connects with the
  new generation.
</Typography>

<Typography variant="body1" className={classes.infoText_about}>
  Driven by creativity, technology, and a deep understanding of youth
  culture, Priyadarshi started Style In to create a platform where fashion
  meets individuality. The goal was simple — to make trend-driven,
  high-quality fashion accessible, affordable, and relevant for today’s
  lifestyle.
</Typography>

<Typography variant="body1" className={classes.infoText_about}>
  With a strong background in engineering and a forward-thinking mindset,
  he continues to shape Style In as a brand that values innovation,
  community, and confidence. Style In reflects his belief that fashion is
  more than just clothing — it’s a way to express who you are and how you
  show up in the world.
</Typography>

            </Grid>
          </Grid>
        </Container>
        <Container className={classes.container_12}>
          <Typography
  variant="h3"
  component="h1"
  className={classes.heading12_about}
>
  Who We Are
</Typography>

<Typography variant="body1" className={classes.infoText_about}>
  <b>Style In</b> is a modern ecommerce brand built for the new generation.
  We’re here to make fashion accessible, affordable, and exciting for
  everyone who loves to express themselves through style. Our focus is
  simple — bring you high-quality products that look good, feel good, and
  fit your everyday lifestyle.
</Typography>

<Typography variant="body1" className={classes.infoText_about}>
  Since our journey began in <b>2026</b>, Style In has grown into a
  community-driven brand trusted by customers across different regions.
  Every product on our platform is carefully curated to meet our standards
  of quality, comfort, and trend relevance — without unnecessary markups.
</Typography>

<Typography variant="body1" className={classes.infoText_about}>
  At Style In, we believe shopping should be smooth, transparent, and
  enjoyable. We focus on strong customer relationships, reliable service,
  and a seamless online experience from browsing to delivery. Join us as
  we continue to grow, evolve, and redefine how fashion ecommerce feels —
  fresh, simple, and made for your vibe.
</Typography>

        </Container>
        <Container className={classes.container_12}>
          <Typography variant="h5" className={classes.sectionTitle_about}>
  Our Mission
</Typography>

<Typography variant="body1" className={classes.infoText_about}>
  At <b>Style In</b>, our mission is to help you express who you are through
  fashion. We believe style isn’t about fitting in — it’s about standing
  out, feeling confident, and owning your individuality every single day.
</Typography>

<Typography variant="body1" className={classes.infoText_about}>
  We bring you trend-driven clothing, accessories, and lifestyle essentials
  that are affordable, comfortable, and made for real life. From everyday
  wear to statement looks, every piece at Style In is curated to match
  your vibe, your mood, and your lifestyle.
</Typography>

<Typography variant="body1" className={classes.infoText_about}>
  Driven by creativity and community, we constantly explore new trends,
  listen to our customers, and upgrade our collections so you always stay
  ahead of the curve. At Style In, it’s not just about what you wear —
  it’s about how you feel when you wear it.
</Typography>


          <div className={classes.buttonContainer_about}>
            <Link
              to="/products"
              style={{ textDecoration: "none", color: "none" }}
            >
              <Button variant="contained" className={classes.button1_about}>
                Our Products
              </Button>
            </Link>
            <Link
              to="/contact"
              style={{ textDecoration: "none", color: "none" }}
            >
              <Button variant="contained" className={classes.button2_about}>
                Contact Us
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};

export default About_UsPage;
