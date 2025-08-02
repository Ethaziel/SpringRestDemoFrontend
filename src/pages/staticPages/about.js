// material-ui
import { Typography } from '@mui/material';
import MainCard from 'components/MainCard';


const AboutPage = () => {
  

  return (
  <MainCard title="About">
    <Typography variant="body2">
      This is a demo project created as part of the Udemy.com (<a href="https://www.udemy.com/course/full-stack-java-developer-java/" target="_blank" rel="noopener noreferrer">Link</a>) course and further developed. It only exists for learning purposes. <br/>
      This application allows its users to create albums and upload photos, but it is not meant to be a permanent storage. <br/>
      Part of the deployment (at least currently) is also deleting of the uploaded photos. <br/><br/>
      
      Thank you for understanding...
    </Typography>
  </MainCard>
)};

export default AboutPage;
