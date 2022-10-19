import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'

import './App.css';

function App() {

  // Task State
  const [toDo, setToDo] = useState([]);

  // Temp State
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  // Ajouter une tâche 
  const addTask = () => {
    if(newTask) {
      let num = toDo.length + 1; 
      let newEntry = {id: num, title: newTask, status: false}
      setToDo([...toDo, newEntry]);
      setNewTask('');
    }
  }

  // Supprimer une tâche 
  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
  }

  // Marquer une tâche comme accomplie
  const markDone = (id) => {
    const newTasks = toDo.map((task) => {
      if (task.id === id){
        return ({ ...task, status: !task.status })
      }
      return task;
    });
    setToDo(newTasks);
  }

  // Annuler la MAJ
  const cancelUpdate = () => {
    setUpdateData('');
  }

  // Changer la tâche pour la MAJ
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
  }

  // MAJ d'une tâche 
  const updateTask = () => {
    let filterRecords = [...toDo].filter( task=>task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData];
    setToDo(updatedObject);
    setUpdateData('');
  }

  
  return (
    <div className="container App">
      
      <br/><br/>

      <h2>Ma liste de trucs à faire</h2>

      <br/><br/>
      

      {updateData && updateData ? (
        <>
          <div className="row">
            <div className="col">
              <input 
                value={updateData && updateData.title} 
                onChange={ (e) => changeTask(e) } 
                className="form-control form-control-lg" 
              />
            </div>
            <div className="col-auto">
              <button 
                className="btn btn-lg btn-success mr-20" 
                onClick={updateTask}
              >Modifier</button>
              <button 
                className="btn btn-lg btn-warning" 
                onClick={cancelUpdate}
              >Supprimer</button>
            </div>
          </div>
          <br/>
        </>
      ) : (
        <>
          <div className="row">
            <div className="col">
              <input 
                value={newTask} 
                onChange={e => setNewTask(e.target.value)} 
                className="form-control form-control-lg" 
              />
            </div>
            <div className="col-auto">
              <button 
                className="btn btn-lg btn-success" 
                onClick={addTask}
              >Ajouter</button>
            </div>
          </div>
          <br/>
        </>
      )}


      {/* S'il n'y a pas de tâche en état, afficher un message */}
      {toDo && toDo.length ? '' : 'pour l\'instant rien'}
      
      {/* Montrer la liste*/}
      {toDo && toDo
        .sort((a, b) => a.id > b.id ? 1 : -1)
        .map( (task, index) => {
        return(
          <React.Fragment key={task.id}>
          
            <div className="col taskBg">
              
              <div 
                // si l'état de la tâche est vrai, ajouter une classe à cette div comme fait
                className={ task.status ? 'done' : '' }
              >
                {/* Show number of task */}
                <span className="taskNumber">{index + 1}</span> 
                <span className="taskText">{task.title}</span>
              </div>

              <div className="iconsWrap">
                <span 
                  onClick={(e) => markDone(task.id)}
                  title="Completed / Not Completed"
                >
                  <FontAwesomeIcon icon={faCircleCheck} />
                </span>
                
                {task.status ? null : (
                  <span 
                    title="Edit"
                    onClick={ () => setUpdateData({ id: task.id, title: task.title, satus: task.status ? true : false }) }
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </span>
                )}

                <span 
                  onClick={() => deleteTask(task.id)}
                  title="Delete"
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </span>
              </div>

            </div>
                     
        </React.Fragment>
        );
      })}
    </div>
  );
}

export default App;
