import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";

const HomePage = () => {
  const [isRatedLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        //If we are rated limited, we'll want to display the error from <RateLimitedUI />
        if (error?.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          //throw a generic error.
          toast.error("Failed to load the notes.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <Navbar />

      {isRatedLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}

        {notes.length > 0 && !isRatedLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => (
              <NoteCard key={note._id} note={note} /> 
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
