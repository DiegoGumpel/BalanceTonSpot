import React, { useState, useEffect } from 'react';
import './CommComponent.css'
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';

interface Comment {
  id: number;
  text: string;
}

//STYLE OF THE COMMENT MODAL
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 500,
  bgcolor: '#ffffff',
  boxShadow: 24,
  p: 1.75,
};

export default function CommentSection({ spot }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (spot?.name) {
      // Formate le nom du spot pour l'URL
      const formattedSpotName = spot.name.toLowerCase().replace(/\s/g, "-");
      axios.get(`http://ombelinepinoche-server.eddi.cloud:8443/api/spot/${formattedSpotName}/comments`)
        .then(response => {
          // Supposons que l'API renvoie un tableau de commentaires
          setComments(response.data);
        })
        .catch(error => {
          console.error("Erreur lors du chargement des commentaires", error);
        });
    }
  }, [spot?.name]); // Déclenchez l'effet lorsque le nom du spot change

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newComment.trim() !== '') {
      const comment: Comment = {
        id: Date.now(), // Simulez un ID; dans une application réelle, l'API devrait générer l'ID
        text: newComment.trim(),
      };
      // Ici, vous pourriez vouloir envoyer le nouveau commentaire à l'API aussi
      setComments([...comments, comment]);
      setNewComment('');
    }
  };
  
  //These make the comment modal work
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div className="comments-container">
      <h2 id="comments-section-title">Les Avis des Riders</h2>
      <div>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
            <form className="comments-form" onSubmit={handleCommentSubmit}>
              <h2 id="comments-submit-title">Balance Ton Com' !</h2>
        <textarea className="comments-text-input" value={newComment} onChange={handleCommentChange} />
        <button className="comments-button-cancel" type="submit"><img id="button-cancel-img" src="https://i.postimg.cc/ZRpy77dM/x-regular-24.png"/>ANNULER</button>
        <button className="comments-button-submit" type="submit">ENVOYER<img id="button-submit-img" src="https://i.postimg.cc/QMxygx8Y/send-regular-24-1.png"/></button>
      </form>
            </Box>
          </Fade>
        </Modal>
      </div>
      

      <ul className="comments-list">
        {comments.map((comment) => (
          <li key={comment.id}>
            <img src={comment.picture} alt={comment.username} className="user-image" />
            <h3>{comment.username}</h3>
            <p>{comment.content}</p>
            <p>{comment.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
