import React from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import Link from "next/link";

const Notes = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [notes, setNotes] = useState([]);
  const [dataKey, setDataKey] = useState([]);
  const [noteState, setNoteState] = useState(false)

  const selectColor = () => {
    const authenticationModal = document.querySelector("#authentication-modal");
    authenticationModal.classList.remove("hidden");
    authenticationModal.classList.add("flex");
  };

  const closeModal = () => {
    const authenticationModal = document.querySelector("#authentication-modal");
    authenticationModal.classList.add("hidden");
    authenticationModal.classList.remove("flex");
  };

  const addData = (e) => {
    e.preventDefault();
    setNoteState(!noteState)
    const noteData = { title, desc };
    const validation = document.querySelector(".validation");

    function validate(demo) {
      return demo.title === title;
    }

    const randomNumb = Math.floor(Math.random() * 10000);

    let stamp = false;
    if (!notes.some(validate)) {
      stamp = true;
      // console.log("unique");
    } else {
      // console.log("equal");
      validation.classList.remove("hidden");
    }

    if (stamp) {
      validation.classList.add("hidden");
      const description = document.getElementById("desc");
      if (title.length < 10) {
        if (desc !== "") {
          // console.log(desc, "valid desc");
          localStorage.setItem(
            `userNote_${randomNumb}`,
            JSON.stringify(noteData)
          );
          closeModal();
          setNoteState(!noteState)
        } else if (desc === "") {
          description.setAttribute("required", "true");
          // console.log("please write desc");
        }
      } else if (title.length >= 10) {
        localStorage.setItem(
          `userNote_${randomNumb}`,
          JSON.stringify(noteData)
        );
        closeModal();
        setNoteState(!noteState)
      }
    }
  };

  const deleteNote = (e, index) => {
    setNoteState(!noteState)
    localStorage.removeItem(dataKey[index]);
  };

  useEffect(() => {
    const keys = Object.keys(localStorage);
    const dataKey = keys.filter((key) => key.includes("userNote"));
    setDataKey(dataKey);
    let dataValues = dataKey.map((e) => JSON.parse(localStorage.getItem(e)))
    setNotes(dataValues);

    // console.log(title, desc, notes, noteState);

  }, [noteState]);

  return (
    <>
      <header className="px-3 py-4 border border-black">
        <div className="flex items-center space-x-6 px-3">
          <div className="relative">
            <BsPlusCircleFill
              onClick={selectColor}
              className="cursor-pointer text-2xl text-black"
            />
          </div>
          <h1 className="text-3xl font-bold">Notes</h1>
        </div>
      </header>
      <main id="noteBox" className="bg-zinc-300 h-screen">
        <div className="flex flex-wrap gap-3 p-3">
          {notes.map((note, i) => {
            return (
              <div
                // style={{
                //   backgroundImage: `url('https://picsum.photos/320/200?random=${i}')`,
                // }}
                className="bg-cover bg-bottom max-w-xs bg-slate-900 p-5 space-y-2 border border-amber-300 border-dotted rounded-lg shadow"
                key={i}
              >
                <div className="flex justify-between space-x-10 items-center px-2 rounded-lg">
                {/* <div className="flex justify-between items-center px-2 rounded-lg bg-opacity-20 backdrop-blur-sm drop-shadow-sm bg-black/60"> */}
                  <h5 className="text-2xl text-white font-bold tracking-tight">
                    <span className="text-[#f7b816] font-semibold">const</span> {note.title}
                  </h5>
                  <div className="flex items-center justify-end space-x-1">
                    <MdDelete
                      onClick={() => deleteNote(note, i)}
                      className="cursor-pointer text-white"
                    />
                    <Link href={`/notes/${i}`}>
                      <FiEdit className="cursor-pointer text-white" />
                    </Link>
                  </div>
                </div>

                <p className=" px-2 rounded-lg font-normal text-base text-white break-words selection:bg-indigo-700">
                  <span className="text-[#e81ede] font-medium text-xl"> = </span>
                {/* <p className=" px-2 rounded-lg bg-opacity-20 backdrop-blur-sm drop-shadow-sm bg-black/70 font-normal text-base text-white break-words "> */}
                  {note.desc}
                </p>

              </div>
            );
          })}
        </div>
      </main>

      {/* Main modal */}
      <div
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed hidden justify-center items-center z-50 w-full p-4 md:inset-0 h-modal md:h-full bg-black/60"
      >
        <div className="relative w-full h-full max-w-sm md:h-auto">
          {/* Modal content */}
          <div className="relative bg-opacity-50 backdrop-blur-sm drop-shadow-sm bg-gray-400 rounded-lg shadow">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-white bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-hide="authentication-modal"
              onClick={closeModal}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-white">
                Add note Box
              </h3>
              <form className="space-y-6" onSubmit={addData}>
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter Title"
                    id="title"
                    required={true}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                  <p className="validation hidden mt-2 text-sm text-red-600">
                    <span className="font-medium">Oops!</span> Title already
                    taken!
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="desc"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Description
                  </label>
                  <textarea
                    rows={3}
                    type="text"
                    name="desc"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    id="desc"
                    placeholder="Enter Description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required={false}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-zinc-800 hover:bg-zinc-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Add note
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notes;
