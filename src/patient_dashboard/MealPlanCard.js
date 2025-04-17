import React, { useState } from 'react';
import {
  Card, Box,CardHeader, CardMedia, CardContent, CardActions,
  IconButton, Typography, Collapse, Avatar, Chip, TextField, Button
} from '@mui/material';
import testImage from './reciepe photo.png'
import { Favorite, ExpandMore, ChatBubbleOutline } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
export default function MealPlanCard({ meal }) {
  
  const {
    image = '',
    title = 'Untitled',
    tags = [' #Test'],
    description = 'No description available.No description available.No description available.No description available.No description available.No description available.No description available.No description available.No description available.No description available.No description available.No description available.No description available.No description available.No description available.No description',
    author = 'Unknown',
    likes: initialLikes = 0,
    comments:initialcomments = [],
    fullRecipe = '',
    user = {},
    ingredients = [],
    directions = [],
  } = meal || {};

  //const [expanded, setExpanded] = useState(false);
  //const [likes, setLikes] = useState(meal.likes);
  const [comments, setComments] = useState(initialcomments);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => setExpanded(!expanded);
  //const handleLike = () => setLikes(likes + 1);
  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };
  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: '43vh', height:'55vh', mx:4, my:2 }}>
  
      <CardMedia component="img"  image={testImage} style={{padding:4}} alt={title} />
      
      <CardContent>
      <div style={{ marginBottom: 8 }}>
      <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 600 }}>{title}</Typography>
      <Box mt={1} display="flex" alignItems="center" gap={1}>

    {tags.map(tag => (
        <Typography sx={{ fontSize: '0.9em', color: '#777' }}>{tag}</Typography>
       ))}
    </Box>  
     </div>      
     <Typography
  sx={{
    maxHeight: '7vh',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 5, // Adjust the number of visible lines
    WebkitBoxOrient: 'vertical',
    mt: 1, 
    fontSize: '0.9em'
  }}
>
  {description}
</Typography>

<Box mt={3} display="flex" alignItems="center" gap={1}>
        {<Avatar sx={{height:'3vh', width:'3vh'}} src={user.avatar} />}
        
          <Typography
            onClick={handleExpandClick}
            sx={{fontSize: '0.8em', cursor: 'pointer' }}
          >
            {author}
          </Typography>
        
      
      <IconButton onClick={handleLike}>
          {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography variant="body2">{likes}</Typography>
        <IconButton onClick={handleExpandClick}>
          <ChatBubbleOutline /> <span>{comments.length}</span>
        </IconButton>
        </Box>


      </CardContent>
  
    </Card>
  );
}
