import React from "react";
import { ImHome2 } from "react-icons/im";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { AiOutlineTransaction, AiOutlinePropertySafety } from "react-icons/ai";
import { TiContacts } from "react-icons/ti";
import { RiHistoryLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useDisconnect } from "wagmi";

const pages = [
  {
    name: "Home",
    route: "/",
    icon: <ImHome2 />,
  },
  {
    name: "Swap",
    route: "/swap",
    icon: <FaRegArrowAltCircleRight />,
  },
  {
    name: "Cross Chain",
    route: "/crosschain",
    icon: <AiOutlineTransaction />,
  },
  {
    name: "ARMR",
    route: "/armr",
    icon: <AiOutlinePropertySafety />,
  },
  {
    name: "Contacts",
    route: "/contacts",
    icon: <TiContacts />,
  },
  {
    name: "Transactions",
    route: "/transactions",
    icon: <RiHistoryLine />,
  },
  {
    name: "Settings",
    route: "/setting",
    icon: <FiSettings />,
  },
];

function index() {
  const router = useRouter();
  const { disconnectAsync } = useDisconnect();

  async function handleLogout() {
    await disconnectAsync();
    signOut({ callbackUrl: "/" });
  }
  return (
    <div className="bg-[#444444] text-[#D9D9D9] flex flex-col px-10">
      <h2>Sider</h2>
      <div>
        {pages.map(({ name, route, icon }) => (
          <div
            className="flex items-center my-10"
            onClick={() => router.push(route)}
          >
            <div className="mr-2 text-[25px]">{icon && icon}</div>
            <div>{name}</div>
          </div>
        ))}
      </div>
      <button
        className="bg-[#727272] min-width-[200px] rounded-[200px]  py-2 my-10"
        onClick={handleLogout}
      >
        DISCONNECT
      </button>
    </div>
  );
}

export default index;
