import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionGetOneTodo,
  actionUpdateStatusTodo,
  actionUpdateTodo,
} from "../redux/actions/todoProgress.actions";

const CardTodoProgress = (props) => {
  const todos = useSelector((state) => state.todoProgress);
  const { id, name, description, createdAt } = { ...props };
  const [formIsActive, setFormIsActive] = useState(false);
  const [nameUpdate, setNameUpdate] = useState(name);
  const [descriptionUpdate, setDescriptionUpdate] = useState(description);
  const dateCreatedAt = new Date(createdAt).toLocaleDateString("fr");
  const dispatch = useDispatch();

  const handleClick = () => {
    actionUpdateStatusTodo(dispatch, id);
    actionGetOneTodo(dispatch, todos.length);
    console.log("progess", todos.length);
  };

  const handleUpdate = () => {
    actionUpdateTodo(
      nameUpdate,
      descriptionUpdate,
      id,
      setFormIsActive,
      dispatch
    );
  };
  return (
    <div className="card mb-4">
      {formIsActive ? (
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nom
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Mon super nom"
              onChange={(e) => setNameUpdate(e.target.value)}
              required
              value={nameUpdate}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              type="text"
              className="form-control"
              id="name"
              placeholder="Ma super description"
              onChange={(e) => setDescriptionUpdate(e.target.value)}
              value={descriptionUpdate}
            />
          </div>
          <div className="text-center">
            <button
              className="btn btn-primary mx-2"
              onClick={() => setFormIsActive(false)}
            >
              Annuler
            </button>
            <button className="btn btn-primary mx-2" onClick={handleUpdate}>
              Modifier
            </button>
          </div>
        </div>
      ) : (
        <div className="card-body">
          <div className="row">
            <h5 className="card-title col-6 text-start">{name}</h5>
            <p className="card-subtitle mb-2 text-muted col-6 text-end">
              {dateCreatedAt}
            </p>
          </div>
          <p className="card-text">{description}</p>
          <div className="text-center">
            <button
              className="btn btn-primary mx-2"
              onClick={() => setFormIsActive(true)}
            >
              Modifier cette Todo
            </button>
            <button className="btn btn-primary mx-2" onClick={handleClick}>
              J'ai finis cette Todo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardTodoProgress;
