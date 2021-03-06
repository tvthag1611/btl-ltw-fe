import { Badge, Input } from "antd";
import React, { useContext, useEffect, useState } from "react";
import {
  SearchOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import Logo from "../../../assets/logo/logo.svg";
import Chat from "../../../assets/navbar/chat.svg";
import LoginContext from "../../../context/loginContext";
import MyButton from "../../button/MyButton";
import { Menu, Dropdown } from "antd";
import "./Header.css";
import { getToken, getUser, removeUserLocal } from "../../../utils/Common";
import Search from "../../../components/search/Search";
import Notification from "../../../components/notification/Notification";

export default function Header() {
  const { setIsOpenLogin } = useContext(LoginContext);
  const isLogin = getToken();
  const user = getUser();
  let navigate = useNavigate();

  const logout = () => {
    removeUserLocal();
    navigate("/");
    setIsOpenLogin(true);
  };

  const menu = (
    <Menu>
      <Menu.Item icon={<UserOutlined />}>
        <a href={`/user/${user?.id}`}>Profile</a>
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined />} onClick={logout}>
        <a>Logout</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      className="header fixed items-center flex flex-row w-full border border-0 border-b-1 border-gray-300"
      id="header"
    >
      <img
        src={Logo}
        alt=""
        style={{ width: 50, height: 50 }}
        className="mx-3"
      />
      <MyButton className="mr-3 btn-black" onClick={() => navigate("/")}>
        Trang chủ
      </MyButton>
      <Search />
      {isLogin ? (
        <div className="flex">
          <Notification />
          <Badge count={9} overflowCount={10}>
            <img
              src={Chat}
              alt=""
              width="40px"
              height="40px"
              className="mx-3 cursor-pointer"
            />
          </Badge>
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            getPopupContainer={() => document.getElementById("header")}
          >
            <img
              src={user?.urlProfilePicture}
              alt=""
              style={{ width: 40, height: 40 }}
              className="mx-3 rounded-full cursor-pointer object-cover"
            />
          </Dropdown>
        </div>
      ) : (
        <MyButton className="mx-3 btn-red" onClick={() => setIsOpenLogin(true)}>
          Đăng nhập
        </MyButton>
      )}
    </div>
  );
}
