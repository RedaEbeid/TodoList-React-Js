import Card from '@mui/material/Card'; // Card
import CardContent from '@mui/material/CardContent'; // Card
import Typography from '@mui/material/Typography'; // Card
import Grid from '@mui/material/Grid'; // Grid
import IconButton from "@mui/material/IconButton"; // Icon
import CheckIcon from "@mui/icons-material/Check"; // Icon
import EditIcon from "@mui/icons-material/Edit"; // Icon
import DeleteIcon from "@mui/icons-material/Delete"; // Icon
import { useToast } from '../Context/ToastContext';
import { useTodos } from "../Context/TodosContext"; // useContext hook

export default function Todo({todo, deleteDialog, UpdateDialog}) {
    const { todos, dispatch } = useTodos();
    
    const { showHideToast } = useToast();

    function handleCheckClick () {
        dispatch( { type: 'completed',payload: {id: todo.id} } )
        showHideToast('تمت الإضافه إلي المهام المنجزه');
    }


    return (
        <>
            {/* __ Card __ */}
        <Card sx={{ minWidth: 275}} className='todoCard'>
            <CardContent>
                <Grid container spacing={2} style={{ margin: '0px auto' }}>
                    <Grid xs={8}>
                        <Typography variant='h5' style={{overflow: 'hidden', textDecoration: todo.isCompleted ? 'line-through' : 'none'}}> {todo.title} </Typography>
                        <Typography variant='h6' style={{overflow: 'hidden'}}> {todo.Details} </Typography>
                    </Grid>
                    <Grid xs={4} display='flex' justifyContent='space-around' alignItems='center'>

                        {/* Chick Icon Button */}
                        <IconButton onClick={handleCheckClick} aria-label="check" className='iconButton' style={{ background: todo.isCompleted === true ? '#8bc34a' : '#fff', color: todo.isCompleted === true ? '#fff' : '#8bc34a', border: '3px solid #8bc34a' }}>
                            <CheckIcon />
                        </IconButton>

                        {/* Edit Icon Button */}
                        <IconButton value={UpdateDialog}  onClick={ () => UpdateDialog(todo) } aria-label="edite" className='iconButton' style={{background: '#fff', color: '#1769aa', border: '3px solid #1769aa'}}>
                            <EditIcon />
                        </IconButton>

                        {/* Delete Icon Button */}
                        <IconButton value={deleteDialog} onClick={ () => deleteDialog(todo) } aria-label="delete" className='iconButton' style={{background: '#fff', color: '#b23c17', border: '3px solid #b23c17'}}>
                            <DeleteIcon />
                        </IconButton>
                        
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
        </>
    );
}


        