import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Note = () => {
  const router = useRouter();
  const { note } = router.query;

  const [key,setKey] = useState("")
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [editState, setEditState] = useState(!false)

  // console.log("render-1", key, title, desc)
  useEffect(() => {
    const keys = Object.keys(localStorage);
    const dataKey = keys.filter((key) => key.includes("userNote"));
    const val = JSON.parse(localStorage.getItem(dataKey[note]));
    // console.log(val)
    setKey(dataKey[note])
    setTitle(val.title)
    setDesc(val.desc)
    // console.log("UseEffect", key, title, desc)
  }, [editState]);
  
  // console.log("render-2", key, title, desc)

  const editData = (e) => {
    e.preventDefault()
    const noteData = { title, desc};
    setEditState(!true)
    localStorage.setItem(key, JSON.stringify(noteData));
    router.push("/")
  }

  return (
    <div className="flex justify-center items-center h-screen bg-cover"
    style={{
      backgroundImage: `url('https://picsum.photos/320/200?random=${note}')`,
    }}
    >
      <div
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="flex justify-center items-center z-50 w-full p-4 md:inset-0 h-modal md:h-full bg-opacity-20 backdrop-blur-sm drop-shadow-sm bg-black/60"
      >
        <div className="relative w-full h-full max-w-sm md:h-auto">
          {/* Modal content */}
          <div className="relative bg-opacity-20 backdrop-blur-sm drop-shadow-sm rounded-lg shadow">
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-white">
                Edit note Box
              </h3>
              <form className="space-y-6" onSubmit={editData}>
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-white "
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                  />
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    required=""
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-teal-700 hover:bg-teal-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Edit note
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
