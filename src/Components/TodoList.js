import Container from '@mui/material/Container'; // Container
import Card from "@mui/material/Card"; // Card
import Typography from "@mui/material/Typography"; // Card
import { CardContent,Divider } from '@mui/material'; // Card
import ToggleButton from "@mui/material/ToggleButton"; // Toggle
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from '@mui/material/Grid'; // Grid
import TextField from "@mui/material/TextField"; // Text Feild
import Button from "@mui/material/Button"; // Button
import Todo from "./Todo";  // Todo Component
import Dialog from "@mui/material/Dialog"; // Dialog
import DialogActions from "@mui/material/DialogActions"; // Dialog
import DialogContent from "@mui/material/DialogContent"; // Dialog
import DialogContentText from "@mui/material/DialogContentText"; // Dialog
import DialogTitle from "@mui/material/DialogTitle"; // Dialog
import { useToast } from '../Context/ToastContext'; // ToastContext
import { useState, useEffect, useMemo } from "react";
import { useTodos } from '../Context/TodosContext';

export default function TodoList () {
  const [titleInput, setTitleInput] = useState("");
  const { showHideToast } = useToast();

  const {todos, dispatch} = useTodos();

  function handleAddClick() { // ___
    dispatch({ type: "addTodo", payload: { titleInput } });
    setTitleInput("");
    showHideToast("تمت إضافة مهمه جديده بنجاح");
  }

  useEffect(() => {
    dispatch({type: 'get'})
  }, []);

  // Filter the Todos
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  function changeDisplyedType(e) {
    setDisplayedTodosType(e.target.value);
  }

  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);

  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  let todosToShow = todos;

  if (displayedTodosType === "Completed") {
    todosToShow = completedTodos;
  } else if (displayedTodosType === "non-Completed") {
    todosToShow = notCompletedTodos;
  } else {
    todosToShow = todos;
  }

  /* _____ Delete Dialog Logic _____ */
  const [showDeleteDialog, setShowDeleteDialog] = useState(false); //=> Delete Dialog لعرض ال
  const [dialog, setDialog] = useState(null); //=> وتخزينها todo لإستقبال بيانات كل

  function handleDeleteClick(todo) {
    setDialog(todo); //=> dialog ال State وتخزينها داخل todo ال Props من Todos لإستقبال بيانات ال
    setShowDeleteDialog(true);
  }
  //  DeleteDialog لإغلاق ال
  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    dispatch({ type: "deleteTodo", payload: {id: dialog.id} });
    setShowDeleteDialog(false);
    showHideToast("تمت حذف المهمه بنجاح");
  }

  /* _____ Update Dialog Logic _____ */
  const [showUpdateDialog, setShowUpdateDialog] = useState(false); //=> Update Dialog لعرض ال
  const [updateTodo, setUpdateTodo] = useState({ title: "", Details: "" });

  // updateIcon بتشتغل لما بضغط ع ال
  function handleUpdateClick(todo) {
    setDialog(todo); //=> dialog ال State وتخزينها داخل todo ال Props من Todos لإستقبال بيانات ال
    setUpdateTodo({ title: todo.title, Details: todo.Details }); //=> updateTodo State وتحديث ال todo ال Props من title, Details لجلب ال
    setShowUpdateDialog(true);
  }

  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }


  function handleUpdateConfirm() {
    dispatch({
      type: "updateTodo",
      payload: {id: dialog.id,  title: updateTodo.title,  Details: updateTodo.Details}
    });
    setShowUpdateDialog(false);
    showHideToast("تمت تعديل المهمه بنجاح");
  }

  // Todos وظيفتها طباعة ال
  const todosJsx = todosToShow.map((t) => (
    <Todo
      key={t.id}
      todo={t}
      deleteDialog={handleDeleteClick}
      UpdateDialog={handleUpdateClick}
    />
  ));

  return (
    <>
      {/* __ Delete Dialog Jsx __ */}
      <Dialog
        open={showDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          هل أنت متأكد من حذف المهمه ؟{" "}
        </DialogTitle>

        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ direction: "rtl" }}>
            لا يمكنك التراجع عن الحذف بعد إتمامه
          </DialogContentText>
        </DialogContent>

        <DialogActions
          style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleDeleteDialogClose}> إلغاء </Button>
          <Button onClick={handleDeleteConfirm}> تأكيد الحذف </Button>
        </DialogActions>
      </Dialog>

      {/* __ Update Dialog __ */}
      <Dialog
        open={showUpdateDialog}
        onClose={handleUpdateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle
          id="alert-dialog-title"
          style={{ textAlign: "center" }}>
          {" "}
          تعديل المهمه{" "}
        </DialogTitle>

        <DialogContent>
          <TextField
            value={updateTodo.title}
            onChange={(e) =>
              setUpdateTodo({ ...updateTodo, title: e.target.value })
            }
            label="عنوان المهمه"
            type="text"
            fullWidth
            variant="standard"
            style={{ direction: "rtl" }}
            autoFocus
            margin="dense"
            id="name"
          />
          <TextField
            value={updateTodo.Details}
            onChange={(e) =>
              setUpdateTodo({ ...updateTodo, Details: e.target.value })
            }
            label="التفاصيل"
            type="text"
            fullWidth
            variant="standard"
            style={{ direction: "rtl" }}
            autoFocus
            margin="dense"
            id="name"
          />
        </DialogContent>

        <DialogActions
          style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleUpdateClose}> إلغاء </Button>
          <Button onClick={handleUpdateConfirm}> تأكيد </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="sm">
        <Card
          sx={{ minWidth: 275 }}
          style={{ maxHeight: "80vh", overflow: "scroll" }}>
          <CardContent>
            {/* Heading */}
            <Typography
              style={{ textAlign: "center", fontWeight: "bold" }}
              variant="h3">
              مهامي
            </Typography>
            <Divider />
            {/* Toogle */}
            <ToggleButtonGroup
              value={displayedTodosType}
              onChange={changeDisplyedType}
              className="allToggle"
              color="primary"
              aria-label="Platform">
              <ToggleButton value="all">الكل</ToggleButton>
              <ToggleButton value="Completed">منجز</ToggleButton>
              <ToggleButton value="non-Completed">غير منجز</ToggleButton>
            </ToggleButtonGroup>
            {/* All Todos Component */}
            {todosJsx}

            {/* Input */}
            <Grid
              container
              style={{ marginTop: "20px" }}>
              <Grid
                xs={8}
                display="flex"
                justifyContent="space-around"
                alignItems="center">
                <TextField
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  error
                  id="outlined-error"
                  label="إضافة مهمه"
                  defaultValue="Hello World"
                  style={{ width: "100%", marginLeft: "10px" }}
                />
              </Grid>
              <Grid
                xs={4}
                display="flex"
                justifyContent="space-around"
                alignItems="center">
                <Button
                  onClick={handleAddClick}
                  disabled={titleInput === ""}
                  variant="contained"
                  style={{ width: "100%", height: "100%" }}>
                  إضافه
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};


