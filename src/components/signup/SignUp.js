import { Dialog, Transition } from "@headlessui/react";
import { Button, message, Upload } from "antd";
import axios from "axios";
import { Fragment, useContext, useState } from "react";
import Logo from "../../assets/logo/logo.svg";
import LoginContext from "../../context/loginContext";

export default function Signup({ isOpen, setIsOpen }) {
  const [accSignup, setAccSignup] = useState({
    username: "",
    email: "",
    password: "",
    fullname: "",
    address: "",
    avatar: null,
    cover: null,
    phone: "",
  });

  const [step, setStep] = useState(1);

  function closeModal() {
    setIsOpen(false);
  }

  const { setIsOpenLogin } = useContext(LoginContext);

  const resetForm = () => {
    setAccSignup({
      username: "",
      email: "",
      password: "",
      fullname: "",
      address: "",
      avatar: null,
      cover: null,
      phone: "",
    });
  };

  const signup = async () => {
    try {
      const formData = new FormData();
      formData.append("urlProfile", accSignup.avatar);
      formData.append("urlBackground", accSignup.cover);
      formData.append("username", accSignup.username);
      formData.append("password", accSignup.password);
      formData.append("email", accSignup.email);
      formData.append("fullname", accSignup.fullname);
      formData.append("address", accSignup.address);
      formData.append("phone", accSignup.phone);
      const response = await axios.post("/user/registeruser", formData);

      if (response.statusText == "OK" && response.status == 200) {
        message.success("Signup success");
        closeModal();
        setIsOpenLogin(true);
        resetForm();
      } else {
        message.error("Đăng ký không thành công!");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleChangeInput = (e) => {
    setAccSignup({
      ...accSignup,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeAvatar = ({ file }) => {
    setAccSignup({
      ...accSignup,
      avatar: file.originFileObj,
    });
  };

  const handleChangeCover = ({ file }) => {
    setAccSignup({
      ...accSignup,
      cover: file.originFileObj,
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="border-t-4 border-red-600 inline-block w-full max-w-md px-16 py-5 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-xl text-center font-medium leading-6 text-gray-900 mb-4"
              >
                <img src={Logo} alt="" className="h-7 w-7 mx-auto mb-4" />
                Đăng ký
              </Dialog.Title>
              <form>
                {step === 1 ? (
                  <>
                    <div className="mb-4">
                      <input
                        className="border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={accSignup.username}
                        onChange={(e) => {
                          setAccSignup({
                            ...accSignup,
                            username: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        className="border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="text"
                        placeholder="Email"
                        value={accSignup.email}
                        onChange={(e) => {
                          setAccSignup({ ...accSignup, email: e.target.value });
                        }}
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        className="border rounded-lg w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Mật khẩu"
                        value={accSignup.password}
                        onChange={(e) => {
                          setAccSignup({
                            ...accSignup,
                            password: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div>
                      <button
                        className="bg-red-500 mt-4 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={() => setStep(step + 1)}
                      >
                        Next
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mt-3">Ảnh</div>
                    <div className="flex items-center">
                      <img
                        src={
                          accSignup.avatar
                            ? URL.createObjectURL(accSignup.avatar)
                            : ""
                        }
                        alt=""
                        style={{ width: 145, height: 145 }}
                        className="mx-3 rounded-full item object-cover"
                      />
                      <Upload
                        showUploadList={false}
                        onChange={handleChangeAvatar}
                      >
                        <Button
                          type="primary"
                          shape="round"
                          size="large"
                          style={{ background: "#bfbfbf", color: "black" }}
                        >
                          Upload
                        </Button>
                      </Upload>
                    </div>
                    <div className="mt-3">Ảnh bìa</div>
                    <div className="flex items-center">
                      <img
                        src={
                          accSignup.cover
                            ? URL.createObjectURL(accSignup.cover)
                            : ""
                        }
                        alt=""
                        style={{ width: 145 }}
                        className="mx-3 item object-cover"
                      />
                      <Upload
                        showUploadList={false}
                        onChange={handleChangeCover}
                      >
                        <Button
                          type="primary"
                          shape="round"
                          size="large"
                          style={{ background: "#bfbfbf", color: "black" }}
                        >
                          Upload
                        </Button>
                      </Upload>
                    </div>
                    <div className="mt-3">
                      <label htmlFor="fullname">Họ và tên</label>
                      <input
                        className="border rounded-full w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="fullname"
                        type="text"
                        placeholder="Nhập họ và tên"
                        name="fullname"
                        value={accSignup.fullname}
                        onChange={handleChangeInput}
                      />
                    </div>
                    <div className="mt-3">
                      <label htmlFor="phone">SĐT</label>
                      <input
                        className="border rounded-full w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="phone"
                        type="text"
                        placeholder="Nhập SĐT"
                        name="phone"
                        value={accSignup.phone}
                        onChange={handleChangeInput}
                      />
                    </div>
                    <div className="mt-3">
                      <label htmlFor="address">Địa chỉ</label>
                      <input
                        className="border rounded-full w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="address"
                        type="text"
                        placeholder="Nhập địa chỉ"
                        name="address"
                        value={accSignup.address}
                        onChange={handleChangeInput}
                      />
                    </div>
                    <div>
                      <button
                        className="bg-red-500 mt-4 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={signup}
                      >
                        Đăng ký
                      </button>
                    </div>
                  </>
                )}
              </form>
              {step === 1 && (
                <div className="text-center font-bold my-6">
                  Đã là thành viên?{" "}
                  <a
                    className="hover:text-indigo-600 cursor-pointer"
                    onClick={() => {
                      closeModal();
                      setIsOpenLogin(true);
                    }}
                  >
                    Đăng nhập
                  </a>
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
