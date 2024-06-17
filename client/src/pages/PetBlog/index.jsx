import React from 'react'; // Importing the React library
import { Container, Grid, Card, CardContent, CardMedia, Typography } from '@mui/material'; // Importing specific components from Material-UI
import animal1 from '../images/cat.jpg'; // Importing an image of a cat and assigning it to `animal1`
import animal2 from '../images/corgi.jpg'; // Importing an image of a corgi and assigned it to `animal2`
import animal3 from '../images/Shephard.jpg'; // caught another image of a pitbull and assigned it to `animal3`

// / Define an array blogPosts containing objects for each blog post with title, description, and imageUrl properties
const blogPosts = [
  {
    title: 'The Majestic World of Cats', // this is the title of the first blog post
    description: 'Dive into the fascinating world of cats and discover their mysterious ways.', // Description of the first blog post
    imageUrl: animal1, // Image URL for the first blog post, referencing `animal1`
  },
  {
    title: 'Corgis: The Royal Companions', // Title of the second blog post
    description: 'Learn why Corgis have been favored by royalty and what makes them such special pets.', // Description of the second blog post
    imageUrl: animal2, // Image URL for the second blog post, referencing `animal2`
  },
  {
    title: 'Understanding Pitbulls', // Title of the third blog post
    description: 'Breaking the myths and understanding the true nature of Pitbulls.', // Description of the third blog post
    imageUrl: animal3, // Image URL for the third blog post, referencing `animal3`
  },
];
//  defineing a functional component called PetBlog
const PetBlog = () => {
    return (
      <Container maxWidth="lg"> 
        <Typography variant="h2" component="h1" gutterBottom>
          Pet Blog
        </Typography>
        <Grid container spacing={4}>
          {blogPosts.map((post, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={post.imageUrl}
                  alt={post.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  };
  
  export default PetBlog; // Exporting the PetBlogPage component