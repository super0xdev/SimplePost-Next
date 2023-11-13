"use client";
import { Icon } from "@iconify/react";
import { Button, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";

import ConfirmModal from "./ConfirmModal";

export default function Home() {
  const [data, setData] = useState();
  const [disCnt, setDisCnt] = useState(20);
  const [curIndex, setCurIndex] = useState(-1);
  const [confirmModal, setConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setCurIndex(event.currentTarget.id);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setCurIndex(-1);
    setAnchorEl(null);
  };

  const showConfirmModal = () => {
    setAnchorEl(null);
    setConfirmModal(true);
  };

  const handleDelete = async (flag) => {
    if (flag == false) {
      setConfirmModal(false);
      return;
    }
    setLoading(true);
    setTimeout(async () => {
      await axios.post("/api/remove", { _id: data[curIndex]._id });
      await updateData();
      setCurIndex(-1);
      setLoading(false);
      setConfirmModal(false);
    }, 1000);
  };

  const updateData = async () => {
    let res = await axios.get("/api/get");
    setDisCnt(res.data.data.length > 20 ? 20 : res.data.data.length);
    let tmp = res.data.data.reverse();
    setData(res.data.data);
  };

  useEffect(() => {
    if (!data) updateData();
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-1 w-full">
        {data ? (
          data.slice(0, disCnt).map((item, id) => (
            <div key={id} className="relative bg-gray-200 rounded-md p-2">
              {item.content}
              <div className="absolute top-0 right-[-10px] cursor-pointer">
                <Button
                  id={id}
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <Icon icon="gridicons:dropdown" fontSize={20} />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div>Loading</div>
        )}
      </div>
      <div>
        <a href="/New">New Post</a>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={showConfirmModal}>Delete Post</MenuItem>
      </Menu>
      <ConfirmModal open={confirmModal} onClose={handleDelete} />
      {loading && (
        <div className="loader">
          <div className="loader-main">
            <FadeLoader color="#ff00ff" loading={loading} size="20" />
          </div>
        </div>
      )}
    </main>
  );
}
