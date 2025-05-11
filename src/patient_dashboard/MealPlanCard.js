import React, { useState,useRef, useEffect } from 'react';
import {
  Card, Box,CardHeader, CardMedia, CardContent, CardActions,
  IconButton, Typography, Collapse, Avatar, Chip, TextField, Button
} from '@mui/material';
import testImage from './reciepe photo.png'
import { Favorite, ExpandMore, ChatBubbleOutline } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton as MuiIconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const apiUrl = process.env.REACT_APP_API_URL;


export default function MealPlanCard({ meal, patientInfo}) {
  console.log("Meal object:", meal);

  const {
    image = '',
    title = 'Untitled',
    tags = [' #Test'],
    description = 'No description available.No description available.No description available.No description available.No description available.No description available.No description available.No description available.No description available.No description available.No description available.No description available.No description available.No description available.No description available.No description',
    author = 'Unknown',
    likes: initialLikes = 0,
    comments: initialcomments = [
      { firstName: 'John', lastName: 'Doe', text: 'hi' },
      { firstName: 'Jane', lastName: 'Smith', text: 'hello' },
    ],
        fullRecipe = '',
    user = {},
    ingredients = [],
    directions = [],
  } = meal || {};

  //const [expanded, setExpanded] = useState(false);
  //const [likes, setLikes] = useState(meal.likes);
  const [comments, setComments] = useState(meal.comments || []);
  const [newComment, setNewComment] = useState("");
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  const [expanded, setExpanded] = useState(false);

const handleExpandClick = async () => {
  setExpanded(!expanded);
  const post_id = meal.post_id;

  if (!commentsLoaded) {
    try {
      const response = await fetch(`${apiUrl}/posts/comment/${post_id}`);
      const data = await response.json();

      if (response.ok) {
        const formattedComments = data.map(comment => ({
          firstName: comment.first_name,
          lastName: comment.last_name,
          text: comment.comment_text,
          created_at: comment.created_at
        }));

        setComments(formattedComments);
        setCommentsLoaded(true);
      } else {
        console.error("Failed to load comments:", data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }
};
  //const handleLike = () => setLikes(likes + 1);

  const handleAddComment = async () => {
  const post_id=meal.post_id
  const user_id = patientInfo.user_id
  console.log('here', user_id);
  if (newComment.trim() === "") return;
  const commentData = {
    post_id: post_id,
    user_id: user_id,  // Ensure you have this in patientInfo
    comment_text: newComment
  };

  try {
    const response = await fetch(`${apiUrl}/posts/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentData)
    });

    const data = await response.json();

    if (response.status === 201) {
      const newCommentObj = {
        post_id:post_id,
        firstName: patientInfo.firstName,
        lastName: patientInfo.lastName,
        text: newComment,
        created_at: new Date().toISOString()  // or use data.created_at if returned
      };
      console.log("successfully added comment to backend")

      setComments([newCommentObj, ...comments]);
      setNewComment("");
    } else {
      console.error("Failed to add comment:", data);
    }
  } catch (error) {
    console.error("Error while adding comment:", error);
  }
};

  


  const handleLike = async () => {
    setLiked(!liked);
    const post_id = meal.post_id;
    const patient_id = patientInfo.patient_id; // assuming this is passed correctly
    console.log(post_id);
    if (!post_id || !patient_id) {
      console.error("Missing post_id or patient_id");
      return;
    }
  
    try {
      console.log('Sending like request:', {
        post_id: meal.post_id,
        patient_id: patientInfo?.patient_id,
        "doctor_id": null,
      });      const response = await fetch(`${apiUrl}/posts/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id: post_id,
          patient_id:patient_id,
          doctor_id: null,
        }),
      });
  
      const data = await response.json();
      
      if (response.status === 201) {
  
        setLiked(true);
        setLikes(likes + 1);
        console.log("Post liked successfully:", data);
        localStorage.setItem(`liked-${post_id}`, 'true');

      } else if (response.status === 409) {
        console.warn("Post already liked:", data);
        setLiked(true); // Optional, still show UI as liked
      } else {
        console.error("Like failed:", data);
      }
    } catch (error) {
      console.error("Error while liking post:", error);
    }
  };
  

const commentInputRef = useRef(null);
const handleCommentIcon = () => {
  handleOpenModal(); // Make sure to call the function (add parentheses)
  
  // Focus after a short delay to ensure modal has rendered
  setTimeout(() => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, 100);
};

  const handleAddToMealPlan = () =>{
    setAdded(!added);

  };
  const handleExpand = () => {
    setExpanded(!expanded);
  };

  //Modal to View Full Reciepe
const [openModal, setOpenModal] = useState(false);
const handleOpenModal = () => {
  setOpenModal(true);
  handleExpandClick();
};
const handleCloseModal = () => setOpenModal(false);

  return (
    <>
    <Card sx={{ maxWidth: '43vh', height:'55vh', mx:4, my:2 }}>
  
      <CardMedia component="img"  image={testImage} style={{padding:4}} alt={title} />
      
      <CardContent>
      <div style={{ marginBottom: 8 }}>
      <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 600, cursor:'pointer' }} onClick={handleOpenModal} >{title}</Typography>
      <Box mt={1} display="flex" alignItems="center" gap={1}>

    {tags.map(tag => (
        <Typography sx={{ fontSize: '0.9em', color: '#777' }}>{tag}</Typography>
       ))}
    </Box>  
     </div>      
     <Typography
  sx={{
    flexGrow:1,
    maxHeight: '7vh',
    minHeight:'7vh',
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

<Box flexGrow={1} mt={3} display="flex" alignItems="center" gap={1}>
        {<Avatar sx={{height:'3vh', width:'3vh'}} src={user.avatar} />}
        
          <Typography
            onClick={handleExpandClick}
            sx={{flexGrow:1,fontSize: '0.8em', cursor: 'pointer' }}
          >
            {author}
          </Typography>
        
         <IconButton onClick={handleAddToMealPlan}
  sx={{
    backgroundColor: added ? 'lightgrey' : 'transparent', // 👈
  
  }}
>
  <LibraryAddOutlinedIcon color={'action'} />
          </IconButton>
          <Box position="relative" display="inline-flex">
  <IconButton onClick={handleLike}>
    {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
  </IconButton>
  {likes > 0 && (
    <Typography
      variant="caption"
      sx={{
         position: 'absolute',
        top: 2,
        right: 2,
        fontSize: '0.7rem',
        backgroundColor: 'transparent',
        borderRadius: '50%',
        padding: '0 4px',
      }}
    >
      {likes}
    </Typography>
  )}
</Box>

<Box position="relative" display="inline-flex">
 
  <IconButton onClick={handleCommentIcon}>
    <ChatBubbleOutline />
  </IconButton>
  {comments.length > 0 && (
    <Typography
      variant="caption"
      sx={{
        position: 'absolute',
        right: -1,
        fontSize: '0.7rem',
        backgroundColor: 'transparent',
        borderRadius: '50%',
        px: 0.5,
      }}
    >
      {comments.length}
    </Typography>
  )}
</Box>
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
        <Box position="relative" display="inline-flex">
        <IconButton onClick={handleAddToMealPlan}
  sx={{
    backgroundColor: added ? 'lightgrey' : 'transparent', // 👈
  
  }}
>
  <LibraryAddOutlinedIcon color={'action'} />
          </IconButton>     
  <IconButton onClick={handleLike}>
    {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
  </IconButton>
  {likes > 0 && (
    <Typography
      variant="caption"
      sx={{
        position: 'absolute',
        top: 2,
        right: 2,
        fontSize: '0.7rem',
        backgroundColor: 'transparent',
        borderRadius: '50%',
        padding: '0 4px',
      }}
    >
      {likes}
    </Typography>
  )}
</Box>
<Box position="relative" display="inline-flex">
  <IconButton onClick={handleExpandClick}>
    <ChatBubbleOutline />
  </IconButton>
  {comments.length > 0 && (
    <Typography
      variant="caption"
      sx={{
        position: 'absolute',
        right: -1,
        fontSize: '0.7rem',
        backgroundColor: 'transparent',
        borderRadius: '50%',
        px: 0.5,
      }}
    >
      {comments.length}
    </Typography>
  )}
</Box>
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
{comments.map((comment) => (
  <Box
    key={comment.comment_id}
    sx={{
      backgroundColor: '#f5f5f5',
      p: 1,
      borderRadius: 2,
      fontSize: '0.9em',
      display:'flex',
    }}
  >
    <Typography  sx={{ fontWeight: 'bold', pr:'1vh' }}>
      {comment.firstName} {comment.lastName}
    </Typography>
    <Typography >{comment.text || comment.comment_text}</Typography>
  </Box>
))}

      </Box>

      {/* Input */}
      <Box display="flex" gap={1}>
        <TextField
        inputRef={commentInputRef}
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