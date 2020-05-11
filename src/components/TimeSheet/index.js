import React, { useState, useEffect } from "react";
import produce from "immer";
import { deepCopy } from "../../helper/generics";
import sendApiRequest from "../../services/auth";

const projectSchema = {
  project_id: "",
  description: "",
  hrs: "",
};

const TimeSheet = () => {
  const [entries, setEntries] = useState([]);
  const [projects, setProjects] = useState([]);
  const getProjects = () => {
    // get projects
    sendApiRequest({
      url: "http://localhost:5001/projects",
      method: "GET",
    }).then((res) => {
      if (res.status === "success") {
        console.log(res);
        setProjects(res.data.result);
      }
    });
  };

  useEffect(() => {
    getProjects();
  }, []);

  const removeEntry = (index) => {
    const entryCopy = deepCopy(entries);
    entryCopy.splice(index, 1);
    setEntries(entryCopy);
  };

  const saveEntries = () => {
    if (entries.length === 0) return false;
    let data = {
      projects: deepCopy(entries),
    };

    sendApiRequest({
      url: "http://localhost:5001/projects",
      data,
      method: "POST",
    }).then((res) => {
      if (res.status === "success") {
        alert("updated");
      }
    });
  };

  const handleChange = (name, value, idx) => {
    const entryCopy = deepCopy(entries);
    entryCopy[idx][name] = value;
    setEntries(entryCopy);
  };

  const setProject = (value, idx) => {
    const entryCopy = deepCopy(entries);
    const projectsCopy = deepCopy(projects);
    entryCopy[idx] = projectsCopy.filter((f) => +f.project_id === +value)[0];
    setEntries(entryCopy);
  };

  return (
    <div className="container">
      <h2>TimeSheet</h2>
      <hr></hr>
      <button
        name="AddRow"
        id="addRowBtn"
        class="btn btn-primary"
        onClick={() => {
          setEntries([...entries, projectSchema]);
        }}
      >
        Add Row
      </button>
      <div className="row  m-0">
        <div className="col-8 offset-md-2">
          <div class="list-group">
            <li href="#" class="list-group-item list-group-item-action active">
              <div className="row">
                <div className="col">Project</div>
                <div className="col">Hours</div>
                <div className="col">Description</div>
                <div className="col">Action</div>
              </div>
            </li>
            {entries.length > 0 ? (
              entries.map((entry, entryIndex) => {
                return (
                  <li href="#" class="list-group-item list-group-item-action">
                    <div className="row">
                      <div className="col">
                        <div class="form-group">
                          <select
                            class="form-control"
                            name="project_id"
                            id="projectSelector"
                            onChange={(e) => {
                              setProject(e.target.value, entryIndex);
                            }}
                            value={entry.project_id}
                          >
                            <option>Select Project</option>
                            {projects.map((p) => {
                              return <option value={p.project_id}>{p.name}</option>;
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col">
                        <div class="form-group">
                          <select
                            class="form-control"
                            name="hrs"
                            id="hourSelector"
                            onChange={(e) => {
                              handleChange(e.target.name, e.target.value, entryIndex);
                            }}
                            value={entry.hrs}
                          >
                            <option>set hrs</option>
                            {new Array(8).fill(0).map((h, idx) => {
                              return <option value={idx + 1}>{`${idx + 1} hrs`}</option>;
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col">
                        <div class="form-group">
                          <textarea
                            class="form-control"
                            name="description"
                            id="descriptionBox"
                            rows="3"
                            onChange={(e) => {
                              handleChange(e.target.name, e.target.value, entryIndex);
                            }}
                            value={entry.description}
                          ></textarea>
                        </div>
                      </div>
                      <div className="col text-center">
                        <i
                          className="fa fa-times"
                          onClick={() => {
                            removeEntry(entryIndex);
                          }}
                        ></i>
                      </div>
                    </div>
                  </li>
                );
              })
            ) : (
              <p className="p-5 text-center">No entries</p>
            )}
          </div>
        </div>
      </div>
      <div className="text-center p-5 ">
        <button type="button" class="btn btn-primary" onClick={() => saveEntries()}>
          Save Entries
        </button>
      </div>
    </div>
  );
};

export default TimeSheet;
