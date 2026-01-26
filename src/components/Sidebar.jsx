import React, { useState } from "react";

function Sidebar() {
  const [open, setOpen] = useState(true);
  const [menu, setMenu] = useState("Dashboard");
  return (
    <>
      <div className="w-full flex">This is the Admin Dashboard</div>
    </>
  );
}

export default Sidebar;
