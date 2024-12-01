import React, { useEffect, useState } from "react";
const bgYoutube = "bg-gradient-to-r from-red-500 to-pink-600";
const bgChillBreak =
  "bg-gradient-to-r from-orange-500 to-white";

export default function SocialMediaCard({ bgcolor, title }) {
  const [ytSubscribers, setYtSubscribers] = useState([]);
  const [cbSubscribers, setCbSubscribers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/youtube-stats/@isum-instituto")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setYtSubscribers(data.subscriberCount || 0);
      })
      .catch((error) => {
        console.error("Error fetching YouTube stats:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/youtube-stats/@Chill_Break_ve")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCbSubscribers(data.subscriberCount || 0);
      })
      .catch((error) => {
        console.error("Error fetching YouTube stats:", error);
      });
  }, []);

  return (
    <div className={`h-40 w-48 rounded-xl shadow-md text-center bg-white mt-3`}>
      <div
        className={`${
          title === "Youtube" ? bgYoutube : bgChillBreak
        } h-3 w-48 flex rounded-t-xl`}
      ></div>
        <h1 className="mt-[-10px]">{title}</h1>
        <h3
          className={`text-3xl font-semibold tracking-wide ${
            bgcolor === "bg-blue-500" ? "text-white" : "text-black"
          }`}
        >
          {title === "Youtube" ? ytSubscribers : cbSubscribers}
        </h3>
        <h1>en total</h1>
    </div>
  );
}
