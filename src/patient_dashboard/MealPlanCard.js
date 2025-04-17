import React, { useState } from 'react';
import {
  Card, Box,CardHeader, CardMedia, CardContent, CardActions,
  IconButton, Typography, Collapse, Avatar, Chip, TextField, Button
} from '@mui/material';
import testImage from './reciepe photo.png'
import { Favorite, ExpandMore, ChatBubbleOutline } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton as MuiIconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


export default function MealPlanCard({ meal }) {

  const {
    image = '',
    title = 'Untitled',
    tags = [' #Test'],
    description = 'No description available.No description available.No description available.No description available.No description available.No description available.No description available.No description available.No description available.No description available.No description available.No description available.No description available.No description available.No description available.No description',
    author = 'Unknown',
    likes: initialLikes = 0,
    comments:initialcomments = ['hi', 'hello'],
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

  //Modal to View Full Reciepe
const [openModal, setOpenModal] = useState(false);
const handleOpenModal = () => setOpenModal(true);
const handleCloseModal = () => setOpenModal(false);


  return (
    <>
    <Card sx={{ maxWidth: '43vh', height:'55vh', mx:4, my:2 }}>
  
      <CardMedia component="img"  image={testImage} style={{padding:4}} alt={title} />
      
      <CardContent>
      <div style={{ marginBottom: 8 }}>
      <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 600, cursor:'pointer' }} onClick={handleOpenModal}>{title}</Typography>
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
<Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">


  <DialogContent
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '95vh',
      p: 0,
    }}
  >
    {/* Fixed Image at Top */}
    <CardMedia
      component="img"
      image={testImage}
      alt={title}
      sx={{ width: '100%', maxHeight: '40vh', objectFit: 'cover' }}
    />

    {/* Scrollable Description */}
    <Box
      className='custom-scroll'
      sx={{
        overflowY: 'auto',
        flexGrow: 1,
        px: 2,
        py: 1,
      }}
    >
    <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 600, cursor:'pointer' }} >{title}</Typography>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {tags.join(' ')}
      </Typography>
      <Typography paragraph sx={{ fontSize: '0.9em' }}>
        {description}
      </Typography>
    </Box>

    {/* Scrollable Comments Section */}
    <Box
      sx={{
        borderTop: '1px solid #ccc',
        px: 2,
        py: 1,
        maxHeight: '25vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Comments
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton onClick={handleLike}>
            {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>
          <Typography>{likes}</Typography>
          <ChatBubbleOutline />
          <Typography>{comments.length}</Typography>
        </Box>
      </Box>

      {/* Comments List */}
      <Box
        className='custom-scroll'
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          mb: 1,
          pr: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {comments.map((comment, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: '#f5f5f5',
              p: 1,
              borderRadius: 2,
              fontSize: '0.9em',
            }}
          >
            {comment}
          </Box>
        ))}
      </Box>

      {/* Input */}
      <Box display="flex" gap={1}>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleAddComment}
          sx={{ whiteSpace: 'nowrap' }}
        >
          Post
        </Button>
      </Box>
    </Box>
  </DialogContent>
</Dialog>


</>  
  );
  

}