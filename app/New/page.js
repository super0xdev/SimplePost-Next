"use client";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

let flag = false;

if (typeof window !== "undefined") flag = true;

const New = () => {
  const router = useRouter();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          router.back();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  const modalRef = useRef(null);
  useOutsideAlerter(modalRef);

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(async () => {
      const res = await axios.post("/api/new", { data: text });
      setText("");
      setLoading(false);
      router.back();
      router.refresh();
    }, 1000);
  };

  return (
    <>
      <div className="flex justify-center w-full pt-20 px-4">
        <div
          ref={modalRef}
          className="flex flex-col gap-4 justify-center rounded-xl w-[600px] p-4"
          style={{ border: "solid 1px black" }}
        >
          <div>New Post</div>
          <TextField
            id="outlined-textarea"
            label="Input Here!"
            placeholder="Placeholder"
            multiline
            rows={5}
            value={text}
            onChange={(ev) => setText(ev.target.value)}
          />
          {loading ? (
            <LoadingButton
              disabled
              loadingPosition="start"
              startIcon={
                <Icon
                  icon="eos-icons:bubble-loading"
                  style={{ position: "relative" }}
                />
              }
              variant="outlined"
            >
              Processing...
            </LoadingButton>
          ) : (
            <Button variant="text" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default New;
